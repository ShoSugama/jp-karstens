import membersJson from "@/lib/mock/members.json";
import type { Member } from "./types";

export async function getMembers(): Promise<Member[]> {
  // TODO(future): japan-transfer-api の GraphClientFactory 経由でTeamsチームメンバー一覧から取得
  return membersJson as Member[];
}
