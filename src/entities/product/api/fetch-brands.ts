import { getBaseUrl } from "@/shared/api/get-base-url";

function isBrandList(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

export async function fetchBrands(): Promise<string[]> {
  const response = await fetch(`${getBaseUrl()}/api/brands`);

  if (!response.ok) {
    throw new Error("Не удалось загрузить бренды");
  }

  const data: unknown = await response.json();

  if (!isBrandList(data)) {
    throw new Error("Некорректный ответ сервера");
  }

  return data;
}
