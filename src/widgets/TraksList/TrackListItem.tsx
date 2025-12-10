"use client";

import type { TrackResponse } from "../../types/api";
import Image from "next/image";
import { formatDateToRelative } from "../../utils/date";

const TrackListItem: React.FC<TrackResponse & { index: number }> = (v) => {
  const thumbnail = v.artwork_url?.replace("-large", "-small");
  return (
    <div key={v.urn} className="chat-list-item" tabIndex={0} style={{ top: `${v.index * 72}px` }}>
      <div className="flex-1 h-5 mt-1 order-1 flex content-between items-center w-full leading-messages">
        <div>{v.label_name}</div>
      </div>

      <div className="chat-title relative h-5 flex items-center content-between order-0 w-full">
        <div className="chat-list-title row-title">
          <span>{v.title}</span>
        </div>
        <div className="chat-list-title chat-title-right flex items-center h-5 -mt-2">
          {v.created_at && formatDateToRelative(v.created_at)}
        </div>
      </div>

      <div className="flex rounded-full overflow-hidden w-13 h-13 min-h-13 start-2 absolute">
        {thumbnail && (
          <Image
            src={thumbnail?.replace("-large", "-small")}
            alt={thumbnail}
            loading="lazy"
            className="w-13 h-13"
            width={52}
            height={52}
          />
        )}
      </div>
    </div>
  );
};

export default TrackListItem;
