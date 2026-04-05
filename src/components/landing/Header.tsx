import { Show, SignInButton, SignOutButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Image from "next/image"
import Link from 'next/link'
import { Button } from '../ui/button'
function Header() {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 flex py-2 px-4 border-b border-border/90 bg-background/50 backdrop-blur-md h-16">
      <div className="w-full mx-auto flex justify-between items-center">
        <Link href="/" className='flex gap-2 items-center'>
          <Image src="/logo.png" alt="Dentwise logo" width={30} height={30} />
          <strong>Dentwise</strong>
        </Link>

        <div className='hidden md:flex gap-8 items-center'>
          <p className='text-muted-foreground hover:text-foreground'>How it Works</p>
          <p className='text-muted-foreground hover:text-foreground'>Pricing</p>
          <p className='text-muted-foreground hover:text-foreground'>About</p>
        </div>

        <div className='flex gap-4 items-center'>
          <Show when="signed-out">
            <SignInButton mode='modal'>
              <Button variant="ghost">Login</Button>
            </SignInButton>
            <SignUpButton mode='modal'>
              <Button variant="outline">Signup</Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <SignOutButton>
              <Button variant="destructive">Logout</Button>
            </SignOutButton>
            <UserButton />
          </Show>
        </div>
      </div>
    </nav>
  )
}
export default Header
