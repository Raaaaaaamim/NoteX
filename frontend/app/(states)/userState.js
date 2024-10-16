import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default:
    typeof window !== "undefined" && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
});
