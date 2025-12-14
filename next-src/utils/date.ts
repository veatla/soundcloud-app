import { isToday, format, isYesterday, isThisWeek, isThisYear } from "date-fns";
import { enUS } from "date-fns/locale";

export function formatDateToRelative(date: string) {
  if (isToday(date)) return format(date, "HH:mm");

  if (isYesterday(date)) return "Yesterday";

  if (isThisWeek(date, { weekStartsOn: 1 })) {
    return format(date, "eeee", { locale: enUS });
  }

  if (isThisYear(date)) {
    return format(date, "d MMM", { locale: enUS });
  }

  return format(date, "dd.MM.yyyy");
}
