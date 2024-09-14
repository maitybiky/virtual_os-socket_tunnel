import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { KeyBoardThemeNames, KeyStyles } from "../types";

interface EditorSettingState {
  keyStyle: KeyStyles;
  whichKeyLayout: 0 | 1;
  vibration: number;
  keyBoardTheme: KeyBoardThemeNames;
  setVibration: (value: number) => void;
  toogleKeyLayout: () => void;
  changeKeyStyle: (style: KeyStyles) => void;
  changeKeyBoardTheme: (style: KeyBoardThemeNames) => void;
}

type PersistInterFace = (
  config: StateCreator<EditorSettingState>,
  options: PersistOptions<EditorSettingState>
) => StateCreator<EditorSettingState>;

const useEditorSettingStore = create<EditorSettingState>(
  (persist as PersistInterFace)(
    (set, get) => ({
      keyStyle: "outlined",
      whichKeyLayout: 0,
      vibration: 30,
      toogleKeyLayout: () =>
        set((state) => ({ whichKeyLayout: state.whichKeyLayout ? 0 : 1 })),
      keyBoardTheme: "RGB",
      setVibration: (value: number) => set(() => ({ vibration: value })),
      changeKeyStyle: (style) => set(() => ({ keyStyle: style })),
      changeKeyBoardTheme: (theme) => set(() => ({ keyBoardTheme: theme })),
    }),
    {
      name: "editor-setting-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useEditorSettingStore;
