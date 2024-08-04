import { DM_Serif_Text } from 'next/font/google'
import '../styles/globals.css'
import Navbar from "@/components/ui/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { checkLoggedIn } from '@/lib/actions';
import Footer from '@/components/footer';
const dm_serif = DM_Serif_Text({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const userDetails = await checkLoggedIn();
  return (
    <html lang="en" className={dm_serif.className}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className='flex flex-col min-h-screen '>
            <main className='flex-grow'>
              <Navbar user={userDetails} />
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
