"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { signUp } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

const inputClassName =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/30"

export default function SignUpPage() {
    const router = useRouter()
  // Collects all form data. Auth integration happens later:
  // pass `data` to authClient.signUp.email(data).
 async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const userData = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    }
    // TODO: integrate authClient.signUp.email(data)
    const {data,error} = await signUp.email({
        ...userData,
        callbackURL: '/sign-in'
    })
    if(data?.user){
        router.push('/sign-in')
    }
    console.log("[auth:sign-up]", userData)
    console.log(data)  
  }

  return (
    <section className="flex min-h-[calc(100vh-6.5rem)] items-center justify-center bg-[#010103] px-4 py-10 text-white sm:py-16">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/50 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.4)] sm:p-8">
        {/* Toggle between sign in / sign up */}
        <div className="mx-auto flex w-fit rounded-full border border-white/10 bg-white/5 p-1">
          <Link
            href="/sign-in"
            className="rounded-full px-4 py-1.5 text-sm text-white/60 transition-colors hover:text-white"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="rounded-full bg-indigo-500 px-4 py-1.5 text-sm text-white transition-colors"
          >
            Sign Up
          </Link>
        </div>

        <p className="mt-6 text-center font-mono text-xs tracking-widest text-white/50">
          HIRELOOP
        </p>
        <h1 className="mt-2 text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          Create your account
        </h1>
        <p className="mt-2 text-center text-sm text-white/60">
          Join HireLoop and land your next role — faster.
        </p>

        <form
          className="mt-8 flex flex-col gap-4"
          onSubmit={handleSubmit}
          noValidate
        >
          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-xs tracking-widest text-white/50 uppercase">
              Full Name
            </span>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              autoComplete="name"
              required
              className={inputClassName}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-xs tracking-widest text-white/50 uppercase">
              Email
            </span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className={inputClassName}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-xs tracking-widest text-white/50 uppercase">
              Password
            </span>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              autoComplete="new-password"
              required
              minLength={8}
              className={inputClassName}
            />
          </label>

          <Button
            type="submit"
            className="mt-2 h-10 w-full rounded-xl bg-indigo-500 text-white hover:bg-indigo-400"
          >
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-white/60">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-white underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
  )
}
