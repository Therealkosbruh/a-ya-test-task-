import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ProductFiltersState {
  categoryIds: number[];
  brands: string[];
  colorNames: string[];
  sizeIds: number[];
  priceMin: number | null;
  priceMax: number | null;
  toggleCategoryId: (id: number) => void;
  toggleBrand: (brand: string) => void;
  toggleColorName: (color: string) => void;
  toggleSizeId: (id: number) => void;
  setPriceRange: (min: number | null, max: number | null) => void;
  reset: () => void;
}

interface PersistedFiltersState {
  categoryIds: number[];
  brands: string[];
  colorNames: string[];
  sizeIds: number[];
  priceMin: number | null;
  priceMax: number | null;
}

const INITIAL_STATE: PersistedFiltersState = {
  categoryIds: [],
  brands: [],
  colorNames: [],
  sizeIds: [],
  priceMin: null,
  priceMax: null,
};

function toggleInArray<T>(array: T[], value: T): T[] {
  return array.includes(value)
    ? array.filter((item) => item !== value)
    : [...array, value];
}

export const useFiltersStore = create<ProductFiltersState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      toggleCategoryId: (id) =>
        set((state) => ({ categoryIds: toggleInArray(state.categoryIds, id) })),
      toggleBrand: (brand) =>
        set((state) => ({ brands: toggleInArray(state.brands, brand) })),
      toggleColorName: (color) =>
        set((state) => ({
          colorNames: toggleInArray(state.colorNames, color),
        })),
      toggleSizeId: (id) =>
        set((state) => ({ sizeIds: toggleInArray(state.sizeIds, id) })),
      setPriceRange: (priceMin, priceMax) => set({ priceMin, priceMax }),
      reset: () => set(INITIAL_STATE),
    }),
    {
      name: "product-filters",
      storage: createJSONStorage(() => localStorage),
      partialize: (state): PersistedFiltersState => ({
        categoryIds: state.categoryIds,
        brands: state.brands,
        colorNames: state.colorNames,
        sizeIds: state.sizeIds,
        priceMin: state.priceMin,
        priceMax: state.priceMax,
      }),
    },
  ),
);
