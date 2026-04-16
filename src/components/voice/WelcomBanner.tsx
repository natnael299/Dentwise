import React from 'react'
import { Mic } from 'lucide-react'
function WelcomBanner() {
  return (
    <div className='max-w-7xl mx-auto px-8 py-9 mt-24 flex items-center justify-center bg-gradient-to-br from-primary/13 to-primary/10 rounded-xl'>
      <div className='flex flex-col items-start justify-center space-y-3'>
        <div className='flex items-center border px-4 py-3 space-x-2 rounded-full'>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-primary">voice assistant ready</span>
        </div>
        <h1 className='text-4xl'>AI Voice Assistant</h1>
        <p className='text-muted-foreground max-w-3xl'>
          Talk to your ai dental assistant using natural voice commands. Get instant advice & professional guidance.
        </p>
      </div>

      <div className="hidden lg:block">
        <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
          <Mic className="w-16 h-16 text-primary" />
        </div>
      </div>
    </div>
  )
}

export default WelcomBanner
