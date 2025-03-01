import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1) + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(num % 1_000 === 0 ? 0 : 1) + "K";
  }
  return num.toString();
}

export type DateTimeInput = {
  day?: number | null;
  era?: string | null;
  hour?: number | null;
  millisecond?: number | null;
  minute?: number | null;
  month?: number | null;
  second?: number | null;
  year?: number | null;
};

export const formatDateTime = (data: DateTimeInput | null) => {
  if (!data) {
    return null;
  }

  const day = data.day ?? 1; // Default to 1st
  const hour = data.hour ?? 0;
  const minute = data.minute ?? 0;
  const month = data.month ?? 1; // Default to January
  const year = data.year ?? 2000; // Default to a valid year

  // Convert 24-hour format to 12-hour format
  const hours = hour % 12 || 12; // Convert 0 to 12
  const minutes = minute.toString().padStart(2, "0");
  const period = hour >= 12 ? "PM" : "AM";

  // Month mapping
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthName = months[month - 1] ?? "Invalid";

  return {
    time: `${hours}:${minutes}${period}`,
    date: `${monthName} ${day}, ${year}`,
  };
};
