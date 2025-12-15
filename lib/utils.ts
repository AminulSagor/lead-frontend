import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function nullsToEmptyStrings(obj: any): any {
  if (obj === null) return "";
  if (Array.isArray(obj)) {
    return obj.map(nullsToEmptyStrings);
  }
  if (typeof obj === "object" && obj !== null) {
    const newObj: any = {};
    for (const key in obj) {
      newObj[key] = nullsToEmptyStrings(obj[key]);
    }
    return newObj;
  }
  return obj;
}
