import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from './providers/ThemeProvider';

const geist = Geist({ subsets: ["latin"] });
const geist_mono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Magic Caption",
  description: "AI-powered video captioning tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geist.className}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
