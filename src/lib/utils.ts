import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { SESSION_ID_KEY } from "./constants"
import { nanoid } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSessionId() {
  let sessionId = localStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = nanoid();
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}
