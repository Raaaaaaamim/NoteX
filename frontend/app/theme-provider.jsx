// theme-provider.jsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider themes={["light", "dark", "ramim"]} {...props}>
      {children}
    </NextThemesProvider>
  );
}
