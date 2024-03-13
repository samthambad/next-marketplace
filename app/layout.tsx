import '../styles/globals.css'
import Navbar from "@/components/ui/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { checkLoggedIn } from '@/lib/actions';

export default async function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  const userDetails = await checkLoggedIn();
  return (
    <html lang="en">
      <body> 
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main>
            <Navbar user={userDetails} />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
