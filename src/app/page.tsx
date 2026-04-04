
import { Show, SignInButton, SignOutButton, SignUpButton, UserButton } from '@clerk/nextjs'
export default function Home() {
  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16">
      <Show when="signed-out">
        <SignInButton mode='modal' />
        <SignUpButton mode='modal' />
      </Show>
      <Show when="signed-in">
        <SignOutButton />
        <UserButton />
      </Show>
    </header>
  );
}
