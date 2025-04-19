import { create } from "zustand";
import { widgets } from "./db";

export const useWidgetStore = create((set, get) => ({
  widgets: widgets,
  setSearchTerm: (term) => set({ searchTerm: term }),
  getByTag: (tag) => get().widgets.filter((item) => item.tag === tag),
  getWidgets: () => {
    return widgets;
  },
}));
export const useItemsStore = create((set, get) => ({
  items: [{}],
  getItems: () => {
    return get().items;
  },
  addItem: (newItem) => {
    set((state) => ({
      items: [...state.items, newItem],
    }));
  },
  deleteItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },
}));
