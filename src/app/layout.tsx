import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SettingsProvider } from '@/context/SettingsContext';
import SwissAtmosphere from '@/components/editorial/SwissAtmosphere';

export const metadata: Metadata = {
  title: 'CertifyMe | Free Industry Certifications for University Students',
  description:
    "Discover free industry certifications from Google, Microsoft, IBM, Cisco, and more to boost university students' careers.",
  authors: [{ name: 'Rayan Nowarah' }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'CertifyMe | Free Industry Certifications for University Students',
    description:
      "Discover free industry certifications from Google, Microsoft, IBM, Cisco, and more to boost university students' careers.",
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600&family=Outfit:wght@300;400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen relative overflow-x-hidden">
        <SettingsProvider>
          <SwissAtmosphere />
          <Navbar />
          <main className="flex-grow relative z-10 flex flex-col">{children}</main>
          <Footer />
        </SettingsProvider>
      </body>
    </html>
  );
}
