"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "./fetch-categories";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}
