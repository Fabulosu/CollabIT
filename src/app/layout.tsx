import { getServerSession } from 'next-auth'
import './globals.css'
import { authConfig } from '@/lib/auth';
import SessionProvider from '@/lib/SessionProvider';
import Navbar from '@/components/ui/navbar';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authConfig);
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <div className="flex flex-col h-screen">
            <Navbar />
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}