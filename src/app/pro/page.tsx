import NavBarAdmin from '@/components/ui/NavBarAdmin'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import { CrownIcon } from 'lucide-react';
import { PricingTable } from '@clerk/nextjs';

function Pro() {
  const user = currentUser();
  if (!user) redirect("/");

  return (
    <>
      <NavBarAdmin />
      <div className='max-w-7xl mx-auto px-8 py-9 mt-24 flex items-center justify-center bg-gradient-to-br from-primary/13 to-primary/10 rounded-xl'>
        <div className='flex flex-col items-start justify-center space-y-3'>
          <div className='flex items-center border px-4 py-3 space-x-2 rounded-full'>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">Upgrade to Pro</span>
          </div>
          <h1 className='text-4xl'>Unlock Premium AI Dental Care</h1>
          <p className='text-muted-foreground max-w-3xl'>
            Get unlimited AI consultations, advanced features, and priority support to take
            your dental health to the next level.
          </p>
        </div>

        <div className="hidden lg:block">
          <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
            <CrownIcon className="w-16 h-16 text-primary" />
          </div>
        </div>
      </div>

      {/* PRICING SECTION */}

      <div className='mt-20 flex flex-col items-center space-y-4 mb-10'>
        <h2 className="text-3xl font-bold">Choose Your Plan</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-center">
          Select the perfect plan for your dental care needs. All plans include secure access
          and bank-level encryption.
        </p>
        <PricingTable />
      </div>
    </>

  )
}

export default Pro
