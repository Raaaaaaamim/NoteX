// RootLayout.jsx
import { Toaster } from "@/components/ui/toaster.jsx";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider.jsx";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "NoteX",
  description: "A note taking app. App by @tahmidramim",
  favicon: "./icon.jpeg",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true} // Boolean value
          disableTransitionOnChange={true} // Boolean value
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
