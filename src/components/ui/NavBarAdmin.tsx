"use client"
import { SignOutButton, UserButton, useUser } from '@clerk/nextjs'
import { CalendarIcon, CrownIcon, HomeIcon, Mic } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from './button';
function NavBarAdmin() {

  const pathName = usePathname();
  const { user } = useUser();
  return (
    <nav className='fixed top-0 right-0 left-0 z-50 px-6 py-2 border-b border-border/50 bg-background/80 backdrop-blur-md h-16'>
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
        <div className='flex items-center gap-8'>
          {/* logo */}
          <Image src="/logo.png" alt='Dentwise-logo' width={40} height={40} />

          <Link href="/dashboard"
            className={
              `flex items-center gap-2 hover:text-foreground
            ${pathName === "/dashboard"
                ? "text-foreground hover:text-primary"
                : "text-muted-foreground hover:text-foreground"}`}>
            <HomeIcon className='w-4 h-4' />
            <span className='hidden md:inline'>Dashboard</span>
          </Link>

          <Link href="/dashboard/appointments"
            className={
              `flex items-center gap-2
             ${pathName === "/dashboard/appointments"
                ? "text-foreground hover:text-primary"
                : "text-muted-foreground hover:text-foreground"}`}>
            <CalendarIcon className='w-4 h-4' />
            <span className='hidden md:inline'>Appointments</span>
          </Link>

          <Link href='/voice'
            className={
              `flex items-center gap-2
            ${pathName === "/voice"
                ? "text-foreground hover:text-primary"
                : "text-muted-foreground hover:text-foreground"}`}>
            <Mic className='w-4 h-4' />
            <span className='hidden md:inline'>Voice</span>
          </Link>

          <Link href='/pro'
            className={
              `flex items-center gap-2
            ${pathName === "/pro"
                ? "text-foreground hover:text-primary"
                : "text-muted-foreground hover:text-foreground"}`}>
            <CrownIcon className='w-4 h-4' />
            <span className='hidden md:inline'>Pro</span>
          </Link>
        </div>

        {/* Right-Side */}
        <div className="flex items-center gap-3">
          <div className='hidden lg:flex'>
            <span className="text-sm font-medium text-foreground">
              {user?.emailAddresses?.[0]?.emailAddress}
            </span>
          </div>
          <UserButton />
        </div>
      </div>
    </nav>
  )
}

export default NavBarAdmin
