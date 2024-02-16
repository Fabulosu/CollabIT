import { getServerSession } from 'next-auth'
import './globals.css'
import { authConfig } from '@/lib/auth';
import SessionProvider from '@/lib/SessionProvider';


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authConfig);
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  )
}