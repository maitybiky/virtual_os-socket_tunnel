import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { KeyBoardThemeNames, KeyStyles } from "../types";

interface EditorSettingState {
  keyStyle: KeyStyles;
  whichKeyLayout: 0 | 1;
  vibration: number;
  keyBoardTheme: KeyBoardThemeNames;
  keySpacing: number;
  keyFontSize: number;
  keyHeight: number;
  keyWidth: number;
  setVibration: (value: number) => void;
  toogleKeyLayout: () => void;
  changeKeyStyle: (style: KeyStyles) => void;
  changeKeyBoardTheme: (style: KeyBoardThemeNames) => void;
  setKeySpacing: (space: number) => void;
  setKeyFontSize: (space: number) => void;
  setKeyheight: (space: number) => void;
  setKeyWidth: (space: number) => void;
}

type PersistInterFace = (
  config: StateCreator<EditorSettingState>,
  options: PersistOptions<EditorSettingState>
) => StateCreator<EditorSettingState>;

const useEditorSettingStore = create<EditorSettingState>(
  (persist as PersistInterFace)(
    (set, get) => ({
      keyStyle: "outlined",
      keySpacing: 1,
      keyFontSize: 8,
      whichKeyLayout: 0,
      vibration: 30,
      keyHeight: 12,
      keyWidth: 20,
      toogleKeyLayout: () =>
        set((state) => ({ whichKeyLayout: state.whichKeyLayout ? 0 : 1 })),
      keyBoardTheme: "RGB",
      setVibration: (value: number) => set(() => ({ vibration: value })),
      changeKeyStyle: (style) => set(() => ({ keyStyle: style })),
      changeKeyBoardTheme: (theme) => set(() => ({ keyBoardTheme: theme })),
      setKeySpacing: (space) => set(() => ({ keySpacing: space })),
      setKeyFontSize: (size) => set(() => ({ keyFontSize: size })),
      setKeyheight: (height) => set(() => ({ keyHeight: height })),
      setKeyWidth: (width) => set(() => ({ keyWidth: width })),
    }),
    {
      name: "editor-setting-storage",
      getStorage: () => sessionStorage,
    }
  )
);

export default useEditorSettingStore;
