import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import QueryProvider from '@/lib/query-client-provider';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Lead Flow',
  description: 'A simple way to manage leads',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();

  const session = cookieStore.get('session');

  if (!session) {
    redirect('/auth/login');
  }

  return (
    <html lang="en">
      <head>
        <script
          async
          crossOrigin="anonymous"
          src="https://tweakcn.com/live-preview.min.js"
        />
      </head>
      <body
        className={`${geistSans.className} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <SidebarProvider>
            <AppSidebar />
            <main className="flex flex-col w-full">
              <div className="border-b w-full sticky top-0 z-50 bg-background h-16 flex items-center">
                <SidebarTrigger />
              </div>
              <div className="flex-1 p-2">{children}</div>
            </main>
          </SidebarProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
