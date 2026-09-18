export interface Game {
  id: string;
  date: string; // ISO date (YYYY-MM-DD)
  opponent: string;
  venue: string;
  homeAway: "home" | "away";
  status: "upcoming" | "finished";
  result?: { teamScore: number; opponentScore: number };
}

export interface Member {
  id: string;
  number: number;
  name: string;
  position: string;
  department?: string;
  comment?: string;
  photoUrl?: string;
}

export interface NewsItem {
  slug: string;
  title: string;
  date: string; // ISO date (YYYY-MM-DD)
  excerpt: string;
  body: string;
}
