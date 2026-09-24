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
  photoFileName?: string; // public/images/ 配下のファイル名(ITが手動配置)
  photoUrl?: string; // photoFileName から導出される "/images/xxx" パス
}

export interface PracticeSession {
  id: string;
  date: string; // ISO date (YYYY-MM-DD)
  startTime: string; // "19:00" 形式
  endTime: string;
  venue: string;
  note?: string;
}

export interface Photo {
  id: string;
  fileName: string; // public/images/gallery/ 配下のファイル名(ITが手動配置)
  url: string; // fileName から導出される "/images/gallery/xxx" パス
  caption?: string;
  date?: string; // ISO date (YYYY-MM-DD)、任意
}

export interface NewsItem {
  slug: string;
  title: string;
  date: string; // ISO date (YYYY-MM-DD)
  excerpt: string;
  body: string;
  photoFileName?: string; // public/images/ 配下のファイル名(ITが手動配置)
  photoUrl?: string; // photoFileName から導出される "/images/xxx" パス
}
