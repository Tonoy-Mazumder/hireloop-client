import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import type { JobForm } from "@/app/dashboard/recruiter/jobs/new/page"
import {
  Boxes,
  Briefcase,
  Code2,
  Globe,
  MapPin,
  Megaphone,
  MoreHorizontal,
  Pencil,
  PenTool,
  Plus,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react"

type JobPost = JobForm & {
  id: string
  applicants: number
  status: "Active" | "Reviewing" | "Closed"
  postedAt: string
}

const jobPosts: JobPost[] = [
  {
    id: "1",
    jobTitle: "Frontend Developer",
    jobCategory: "Engineering & Tech",
    companyName: "HirePulse Network",
    jobType: "Full-time",
    isRemote: true,
    location: "New York, USA",
    minSalary: "25",
    maxSalary: "40",
    salaryFrequency: "per hour",
    deadline: "2025-05-30",
    responsibilities:
      "Build responsive UIs, collaborate with backend engineers, and ship micro-interaction rich products.",
    qualifications: "3+ years of React experience and a strong eye for detail.",
    applicants: 34,
    status: "Active",
    postedAt: "4d ago",
  },
  {
    id: "2",
    jobTitle: "Senior Product Designer",
    jobCategory: "Design",
    companyName: "HirePulse Labs",
    jobType: "Full-time",
    isRemote: true,
    location: "London, UK (Hybrid)",
    minSalary: "90k",
    maxSalary: "115k",
    salaryFrequency: "per year",
    deadline: "2025-06-14",
    responsibilities:
      "Own end-to-end product design from wireframes to polished interfaces.",
    qualifications: "5+ years designing SaaS products with a strong portfolio.",
    applicants: 19,
    status: "Active",
    postedAt: "1w ago",
  },
  {
    id: "3",
    jobTitle: "DevOps Specialist",
    jobCategory: "Engineering & Tech",
    companyName: "HirePulse Platform",
    jobType: "Full-time",
    isRemote: false,
    location: "Berlin, Germany",
    minSalary: "95k",
    maxSalary: "120k",
    salaryFrequency: "per year",
    deadline: "2025-06-30",
    responsibilities:
      "Manage CI/CD pipelines, cloud infrastructure, and deployment reliability.",
    qualifications: "Strong experience with Docker, Kubernetes, and AWS.",
    applicants: 12,
    status: "Active",
    postedAt: "2w ago",
  },
  {
    id: "4",
    jobTitle: "Product Marketing Lead",
    jobCategory: "Marketing",
    companyName: "HirePulse Network",
    jobType: "Full-time",
    isRemote: true,
    location: "EU/US",
    minSalary: "80k",
    maxSalary: "105k",
    salaryFrequency: "per year",
    deadline: "2025-07-15",
    responsibilities:
      "Lead go-to-market campaigns and position products across channels.",
    qualifications: "4+ years in B2B product marketing roles.",
    applicants: 27,
    status: "Active",
    postedAt: "5d ago",
  },
]

const categoryStyles: Record<
  string,
  { icon: React.ElementType; className: string }
> = {
  "Engineering & Tech": {
    icon: Code2,
    className: "bg-sky-500/10 text-sky-500",
  },
  Design: { icon: PenTool, className: "bg-orange-500/10 text-orange-500" },
  Marketing: { icon: Megaphone, className: "bg-teal-500/10 text-teal-500" },
  Sales: { icon: TrendingUp, className: "bg-violet-500/10 text-violet-500" },
  Product: { icon: Boxes, className: "bg-pink-500/10 text-pink-500" },
}

const statusStyles: Record<JobPost["status"], string> = {
  Active: "bg-emerald-500/10 text-emerald-500",
  Reviewing: "bg-amber-500/10 text-amber-500",
  Closed: "bg-red-500/10 text-red-500",
}

const frequencyShort: Record<string, string> = {
  "per hour": "hr",
  "per day": "day",
  "per month": "mo",
  "per year": "yr",
}

function formatCompensation(job: JobForm) {
  const frequency = frequencyShort[job.salaryFrequency] ?? job.salaryFrequency
  return `€${job.minSalary} – €${job.maxSalary} / ${frequency}`
}

function formatDeadline(deadline: string) {
  const date = new Date(deadline)
  if (Number.isNaN(date.getTime())) return deadline
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function MangeJobPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">
          Manage Jobs <span className="mx-1">›</span> Job Listings &amp;
          Postings
        </p>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Manage Job Posts</h1>
            <p className="text-sm text-muted-foreground">
              Review live listings, monitor applicants, and update job details
              across your organization.
            </p>
          </div>
          <Button render={<Link href="/dashboard/recruiter/jobs/new" />}>
            <Plus data-icon="inline-start" />
            New Job Post
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Job Title &amp; Dept</TableHead>
              <TableHead>Company &amp; Location</TableHead>
              <TableHead className="hidden lg:table-cell">Type</TableHead>
              <TableHead>Compensation</TableHead>
              <TableHead className="hidden lg:table-cell">Applicants</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobPosts.map((job) => {
              const { icon: CategoryIcon, className } = categoryStyles[
                job.jobCategory
              ] ?? {
                icon: Briefcase,
                className: "bg-muted text-muted-foreground",
              }
              return (
                <TableRow key={job.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center rounded-lg",
                          className
                        )}
                      >
                        <CategoryIcon className="size-4" />
                      </span>
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">{job.jobTitle}</p>
                        <p className="text-xs text-muted-foreground">
                          {job.jobCategory}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">{job.companyName}</p>
                      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        {job.isRemote ? (
                          <Globe className="size-3.5" />
                        ) : (
                          <MapPin className="size-3.5" />
                        )}
                        {job.isRemote
                          ? `Remote (${job.location})`
                          : job.location}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge variant="secondary">{job.jobType}</Badge>
                  </TableCell>
                  <TableCell className="text-sm whitespace-nowrap">
                    {formatCompensation(job)}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Users className="size-4" />
                      {job.applicants} Candidates
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
                        statusStyles[job.status]
                      )}
                    >
                      <span className="size-1.5 rounded-full bg-current" />
                      {job.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-0.5 whitespace-nowrap">
                      <p className="text-sm">{formatDeadline(job.deadline)}</p>
                      <p className="text-xs text-muted-foreground">
                        Posted {job.postedAt}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        render={<Link href={`/dashboard/recruiter/jobs/new`} />}
                      >
                        <Pencil data-icon="inline-start" />
                        Update
                      </Button>
                      <Button variant="ghost" size="icon-sm">
                        <Trash2 className="text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon-sm">
                        <MoreHorizontal className="text-muted-foreground" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default MangeJobPage
