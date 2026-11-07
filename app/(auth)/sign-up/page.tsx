"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
    EyeIcon,
    EyeOffIcon,
    LockIcon,
    MailIcon,
    UserIcon,
    BriefcaseBusinessIcon,
    Building2Icon,
    ShieldCheckIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { signUp } from "@/lib/auth-client"
import { cn } from "cn"

const inputClassName =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/30"

type Role = "seeker" | "recruiter" | "admin"

const roles: Array<{ value: Role; label: string; icon: typeof UserIcon }> = [
    { value: "seeker", label: "Job Seeker", icon: BriefcaseBusinessIcon },
    { value: "recruiter", label: "Recruiter", icon: Building2Icon },
    { value: "admin", label: "Admin", icon: ShieldCheckIcon },
]

export default function SignUpPage() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [role, setRole] = useState<Role>("seeker")

    // Collects all form data. Auth integration happens later:
    // pass `data` to authClient.signUp.email(data).
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const userData = {
            name: String(formData.get("name") ?? ""),
            email: String(formData.get("email") ?? ""),
            password: String(formData.get("password") ?? ""),
            role,
        }
        // TODO: integrate authClient.signUp.email(data)
        const { data, error } = await signUp.email({
            ...userData,
            callbackURL: "/sign-in",
        })
        if (data?.user) {
            router.push("/sign-in")
        }
        console.log("[auth:sign-up]", userData)
        console.log(data, error)
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
                    <div
                        role="radiogroup"
                        aria-label="Account type"
                        className="flex flex-col gap-1.5"
                    >
                        <span className="font-mono text-xs tracking-widest text-white/50 uppercase">
                            I am a
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                            {roles.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    role="radio"
                                    aria-checked={role === option.value}
                                    onClick={() => setRole(option.value)}
                                    className={cn(
                                        "flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs transition-colors",
                                        role === option.value
                                            ? "border-indigo-400/60 bg-indigo-500/15 text-white"
                                            : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white"
                                    )}
                                >
                                    <option.icon
                                        aria-hidden
                                        className={
                                            role === option.value
                                                ? "size-4 text-indigo-300"
                                                : "size-4 text-white/40"
                                        }
                                    />
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <label className="flex flex-col gap-1.5">
                        <span className="font-mono text-xs tracking-widest text-white/50 uppercase">
                            Full Name
                        </span>
                        <div className="relative">
                            <UserIcon
                                aria-hidden
                                className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/40"
                            />
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                autoComplete="name"
                                required
                                className={cn(inputClassName, "pl-10")}
                            />
                        </div>
                    </label>

                    <label className="flex flex-col gap-1.5">
                        <span className="font-mono text-xs tracking-widest text-white/50 uppercase">
                            Email
                        </span>
                        <div className="relative">
                            <MailIcon
                                aria-hidden
                                className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/40"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                autoComplete="email"
                                required
                                className={cn(inputClassName, "pl-10")}
                            />
                        </div>
                    </label>

                    <label className="flex flex-col gap-1.5">
                        <span className="font-mono text-xs tracking-widest text-white/50 uppercase">
                            Password
                        </span>
                        <div className="relative">
                            <LockIcon
                                aria-hidden
                                className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/40"
                            />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="••••••••"
                                autoComplete="new-password"
                                required
                                minLength={8}
                                className={cn(inputClassName, "pr-11 pl-10")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((show) => !show)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                aria-pressed={showPassword}
                                className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-md p-1 text-white/40 transition-colors hover:text-white"
                            >
                                {showPassword ? (
                                    <EyeOffIcon aria-hidden className="size-4" />
                                ) : (
                                    <EyeIcon aria-hidden className="size-4" />
                                )}
                            </button>
                        </div>
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
