import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
interface FileData {
  name: string;
  ext: string;
  content: string;
}
type KeyBoardFor = "file" | "terminal";
interface EditorState {
  currentKeyBoardFor: KeyBoardFor;
  setCurrentKeyBoardFor: (who: KeyBoardFor) => void;
  currentKey: string;
  currentFile: FileData;
  writeToFile: (key: string) => void;
  cursorPosition: number;
  setCursorPosition: (position: number) => void;
}

type PersistInterFace = (
  config: StateCreator<EditorState>,
  options: PersistOptions<EditorState>
) => StateCreator<EditorState>;

const defaultFile: FileData = {
  name: "index",
  ext: "js",
  content: `// console.log("Hello World"); \n const num = 7;`,
};

const useEditorStore = create<EditorState>(
  (persist as PersistInterFace)(
    (set, get) => ({
      currentKeyBoardFor: "file",
      setCurrentKeyBoardFor: (who) => set(() => ({ currentKeyBoardFor: who })),
      currentKey: "",
      currentFile: defaultFile,
      cursorPosition: defaultFile.content.length,
      writeToFile: (key) =>
        set((state) => {
          let state_content = state.currentFile.content;
          let insertPosition = state.cursorPosition;
          if (state_content.length < state.cursorPosition)
            insertPosition = state_content.length;

          switch (key) {
            case "clear":
              state_content =
                state.currentFile.content.substring(0, insertPosition - 1) +
                state.currentFile.content.substring(insertPosition);
              if (insertPosition > 0) insertPosition--;
              break;
            case "enter":
              state_content =
                state.currentFile.content.substring(0, insertPosition) +
                "\n" +
                state.currentFile.content.substring(insertPosition);
              break;
            case "space":
              state_content =
                state.currentFile.content.substring(0, insertPosition) +
                " " +
                state.currentFile.content.substring(insertPosition);
              insertPosition++;
              break;

            default:
              state_content =
                state.currentFile.content.substring(0, insertPosition) +
                key +
                state.currentFile.content.substring(insertPosition);
              insertPosition += key.length;
              break;
          }
          console.log("state_content", insertPosition, state_content);
          return {
            currentFile: {
              ...state.currentFile,
              content: state_content,
            },
            cursorPosition: insertPosition,
          };
        }),
      setCursorPosition: (position) =>
        set((state) => ({ cursorPosition: position })),
    }),
    {
      name: "editor-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useEditorStore;
