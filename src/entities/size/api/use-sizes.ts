"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSizes } from "./fetch-sizes";

export function useSizes() {
  return useQuery({
    queryKey: ["sizes"],
    queryFn: fetchSizes,
  });
}
