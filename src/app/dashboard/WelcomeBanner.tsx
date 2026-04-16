import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image"

async function WelcomeBanner() {
  const user = await currentUser();
  console.log(user);
  return (
    <div className='max-w-7xl mx-auto px-8 py-9 mt-24 flex items-center justify-center bg-gradient-to-br from-primary/13 to-primary/10 rounded-xl'>
      <div className='flex flex-col items-start justify-center space-y-3'>
        <div className='flex items-center border px-4 py-3 space-x-2 rounded-full'>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-primary">online & ready</span>
        </div>
        <h1 className='text-4xl'>AI Voice Assistant</h1>
        <p className='text-muted-foreground max-w-3xl'>
          Your personal AI dental assistant is ready to help you maintain perfect oral health.
        </p>
      </div>

      <div className="hidden lg:block">
        <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
          <Image
            src="/logo.on"
            alt="Dentwise logo"
            width={64} height={64} />
        </div>
      </div>
    </div>
  )
}

export default WelcomeBanner
