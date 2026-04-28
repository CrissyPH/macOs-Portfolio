import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { WINDOW_CONFIG, INITIAL_Z_INDEX } from "#constants/index.js";

const useWindowStore = create(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,  // ✅ Added missing comma

    openWindow: (windowKey, data = null) => set((state) => {
      const win = state.windows[windowKey];
      win.isOpen = true;
      win.zIndex = state.nextZIndex;
      win.data = data ?? win.data;
      state.nextZIndex++;  // ✅ Removed stray `[`
    }),  // ✅ Added missing comma

    closeWindow: (windowKey) => set((state) => {
      const win = state.windows[windowKey];
      win.isOpen = false;
      win.zIndex = INITIAL_Z_INDEX;
      win.data = null;
    }),  // ✅ Added missing comma

    focusWindow: (windowKey) => set((state) => {  // ✅ Added missing `windowKey` param
      const win = state.windows[windowKey];
      win.zIndex = state.nextZIndex;
      state.nextZIndex++;  // ✅ Added increment (otherwise zIndex never advances)
    }),

  })),
);

export default useWindowStore;