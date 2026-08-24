import type { Category } from "@/shared/api/types";
import { getBaseUrl } from "@/shared/api/get-base-url";

function isCategoryList(value: unknown): value is Category[] {
  if (!Array.isArray(value)) return false;

  return value.every((item) => {
    if (typeof item !== "object" || item === null) return false;
    const candidate = item as Record<string, unknown>;
    return (
      typeof candidate.id === "number" && typeof candidate.name === "string"
    );
  });
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${getBaseUrl()}/api/categories`);

  if (!response.ok) {
    throw new Error("Не удалось загрузить категории");
  }

  const data: unknown = await response.json();

  if (!isCategoryList(data)) {
    throw new Error("Некорректный ответ сервера");
  }

  return data;
}
