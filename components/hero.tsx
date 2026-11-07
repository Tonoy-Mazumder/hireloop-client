import Image from "next/image"
import {
  BriefcaseBusinessIcon,
  Building2Icon,
  MapPinIcon,
  SearchIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react"

import globe from "@/app/images/globe.png"

const trendingKeywords = [
  "Product Designer",
  "AI Engineering",
  "DevOps Engineer",
]

const stats = [
  { icon: BriefcaseBusinessIcon, value: "50K", label: "Active Jobs" },
  { icon: Building2Icon, value: "12K", label: "Companies" },
  { icon: UsersIcon, value: "2M", label: "Job Seekers" },
  { icon: StarIcon, value: "97%", label: "Satisfaction Rate" },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#010103] text-white">
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 pt-16 text-center sm:pt-24">
        {/* New jobs badge */}
        <div className="inline-flex rounded-full bg-gradient-to-b from-white/25 to-white/5 p-px shadow-[0_8px_30px_rgba(255,255,255,0.08)]">
          <span className="inline-flex items-center gap-2 rounded-full bg-neutral-950 py-1.5 pr-3.5 pl-2.5">
            <span aria-hidden className="text-sm">
              💼
            </span>
            <span className="font-mono text-xs tracking-widest">
              <span className="font-medium text-white">50,000+</span>
              <span className="text-white/50"> NEW JOBS THIS WEEK</span>
            </span>
          </span>
        </div>

        <h1 className="mt-6 bg-gradient-to-b from-white to-white/80 bg-clip-text text-4xl font-semibold tracking-tight text-transparent drop-shadow-[0_10px_40px_rgba(255,255,255,0.15)] sm:text-5xl md:text-6xl">
          Find Your Dream Job Today
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-6 text-white/60 sm:text-base sm:leading-7">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search bar (visual only) */}
        <div className="mt-8 flex w-full max-w-lg flex-col gap-1.5 rounded-2xl border border-white/10 bg-black/50 p-2 shadow-[0_10px_40px_rgba(0,0,0,0.4)] sm:flex-row sm:items-center sm:gap-1">
          <label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl bg-white/[0.03] px-3 py-2.5 sm:bg-transparent">
            <SearchIcon className="size-4 shrink-0 text-white/40" />
            <input
              type="text"
              placeholder="Job title, skill or company"
              className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
            />
          </label>
          <div
            aria-hidden
            className="hidden h-6 w-px shrink-0 bg-white/10 sm:block"
          />
          <label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl bg-white/[0.03] px-3 py-2.5 sm:w-44 sm:flex-none sm:bg-transparent">
            <MapPinIcon className="size-4 shrink-0 text-white/40" />
            <input
              type="text"
              placeholder="Location or Remote"
              className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
            />
          </label>
          <button
            type="button"
            aria-label="Search"
            className="mx-auto grid size-10 shrink-0 place-items-center rounded-[10px] bg-indigo-500 transition-colors hover:bg-indigo-400 sm:mx-0 sm:size-9"
          >
            <SearchIcon className="size-4 text-white" />
          </button>
        </div>

        {/* Trending positions */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="font-mono text-xs text-white/60">
            Trending Position
          </span>
          {trendingKeywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-md border border-white/15 bg-white/5 px-2 py-1 font-mono text-xs text-white/80"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* Globe visual with overlay copy and stats cards */}
      <div className="relative mt-8 h-[460px] sm:h-[520px] lg:h-[640px]">
        <Image
          src={globe}
          alt=""
          priority
          sizes="100vw"
          className="pointer-events-none absolute -top-[370px] left-1/2 w-[820px] max-w-none -translate-x-1/2 sm:-top-[500px] sm:w-[1100px] lg:-top-[650px] lg:w-[1400px]"
        />

        <p className="absolute bottom-40 left-1/2 w-full max-w-md -translate-x-1/2 px-4 text-center text-2xl leading-snug text-white/75 sm:bottom-48 sm:text-3xl md:bottom-52">
          Assisting over <span className="text-white">15,000 job seekers</span>{" "}
          find their dream positions.
        </p>

        <div className="absolute inset-x-4 bottom-4 mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:inset-x-8 sm:bottom-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-neutral-950/60 p-4 backdrop-blur-[2px] sm:p-5"
            >
              <stat.icon className="size-4 text-white/70" />
              <div className="mt-5 text-2xl font-semibold sm:mt-7 sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-white/60 sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
