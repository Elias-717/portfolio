import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "TODO: one-line description",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <a href="/" className="font-semibold">TODO: Your Name</a>
          <nav className="flex gap-6 text-sm">
            <a href="/#projects">Projects</a>
            <a href="/#about">About</a>
            <a href="/#contact">Contact</a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
