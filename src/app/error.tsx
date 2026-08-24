"use client";

import { useEffect, type ReactElement } from "react";
import { InfoBlock } from "@/shared/ui/info-block/InfoBlock";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props): ReactElement {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <InfoBlock status="error" onAction={reset} />;
}
