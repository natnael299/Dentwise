import { clsx, type ClassValue } from "clsx"
import { use } from "react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//Formats a Finnish phone number.
export function formatFinnishPhone(raw: string): string {
  // Strip all whitespace, dashes, dots, parentheses
  const digits = raw.replace(/[\s\-.()+]/g, "");

  // Normalize to local format (0XXXXXXXXX)
  let local: string;
  if (digits.startsWith("00358")) {
    local = "0" + digits.slice(5);
  } else if (digits.startsWith("358")) {
    local = "0" + digits.slice(3);
  } else if (digits.startsWith("0")) {
    local = digits;
  } else {
    return raw; // unrecognized format — return as-is
  }

  // Mobile: 04x or 050 → "0XX XXX XXXX"
  if (/^0[45]\d/.test(local)) {
    return local.replace(/^(0\d{2})(\d{1,3})?(\d{1,4})?$/, (_, a, b, c) =>
      [a, b, c].filter(Boolean).join(" ")
    );
  }

  // Landline: 09, 08, etc. → "0X XXXX XXXX"
  return local.replace(/^(0\d)(\d{1,4})?(\d{1,4})?$/, (_, a, b, c) =>
    [a, b, c].filter(Boolean).join(" ")
  );
}

//creat an avatar for the user based on the name & gender of the doctor
export const generateAvatar = (name: string, gender: "MALE" | "FEMALE") => {
  const username = name.replace(/\s+/g, "").toLowerCase();
  const base = "https://api.dicebear.com/9.x";
  if (gender === "MALE") { return `${base}/adventurer/svg?seed=${username}` }
  else { return `${base}/adventurer-neutral/svg?seed=${username}`; }
}