import type { Size } from "@/shared/api/types";
import { getBaseUrl } from "@/shared/api/get-base-url";

function isSizeList(value: unknown): value is Size[] {
  if (!Array.isArray(value)) return false;

  return value.every((item) => {
    if (typeof item !== "object" || item === null) return false;
    const candidate = item as Record<string, unknown>;
    return (
      typeof candidate.id === "number" &&
      typeof candidate.name === "string" &&
      typeof candidate.number === "number"
    );
  });
}

export async function fetchSizes(): Promise<Size[]> {
  const response = await fetch(`${getBaseUrl()}/api/sizes`);

  if (!response.ok) {
    throw new Error("Не удалось загрузить размеры");
  }

  const data: unknown = await response.json();

  if (!isSizeList(data)) {
    throw new Error("Некорректный ответ сервера");
  }

  return data;
}
