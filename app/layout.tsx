import '../styles/globals.css'
import Navbar from "@/components/ui/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { checkLoggedIn } from '@/lib/actions';
import Footer from '@/components/footer';

export default async function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  const userDetails = await checkLoggedIn();
  return (
    <html lang="en">
      <body> 
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className='flex flex-col min-h-screen'>
            <main className='flex-grow'>
              <Navbar user={userDetails} />
              {children}
            </main>
            <Footer/>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
