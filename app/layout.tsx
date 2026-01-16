import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import ConvexClientProvider from '@/components/ConvexClientProvider'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://easystage.nl'),
  title: {
    default: 'easystage.nl - Vind de perfecte stage op basis van jouw interesses',
    template: '%s | easystage.nl'
  },
  description: 'easystage.nl helpt studenten de perfecte stage te vinden op basis van hun interesses, studierichting en ambities. Ontdek stageplekken bij topbedrijven in Nederland.',
  keywords: ['stage zoeken', 'stage vacatures', 'stage vinden', 'stageplekken', 'stagebegeleiding', 'stage nederland', 'internship', 'student stage', 'stage platform'],
  authors: [{ name: 'easystage.nl' }],
  creator: 'easystage.nl',
  publisher: 'easystage.nl',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://easystage.nl',
    siteName: 'easystage.nl',
    title: 'easystage.nl - Vind de perfecte stage op basis van jouw interesses',
    description: 'easystage.nl helpt studenten de perfecte stage te vinden op basis van hun interesses, studierichting en ambities. Ontdek stageplekken bij topbedrijven in Nederland.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'easystage.nl - Stage platform voor studenten',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'easystage.nl - Vind de perfecte stage op basis van jouw interesses',
    description: 'easystage.nl helpt studenten de perfecte stage te vinden op basis van hun interesses, studierichting en ambities.',
    images: ['/og-image.png'],
    creator: '@easystage',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://easystage.nl',
  },
  category: 'education',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}


