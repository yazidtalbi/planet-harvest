import localFont from 'next/font/local';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

const garamond = localFont({
  src: [
    {
      path: '../public/fonts/GaramondNovaCond Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/GaramondNovaCond Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/GaramondNovaCond Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/GaramondNovaCond Bold Italic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-serif',
  display: 'swap',
});

const helveticaNeue = localFont({
  src: [
    {
      path: '../public/fonts/HelveticaNeueRoman.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://planetharvest.com'),
  title: 'Planet Harvest — From Farms to Communities',
  description: 'Reimagining how food moves from farms to communities. Unlocking the value of every whole harvest.',
  openGraph: {
    title: 'Planet Harvest — From Farms to Communities',
    description: 'Reimagining how food moves from farms to communities. Unlocking the value of every whole harvest.',
    url: 'https://planetharvest.com',
    siteName: 'Planet Harvest',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Planet Harvest — From Farms to Communities',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Planet Harvest — From Farms to Communities',
    description: 'Reimagining how food moves from farms to communities. Unlocking the value of every whole harvest.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${garamond.variable} ${helveticaNeue.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
