import Head from 'next/head';
import HeroSection from '../components/HeroSection';

export default function Home() {
  return (
    <>
      <Head>
        <title>Desktop Portfolio</title>
        <meta name="description" content="A portfolio website that looks and feels like a desktop operating system" />
      </Head>
      <main>
        <HeroSection />
      </main>
    </>
  );
}