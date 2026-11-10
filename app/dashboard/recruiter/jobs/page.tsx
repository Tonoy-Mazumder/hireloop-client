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
import { getJobs } from "@/lib/api/jobs"
import { DeleteJobDialog } from "@/app/components/DeleteJobDialog"

export type JobPost = JobForm & {
    _id: string
    applicants: number
    status: "Active" | "Reviewing" | "Closed"
    postedAt?: string
}

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

const postedRtf = new Intl.RelativeTimeFormat("en", { numeric: "always" })

const postedUnits: Array<{
    unit: Intl.RelativeTimeFormatUnit
    seconds: number
}> = [
        { unit: "hour", seconds: 3600 },
        { unit: "day", seconds: 86400 },
        { unit: "week", seconds: 604800 },
        { unit: "month", seconds: 2592000 },
        { unit: "year", seconds: 31536000 },
    ]

function formatPostedAt(postedAt?: string) {
    const date = postedAt ? new Date(postedAt) : null
    if (!date || Number.isNaN(date.getTime())) return ""
    const diffSeconds = Math.round((date.getTime() - Date.now()) / 1000)
    if (diffSeconds > -60) return "just now"
    const absoluteSeconds = Math.abs(diffSeconds)
    const match = [...postedUnits]
        .reverse()
        .find((u) => absoluteSeconds >= u.seconds)
    if (!match) {
        return postedRtf.format(Math.ceil(diffSeconds / 60), "minute")
    }
    return postedRtf.format(Math.round(diffSeconds / match.seconds), match.unit)
}

function formatAbsoluteDate(postedAt?: string) {
    const date = postedAt ? new Date(postedAt) : null
    if (!date || Number.isNaN(date.getTime())) return undefined
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })
}

async function MangeJobPage() {
    const jobPosts: JobPost[] = await getJobs()
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
                            const postedLabel = formatPostedAt(job.postedAt)
                            const postedDate = formatAbsoluteDate(job.postedAt)
                            return (
                                <TableRow key={job._id}>
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
                                            <p
                                                className="text-xs text-muted-foreground"
                                                title={postedDate}
                                            >
                                                {postedLabel ? `Posted ${postedLabel}` : "Posted —"}
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
                                            <DeleteJobDialog job={job} />
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
