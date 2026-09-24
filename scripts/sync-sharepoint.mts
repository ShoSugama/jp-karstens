import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { ClientSecretCredential } from "@azure/identity";
import type { Member, NewsItem, PracticeSession } from "../src/lib/data/types";

const DRY_RUN = process.argv.includes("--dry-run");

const REQUIRED_ENV = [
  "GRAPH_TENANT_ID",
  "GRAPH_CLIENT_ID",
  "GRAPH_CLIENT_SECRET",
  "SHAREPOINT_SITE_ID",
  "NEWS_LIST_ID",
  "MEMBERS_LIST_ID",
  "PRACTICE_LIST_ID",
] as const;

function requireEnv(): Record<(typeof REQUIRED_ENV)[number], string> {
  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`環境変数が不足しています: ${missing.join(", ")}`);
  }
  return Object.fromEntries(
    REQUIRED_ENV.map((key) => [key, process.env[key] as string]),
  ) as Record<(typeof REQUIRED_ENV)[number], string>;
}

interface GraphListItem {
  id: string;
  fields: Record<string, unknown>;
}

interface GraphListItemsResponse {
  value: GraphListItem[];
  "@odata.nextLink"?: string;
}

async function getAccessToken(env: ReturnType<typeof requireEnv>) {
  const credential = new ClientSecretCredential(
    env.GRAPH_TENANT_ID,
    env.GRAPH_CLIENT_ID,
    env.GRAPH_CLIENT_SECRET,
  );
  const token = await credential.getToken(
    "https://graph.microsoft.com/.default",
  );
  if (!token) {
    throw new Error("Microsoft Graphのアクセストークン取得に失敗しました");
  }
  return token.token;
}

async function fetchAllListItems(
  siteId: string,
  listId: string,
  accessToken: string,
): Promise<GraphListItem[]> {
  const items: GraphListItem[] = [];
  let url:
    | string
    | undefined = `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/items?expand=fields`;

  while (url) {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(
        `Graph API呼び出しに失敗しました (list=${listId}, status=${res.status}): ${body}`,
      );
    }
    const json = (await res.json()) as GraphListItemsResponse;
    items.push(...json.value);
    url = json["@odata.nextLink"];
  }

  return items;
}

function toPhotoUrl(photoFileName: unknown): string | undefined {
  if (typeof photoFileName !== "string" || photoFileName.trim() === "") {
    return undefined;
  }
  return `/images/${photoFileName.trim()}`;
}

function toDateOnly(value: unknown): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error("Date列が空です");
  }
  return value.slice(0, 10);
}

function mapNewsItems(items: GraphListItem[]): NewsItem[] {
  const seenSlugs = new Set<string>();
  const news = items.map((item): NewsItem => {
    const fields = item.fields;
    const slug = String(fields.Slug ?? "").trim();
    const title = String(fields.Title ?? "").trim();

    if (!slug) throw new Error(`Newsアイテム(id=${item.id})のSlugが空です`);
    if (!title) throw new Error(`Newsアイテム(id=${item.id})のTitleが空です`);
    if (seenSlugs.has(slug)) {
      throw new Error(`Newsのslugが重複しています: ${slug}`);
    }
    seenSlugs.add(slug);

    const photoFileName =
      typeof fields.PhotoFileName === "string"
        ? fields.PhotoFileName.trim() || undefined
        : undefined;

    return {
      slug,
      title,
      date: toDateOnly(fields.Date),
      excerpt: String(fields.Excerpt ?? ""),
      body: String(fields.Body ?? ""),
      photoFileName,
      photoUrl: toPhotoUrl(fields.PhotoFileName),
    };
  });

  return news.sort((a, b) => b.date.localeCompare(a.date));
}

function mapMembers(items: GraphListItem[]): Member[] {
  return items.map((item): Member => {
    const fields = item.fields;
    const name = String(fields.Title ?? "").trim();
    if (!name) throw new Error(`Membersアイテム(id=${item.id})のTitleが空です`);

    const number = Number(fields.Number);
    if (Number.isNaN(number)) {
      throw new Error(`Membersアイテム(id=${item.id})のNumberが不正です`);
    }

    const photoFileName =
      typeof fields.PhotoFileName === "string"
        ? fields.PhotoFileName.trim() || undefined
        : undefined;

    return {
      id: `m${item.id}`,
      number,
      name,
      position: String(fields.Position ?? ""),
      department: fields.Department ? String(fields.Department) : undefined,
      comment: fields.Comment ? String(fields.Comment) : undefined,
      photoFileName,
      photoUrl: toPhotoUrl(fields.PhotoFileName),
    };
  });
}

function mapPracticeSessions(items: GraphListItem[]): PracticeSession[] {
  const practice = items.map((item): PracticeSession => {
    const fields = item.fields;
    const startTime = String(fields.StartTime ?? "").trim();
    const endTime = String(fields.EndTime ?? "").trim();
    const venue = String(fields.Venue ?? "").trim();

    if (!startTime)
      throw new Error(`Practiceアイテム(id=${item.id})のStartTimeが空です`);
    if (!endTime)
      throw new Error(`Practiceアイテム(id=${item.id})のEndTimeが空です`);
    if (!venue)
      throw new Error(`Practiceアイテム(id=${item.id})のVenueが空です`);

    return {
      id: `p${item.id}`,
      date: toDateOnly(fields.Date),
      startTime,
      endTime,
      venue,
      note: fields.Note ? String(fields.Note) : undefined,
    };
  });

  return practice.sort((a, b) => a.date.localeCompare(b.date));
}

async function main() {
  const env = requireEnv();
  const accessToken = await getAccessToken(env);

  const [newsRaw, membersRaw, practiceRaw] = await Promise.all([
    fetchAllListItems(env.SHAREPOINT_SITE_ID, env.NEWS_LIST_ID, accessToken),
    fetchAllListItems(
      env.SHAREPOINT_SITE_ID,
      env.MEMBERS_LIST_ID,
      accessToken,
    ),
    fetchAllListItems(
      env.SHAREPOINT_SITE_ID,
      env.PRACTICE_LIST_ID,
      accessToken,
    ),
  ]);

  const news = mapNewsItems(newsRaw);
  const members = mapMembers(membersRaw);
  const practice = mapPracticeSessions(practiceRaw);

  if (DRY_RUN) {
    console.log("=== news.json (dry-run) ===");
    console.log(JSON.stringify(news, null, 2));
    console.log("=== members.json (dry-run) ===");
    console.log(JSON.stringify(members, null, 2));
    console.log("=== practice.json (dry-run) ===");
    console.log(JSON.stringify(practice, null, 2));
    return;
  }

  const rootDir = path.resolve(fileURLToPath(import.meta.url), "../..");
  const newsPath = path.join(rootDir, "src/lib/mock/news.json");
  const membersPath = path.join(rootDir, "src/lib/mock/members.json");
  const practicePath = path.join(rootDir, "src/lib/mock/practice.json");

  await writeFile(newsPath, JSON.stringify(news, null, 2) + "\n", "utf-8");
  await writeFile(
    membersPath,
    JSON.stringify(members, null, 2) + "\n",
    "utf-8",
  );
  await writeFile(
    practicePath,
    JSON.stringify(practice, null, 2) + "\n",
    "utf-8",
  );

  console.log(
    `SharePoint同期完了: news ${news.length}件 / members ${members.length}件 / practice ${practice.length}件`,
  );
}

main().catch((err) => {
  console.error("SharePoint同期に失敗しました:", err);
  process.exit(1);
});
