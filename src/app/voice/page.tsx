import NavBarAdmin from '@/components/ui/NavBarAdmin'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import PaidPlanInvite from './PaidPlanInvite';
import Features from './Features';
import WelcomBanner from './WelcomBanner';
import VapiVoiceAgent from './VapiVoiceAgent';

async function Voice() {
  const user = currentUser();
  if (!user) redirect("/");

  const { has } = await auth();

  const hasPaidPlan = has({ plan: "ai_basic" }) || has({ plan: "ai_pro" });
  if (!hasPaidPlan) return <PaidPlanInvite />;

  return (
    <>
      <NavBarAdmin />
      <WelcomBanner />
      <div className='mt-10'>
        <Features />
        <VapiVoiceAgent />
      </div>

    </>
  )
}

export default Voice
