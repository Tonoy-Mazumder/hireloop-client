"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"

import logo from "@/app/images/logo.png"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "cn"

const links = [
  { href: "/browse-jobs", label: "Browse Jobs" },
  { href: "/company", label: "Company" },
  { href: "/pricing", label: "Pricing" },
]

function Logo() {
  return (
    <Link href="/" aria-label="Hireloop home" className="shrink-0">
      <Image src={logo} alt="Hireloop" className="h-8 w-auto" priority />
    </Link>
  )
}

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="p-3 sm:p-4">
      <nav className="mx-auto flex h-14 items-center justify-between rounded-xl bg-neutral-950 pr-2 pl-4 sm:pl-5">
        <Logo />

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm text-white/70 transition-colors hover:text-white",
                pathname === link.href && "text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
          <span aria-hidden className="h-5 w-px bg-white/15" />
          <Link
            href="/sign-in"
            className="text-sm text-white/70 transition-colors hover:text-white"
          >
            Sign In
          </Link>
          <Button
            render={<Link href="/sign-up" />}
            className="rounded-lg bg-indigo-500 text-white hover:bg-indigo-400 aria-expanded:bg-indigo-400"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile */}
        <Sheet>
          <SheetTrigger
            render={
              <Button
                size="icon-lg"
                variant="ghost"
                className="text-white hover:bg-white/10 hover:text-white md:hidden"
              />
            }
          >
            <MenuIcon />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-72 max-w-[85vw] border-white/10 bg-neutral-950 text-white [&_[data-slot=sheet-close]]:text-white [&_[data-slot=sheet-close]]:hover:bg-white/10 [&_[data-slot=sheet-close]]:hover:text-white"
          >
            <SheetHeader>
              <SheetTitle className="sr-only">Hireloop menu</SheetTitle>
              <Logo />
            </SheetHeader>

            <nav className="flex flex-col gap-1 px-4">
              {links.map((link) => (
                <SheetClose
                  key={link.href}
                  render={
                    <Link
                      href={link.href}
                      className={cn(
                        "-mx-2 rounded-lg px-2 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white",
                        pathname === link.href && "bg-white/10 text-white"
                      )}
                    />
                  }
                >
                  {link.label}
                </SheetClose>
              ))}
            </nav>

            <SheetFooter className="gap-2">
              <SheetClose
                render={
                  <Button
                    variant="outline"
                    className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  />
                }
              >
                Sign In
              </SheetClose>
              <SheetClose
                render={
                  <Button className="bg-indigo-500 text-white hover:bg-indigo-400" />
                }
              >
                Get Started
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
