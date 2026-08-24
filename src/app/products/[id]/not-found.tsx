import type { ReactElement } from "react";
import { InfoBlock } from "@/shared/ui/info-block/InfoBlock";

export default function NotFound(): ReactElement {
  return <InfoBlock status="notFound" actionHref="/" />;
}
