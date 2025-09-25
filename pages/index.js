import Head from 'next/head';
import HeroSection from '../components/HeroSection';

export default function Home() {
  const data = {
    title: 'Desktop Portfolio',
    description: 'Meet an interactive portfolio site designed in desktop view. Experience an operating system experience by navigating through familiar icons and applications.',
    author: 'aailily',
    themeColor: '#68bcdc',
    url: 'https://www.google.com',
    favicon: 'https://jworse.com/img/favicon.png',
    siteName: 'aailily.com'
  };

  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <meta name="author" content={data.author} />
        <meta name="theme-color" content={data.themeColor} />
        <meta name="robots" content="Index" />
        <link rel="canonical" href={data.url} />
        <link rel="icon" type="image/png" sizes="32x32" href={data.favicon} />
         
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={data.siteName} />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.description} />
        <meta property="og:url" content={data.url} />
        
        <meta property="twitter:url" content={data.url} />
        <meta property="twitter:title" content={data.title} />
        <meta property="twitter:description" content={data.description} />
      </Head>
      <main>
        <HeroSection />
      </main>
    </>
  );
}