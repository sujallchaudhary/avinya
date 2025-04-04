import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { MainNav } from '@/components/main-nav';
import { Footer } from '@/components/footer';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  "title": "Kavyapath - A Digital Space for Hindi Poetry",
  "description": "Kavyapath is a platform dedicated to celebrating Hindi poetry where poets share their work and readers discover authentic voices. Join our vibrant community of poetry enthusiasts.",
  "keywords": "Kavyapath, Hindi Poetry, Poems, Literature, Poets, Readers, Community, Hindi, Kavita, Cultural Expression, Poetry Analysis, Indian Literature",
  "icons": {
    "icon": "https://sdrive.blr1.cdn.digitaloceanspaces.com/files/b54c671503db2cb119e66786039378a3.png"
  },
  "openGraph": {
    "title": "Kavyapath - A Digital Space for Hindi Poetry",
    "description": "Kavyapath is a platform dedicated to celebrating Hindi poetry where poets share their work and readers discover authentic voices. Join our vibrant community of poetry enthusiasts.",
    "url": "https://kavyapath.in",
    "type": "website",
    "images": [
      {
        "url": "https://sdrive.blr1.cdn.digitaloceanspaces.com/files/5d11a492d6e7f6cd29517041f35137a2.png",
        "width": 701,
        "height": 283,
        "alt": "Kavyapath - A Digital Space for Hindi Poetry"
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Kavyapath - A Digital Space for Hindi Poetry",
    "description": "Kavyapath is a platform dedicated to celebrating Hindi poetry where poets share their work and readers discover authentic voices.",
    "images": ["https://sdrive.blr1.cdn.digitaloceanspaces.com/files/5d11a492d6e7f6cd29517041f35137a2.png"]
  },
  "metadataBase": new URL("https://kavyapath.in")
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
<Script async src="https://www.googletagmanager.com/gtag/js?id=G-1QRHFT1BEY"></Script>
<Script id="ga-script">
{`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  
    gtag('config', 'G-1QRHFT1BEY');
`}
</Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <MainNav />
          {children}
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}