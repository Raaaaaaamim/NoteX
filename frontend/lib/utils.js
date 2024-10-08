import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(dateString) {
  const date = new Date(dateString);

  // Formatting the date (e.g., 7 October 2024)
  const optionsDate = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date
    .toLocaleDateString("en-GB", optionsDate)
    .toUpperCase();

  // Formatting the time (e.g., 10:56 PM)
  const optionsTime = { hour: "numeric", minute: "numeric", hour12: true };
  const formattedTime = date
    .toLocaleTimeString("en-US", optionsTime)
    .toUpperCase();

  return {
    date: formattedDate,
    time: formattedTime,
  };
}
