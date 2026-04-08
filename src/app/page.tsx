import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Guidance from '@/components/landing/Guidance';
import PromtinGuidance from '@/components/landing/PromtinGuidance';
import Pricing from '@/components/landing/Pricing';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
export default async function Home() {
  const user = await currentUser();
  //if (user) redirect("/dashboard"); //redirects authenticated user
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <Hero />
      <Guidance />
      <PromtinGuidance />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}
