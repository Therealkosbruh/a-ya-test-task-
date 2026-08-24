import type { IconName } from "@/shared/ui/icon/Icon";

export type InfoBlockStatus = "loading" | "error" | "empty" | "notFound";

interface InfoBlockContent {
  icon: IconName;
  title: string;
  text: string;
  actionLabel: string;
}

const CONTENT_BY_STATUS: Record<
  Exclude<InfoBlockStatus, "loading">,
  InfoBlockContent
> = {
  error: {
    icon: "delete",
    title: "Что-то пошло не так",
    text: "Не удалось загрузить товары. Попробуйте ещё раз.",
    actionLabel: "Повторить",
  },
  empty: {
    icon: "search",
    title: "Ничего не нашлось",
    text: "Попробуйте изменить запрос или отключить фильтр «в наличии».",
    actionLabel: "Сбросить фильтры",
  },
  notFound: {
    icon: "search",
    title: "Такого товара нет",
    text: "Возможно, ссылка устарела или товар сняли с продажи.",
    actionLabel: "Вернуться в каталог",
  },
};

export function getInfoBlockContent(
  status: Exclude<InfoBlockStatus, "loading">,
): InfoBlockContent {
  return CONTENT_BY_STATUS[status];
}
