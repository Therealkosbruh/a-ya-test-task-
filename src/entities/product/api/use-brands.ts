"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchBrands } from "./fetch-brands";

export function useBrands() {
  return useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });
}
