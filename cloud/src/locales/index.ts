export * from "./messages.enum";
import { English } from "./en/user.translation";

export const m = {
  en: English,
};

export const Messages = {
  ...m,
};
