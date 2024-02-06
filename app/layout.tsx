import type { Metadata } from "next";
import '../styles/globals.css'
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Marketplace Home",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body> 
        <main>
          <Navbar/>
          {children}
        </main>
      </body>
    </html>
  );
}
