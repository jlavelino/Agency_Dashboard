import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Muse Management – Agency Intelligence Dashboard',
  description:
    'Executive dashboard powered by the Infloww API for OnlyFans creator management, chatter operations, and marketing analytics.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-slate-100">
      <body className="h-full bg-slate-100 text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
