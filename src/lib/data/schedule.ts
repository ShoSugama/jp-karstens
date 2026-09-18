import gamesJson from "@/lib/mock/schedule.json";
import type { Game } from "./types";

export async function getSchedule(): Promise<Game[]> {
  // TODO(future): japan-transfer-api の GraphClientFactory 経由でTeamsカレンダーから取得
  return gamesJson as Game[];
}

export async function getUpcomingGame(): Promise<Game | null> {
  const games = await getSchedule();
  return games.find((g) => g.status === "upcoming") ?? null;
}
