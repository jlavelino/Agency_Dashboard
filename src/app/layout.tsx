import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Muse Management — OnlyFans Agency Intelligence Dashboard',
  description: 'Executive dashboard powered by the Infloww API for OnlyFans creator management, chatter operations, and marketing analytics.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full">
      <body className="h-full bg-zinc-950 text-zinc-100 antialiased selection:bg-rose-500/30 selection:text-rose-200">
        {children}
      </body>
    </html>
  );
}
