'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, PenLine, House, Info, Mail, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import Image from 'next/image';

export function MainNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <img alt="logo" src="/logo2.png" height={400} width={400} className="h-6 w-6 hidden sm:flex" />
            <span className="hidden font-bold sm:inline-block">
              Kavyapath
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center space-x-2">
          <Link href="/">
            <Button
              variant={pathname === '/' ? 'secondary' : 'ghost'}
              size="sm"
            >
              <House className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
          <Link href="/about">
              <Button
                variant={pathname === '/about' ? 'secondary' : 'ghost'}
                className="w-full sm:flex justify-start hidden"
                size="sm"
              >
                <Info className="mr-2 h-4 w-4" />
                About
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant={pathname === '/contact' ? 'secondary' : 'ghost'}
                className="w-full justify-start hidden sm:flex"
                size="sm"
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact
              </Button>
            </Link>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <ModeToggle />
          <Link href="/write" onClick={() => setMenuOpen(false)}>
              <Button
                variant={pathname === '/write' ? 'secondary' : 'ghost'}
                className="w-full justify-start hidden sm:flex"
                size="sm"
              >
                <PenLine className="mr-2 h-4 w-4" />
                Write
              </Button>
            </Link>
          <Link href="/profile" onClick={() => setMenuOpen(false)}>
              <Button
                variant={pathname === '/profile' ? 'secondary' : 'ghost'}
                className="w-full justify-start hidden sm:flex"
                size="sm"
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
            </Link>
          <button
            className="sm:hidden p-2 rounded-md"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="sm:hidden border-t bg-background">
          <nav className="flex flex-col space-y-2 p-4">
          <Link href="/">
            <Button
              variant={pathname === '/' ? 'secondary' : 'ghost'}
              size="sm"
            >
              <House className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>
              <Button
                variant={pathname === '/about' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                size="sm"
              >
                <Info className="mr-2 h-4 w-4" />
                About
              </Button>
            </Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>
              <Button
                variant={pathname === '/contact' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                size="sm"
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact
              </Button>
            </Link>
            <Link href="/write" onClick={() => setMenuOpen(false)}>
              <Button
                variant={pathname === '/write' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                size="sm"
              >
                <PenLine className="mr-2 h-4 w-4" />
                Write
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
