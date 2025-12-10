import React, { useRef } from "react";

import { format, isToday, isYesterday, isThisWeek, isThisYear } from "date-fns";
import { enUS } from "date-fns/locale";

import type { TrackResponse } from "../../types/api";
import Image from "next/image";

function formatChatDate(date: string) {
  if (isToday(date)) {
    return format(date, "HH:mm"); // Сегодня: время (например, "15:30")
  }

  if (isYesterday(date)) {
    return "Yesterday"; // Вчера
  }

  if (isThisWeek(date, { weekStartsOn: 1 })) {
    return format(date, "eeee", { locale: enUS }); // Текущая неделя: день недели (например, "понедельник")
  }

  if (isThisYear(date)) {
    return format(date, "d MMM", { locale: enUS }); // Текущий год: день и месяц (например, "12 апреля")
  }

  return format(date, "dd.MM.yyyy"); // Более старые даты: полная дата (например, "12.04.2022")
}

const TrackListItem: React.FC<TrackResponse & { index: number }> = (v) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const thumbnail = v.artwork_url?.replace("-large", "-small");
  return (
    <div
      key={v.permalink_url}
      ref={rootRef}
      className="chat-list-item"
      tabIndex={0}
      style={{
        top: `${v.index * 72}px`,
      }}
    >
      <div className="flex-1 h-5 mt-1 order-1 flex content-between items-center w-full leading-messages">
        <div>{v.label_name}</div>
      </div>

      <div className="chat-title relative h-5 flex items-center content-between order-0 w-full">
        <div className="chat-list-title row-title">
          <span>{v.title}</span>

          {/* Muted */}
        </div>
        <div className="chat-list-title chat-title-right flex items-center h-5 -mt-2">
          {v.created_at && formatChatDate(v.created_at)}
        </div>
      </div>

      <div className="flex rounded-full overflow-hidden w-13 h-13 min-h-13 start-2 absolute">
        {thumbnail && (
          <Image
            src={thumbnail?.replace("-large", "-small")}
            alt={thumbnail}
            loading="lazy"
            className="w-13 h-13"
          />
        )}
      </div>
    </div>
  );
};

export default TrackListItem;
