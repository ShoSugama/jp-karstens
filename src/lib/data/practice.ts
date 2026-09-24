import practiceJson from "@/lib/mock/practice.json";
import type { PracticeSession } from "./types";

export async function getPracticeSessions(): Promise<PracticeSession[]> {
  const list = practiceJson as PracticeSession[];
  return [...list].sort((a, b) => a.date.localeCompare(b.date));
}
