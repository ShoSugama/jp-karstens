export const BASE_PATH = "/jp-karstens";

export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`;
}
