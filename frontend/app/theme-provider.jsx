// theme-provider.jsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { RecoilRoot } from "recoil";

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider themes={["light", "dark", "ramim"]} {...props}>
      <RecoilRoot>{children}</RecoilRoot>
    </NextThemesProvider>
  );
}
