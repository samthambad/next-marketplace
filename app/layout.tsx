import type { Metadata } from "next";
import '../styles/globals.css'
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { supabaseServer } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Marketplace Home",
};
export async function checkLoggedIn() {
  const supabase = supabaseServer();
  const {data} = await supabase.auth.getSession();
  return data.session?.user;
}
export default async function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  const userDetails = await checkLoggedIn();
  return (
    <html lang="en">
      <body> 
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <main>
            <Navbar user={userDetails} />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
