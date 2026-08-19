import Link from 'next/link';
import { Phone } from 'lucide-react';
import { SignInButton, Show, UserButton } from '@clerk/nextjs';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface-hover bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-2xl font-bold tracking-tight text-foreground">
            Heritage<span className="text-accent">*</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/nearby" className="text-sm font-medium text-foreground/80 hover:text-foreground">Explore</Link>
          <Link href="/route" className="text-sm font-medium text-foreground/80 hover:text-foreground">Routes</Link>
          <Link href="/community" className="text-sm font-medium text-foreground/80 hover:text-foreground">Community</Link>
          <Link href="/about" className="text-sm font-medium text-foreground/80 hover:text-foreground">About</Link>
        </nav>
        <div className="flex items-center gap-4">
          <a 
            href="tel:112" 
            className="flex items-center gap-2 rounded-full bg-risk-red px-4 py-2 text-sm font-bold text-white shadow-sm transition-transform hover:scale-105 hover:bg-risk-red/90"
          >
            <Phone className="h-4 w-4" />
            <span>112 Emergency</span>
          </a>
          
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90">
                Sign In
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </header>
  );
}
