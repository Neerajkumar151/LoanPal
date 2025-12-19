import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import Features from '@/components/landing/Features';
import WhyChoose from '@/components/landing/WhyChoose';
// import Stats from '@/components/landing/Stats';
import Trust from '@/components/landing/Trust';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';
import FloatingChatbot from '@/components/FloatingChatbot';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <WhyChoose />
        {/* <Stats /> */}
        <Trust />
        <CTA />
      </main>
      <Footer />
      <FloatingChatbot />
    </>
  );
}
