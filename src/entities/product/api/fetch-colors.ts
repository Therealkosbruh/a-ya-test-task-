import { getBaseUrl } from "@/shared/api/get-base-url";

function isColorList(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

export async function fetchColors(): Promise<string[]> {
  const response = await fetch(`${getBaseUrl()}/api/colors`);

  if (!response.ok) {
    throw new Error("Не удалось загрузить цвета");
  }

  const data: unknown = await response.json();

  if (!isColorList(data)) {
    throw new Error("Некорректный ответ сервера");
  }

  return data;
}
