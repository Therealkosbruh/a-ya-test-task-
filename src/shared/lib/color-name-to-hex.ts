const COLOR_NAME_TO_HEX: Record<string, string> = {
  черный: "#2B2B2B",
  белый: "#F5F5F0",
  серый: "#9B9B93",
  желтый: "#E8B923",
  синий: "#3B5C8C",
  бежевый: "#D8C9A8",
  хаки: "#8A8B5C",
  графит: "#4A4A48",
};

const FALLBACK_HEX = "#C3C9B8";

export function getColorHex(name: string): string {
  return COLOR_NAME_TO_HEX[name] ?? FALLBACK_HEX;
}
