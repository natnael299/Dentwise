"use client"

import { syncUser } from '@/lib/actions/users';
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'

function UserSync() {
  const { isSignedIn, isLoaded } = useUser();
  useEffect(() => {
    const handleUserSunc = async () => {
      if (isSignedIn && isLoaded) {
        try {
          await syncUser();
        } catch (error) {
          console.log("error" + error);
        }
      }
    };
    handleUserSunc();
  }, [isSignedIn, isLoaded]);
  return null;
}

export default UserSync