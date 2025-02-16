// app/layout.jsx
import "../styles/tailwind.css";
import "../styles/globals.css";

import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "csbSUm",
  description: "Modern App Router Example",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className="min-h-screen flex flex-col">
        <TopBar />
        <Navbar />
        <main className="flex-1 p-4">
          <div className="max-w-7xl mx-auto px-4">
            {children}
          </div>
        </main>
        <footer className="p-4 text-center text-sm text-gray-400">
          © 2025 csbSUm
        </footer>
      </body>
    </html>
  );
}
