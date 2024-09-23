import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

export type IO = {
  command: string;
  output: string;
  id: string;
};
interface TerminalState {
  commandHistory: IO[];
  lastCommand: IO | null;
  keyPress: string | null;
  cursorPosition: number;
  timestamp: number;
  pushToCommandHistory: (cmnd: IO) => void;
  writeToTerminal: (key: string) => void;
  clearTerminal: () => void;
}

type PersistInterFace = (
  config: StateCreator<TerminalState>,
  options: PersistOptions<TerminalState>
) => StateCreator<TerminalState>;

const useTerminalStore = create<TerminalState>(
  (persist as PersistInterFace)(
    (set, get) => ({
      commandHistory: [],
      timestamp: Date.now(),
      lastCommand: null,
      cursorPosition: 0,
      keyPress: null,
      pushToCommandHistory: (command: IO) =>
        set((state) => ({
          commandHistory: [...state.commandHistory, command],
          lastCommand: command,
        })),
      writeToTerminal: (key) =>
        set((state) => ({
          keyPress: key,
          timestamp: Date.now(),
        })),
      clearTerminal: () => set(() => ({ commandHistory: [] })),
    }),
    {
      name: "terminal-storage",
      getStorage: () => sessionStorage,
    }
  )
);

export default useTerminalStore;
