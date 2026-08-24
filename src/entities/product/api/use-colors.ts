"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchColors } from "./fetch-colors";

export function useColors() {
  return useQuery({
    queryKey: ["colors"],
    queryFn: fetchColors,
  });
}
