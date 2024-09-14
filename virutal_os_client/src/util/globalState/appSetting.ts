import { create } from "zustand";

export type Theme = "dark" | "light" | "default";
export type FontSize =
  | "small"
  | "extra-small"
  | "medium"
  | "large"
  | "extra-large";

type UserData = {
  firstName: string;
  lastName: string;
  number: string;
  dob: Date;
  email: string;
  password: string;
};

const dummyUser: UserData = {
  firstName: "Surajit",
  lastName: "Maity",
  number: "7210202832",
  dob: new Date("2003-08-10"),
  email: "surajit@gmail.com",
  password: "xxxxxxx",
};

interface StoreState {
  theme: Theme;
  fontSize: number;
  changeTheme: (theme: Theme) => void;
  changeFontSize: (size: FontSize) => void;
  userData: UserData;
}

export const useStore = create<StoreState>((set) => ({
  theme: "dark",
  fontSize: 12,
  userData: dummyUser,

  changeTheme: (theme) => set(() => ({ theme })),

  changeFontSize: (fontSize) =>
    set((state) => {
      switch (fontSize) {
        case "extra-small":
          return { ...state, fontSize: 8 };
        case "small":
          return { ...state, fontSize: 12 };
        case "medium":
          return { ...state, fontSize: 13 };
        case "large":
          return { ...state, fontSize: 14 };
        case "extra-large":
          return { ...state, fontSize: 16 };
        default:
          return state;
      }
    }),
}));
