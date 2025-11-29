"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Logo } from "@/components/ui/logo";
import { useAuth } from "@/contexts/auth-context";
import { LoginModal } from "@/components/modals/login-modal";
import { JoinModal } from "@/components/modals/join-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Eye, LogOut, Menu, Trophy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export function Header() {
  const { user, logout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="grid grid-cols-3 md:flex md:justify-between items-center border-b border-border p-6 animate-fade-down sticky top-0 z-40 bg-background/95 backdrop-blur-sm transition-all duration-300">
      {/* Mobile menu button - left on mobile */}
      <div className="md:hidden flex justify-start">
        <Dialog open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <DialogTrigger asChild>
            <button
              className="p-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent rounded"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </DialogTrigger>
          <DialogContent className="w-[85vw] max-w-xs rounded-lg">
            <nav className="flex flex-col gap-4">
              {/* Logo/Title */}
              <DialogClose asChild>
                <Link
                  href="/"
                  className="hover:opacity-80 transition-opacity block"
                >
                  <Logo size="sm" />
                </Link>
              </DialogClose>

              {/* Navigation Links - only for logged in users */}
              {user && (
                <div className="flex flex-col gap-2 py-4 border-y border-border">
                  <DialogClose asChild>
                    <Link
                      href="/"
                      className="px-3 py-2 text-sm hover:bg-background-lighter rounded transition-colors flex items-center gap-2"
                    >
                      <Trophy className="h-4 w-4" />
                      Leaderboard
                    </Link>
                  </DialogClose>
                  <DialogClose asChild>
                    <Link
                      href="/me"
                      className="px-3 py-2 text-sm hover:bg-background-lighter rounded transition-colors flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      My Dashboard
                    </Link>
                  </DialogClose>
                  <DialogClose asChild>
                    <Link
                      href={`/u/${user.username}`}
                      className="px-3 py-2 text-sm hover:bg-background-lighter rounded transition-colors flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      My Profile
                    </Link>
                  </DialogClose>
                </div>
              )}

              {/* Auth Buttons */}
              <div className="flex flex-col gap-2">
                {!user ? (
                  <>
                    <DialogClose asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsLoginModalOpen(true)}
                        className="w-full justify-start"
                      >
                        Log in
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setIsJoinModalOpen(true)}
                        className="w-full justify-start"
                      >
                        Join the Leaderboard
                      </Button>
                    </DialogClose>
                  </>
                ) : (
                  <DialogClose asChild>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={logout}
                      className="w-full justify-start"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Log Out
                    </Button>
                  </DialogClose>
                )}
              </div>
            </nav>
          </DialogContent>
        </Dialog>
      </div>

      {/* Logo - centered on mobile, left on desktop (slides to center on scroll) */}
      <Link
        href="/"
        className={`hover:opacity-80 flex justify-center md:justify-start transition-transform duration-1000 ease-out ${isScrolled ? "md:[transform:translateX(calc(50vw-50%-1.5rem))]" : ""}`}
      >
        <Logo size="md" animated />
      </Link>

      {/* Placeholder for mobile grid balance */}
      <div className="md:hidden" />

      {/* Desktop Navigation */}
      <div className={`items-center gap-4 hidden md:flex transition-opacity duration-1000 ease-out ${isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        {!user ? (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Log in
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsJoinModalOpen(true)}
            >
              Join the Leaderboard
            </Button>
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent rounded"
                aria-label="User menu"
              >
                <Avatar size="sm" initial={user.username.charAt(0).toUpperCase()} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>@{user.username}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/me" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  My Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/u/${user.username}`} className="cursor-pointer">
                  <Eye className="mr-2 h-4 w-4" />
                  View Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToJoin={() => {
          setIsLoginModalOpen(false);
          setIsJoinModalOpen(true);
        }}
      />

      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onSwitchToLogin={() => {
          setIsJoinModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </header>
  );
}
