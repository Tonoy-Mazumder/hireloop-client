"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { ArrowRight, Building2, CalendarIcon, MapPin } from "lucide-react"
import { createJob } from "@/lib/actions/jobs"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"]

const jobCategories = [
  "Engineering & Tech",
  "Design",
  "Marketing",
  "Sales",
  "Product",
  "Other",
]

const salaryFrequencies = ["per hour", "per day", "per month", "per year"]

const jobStatuses = ["Active", "Reviewing", "Closed"]

export type JobForm = {
  jobTitle: string
  companyName: string
  jobCategory: string
  jobType: string
  isRemote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  salaryFrequency: string
  responsibilities: string
  qualifications: string
  status: "Active" | "Reviewing" | "Closed"
  applicants: number
}

const initialJobForm: JobForm = {
  jobTitle: "",
  companyName: "",
  jobCategory: "",
  jobType: "Full-time",
  isRemote: false,
  location: "",
  deadline: "",
  minSalary: "",
  maxSalary: "",
  salaryFrequency: "",
  responsibilities: "",
  qualifications: "",
  status: "Active",
  applicants: 0,
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label className="justify-between">
        <span>
          {label}
          {hint && <span className="text-muted-foreground"> {hint}</span>}
          {required && <span className="text-destructive"> *</span>}
        </span>
      </Label>
      {children}
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 text-sm font-semibold">
      <span className="size-1.5 rounded-full bg-primary" />
      {children}
    </h2>
  )
}

function NewJobsPage() {
  const router = useRouter()
  const [form, setForm] = useState<JobForm>(initialJobForm)

  const setField = (field: keyof JobForm, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      console.log("job payload", form)

      const result = await createJob(form)

      toast.add({
        title: "Job created",
        description: "The job posting has been successfully created.",
      })
      router.push("/dashboard/recruiter/jobs")
      setForm(initialJobForm)
    } catch (error) {
      toast.add({
        title: "Error creating job",
        description: "An error occurred while creating the job posting.",
      })

    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            Manage Jobs <span className="mx-1">›</span> Create New Listing
          </p>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Post a New Job</h1>
              <p className="text-sm text-muted-foreground">
                Fill in the position specifications to attract qualified talent
                across our network.
              </p>
            </div>
          </div>
        </div>

        <section className="space-y-5 rounded-xl border p-6">
          <SectionHeading>1. Basic Information</SectionHeading>

          <Field label="Job Title" required>
            <Input
              placeholder="Frontend Developer"
              value={form.jobTitle}
              onChange={(e) => setField("jobTitle", e.target.value)}
            />
          </Field>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Company Name" required>
              <div className="relative">
                <Building2 className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-8"
                  placeholder="HirePulse Network"
                  value={form.companyName}
                  onChange={(e) => setField("companyName", e.target.value)}
                />
              </div>
            </Field>

            <Field label="Job Category" required>
              <Select
                items={jobCategories.map((category) => ({
                  value: category,
                  label: category,
                }))}
                value={form.jobCategory}
                onValueChange={(value) =>
                  setField("jobCategory", value as string)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {jobCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <Field label="Job Type" required>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {jobTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setField("jobType", type)}
                  className={cn(
                    "h-9 rounded-lg border text-sm transition-colors",
                    form.jobType === type
                      ? "border-primary/50 bg-primary/10 font-medium text-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </Field>
        </section>

        <section className="space-y-5 rounded-xl border p-6">
          <SectionHeading>
            2. Location, Compensation &amp; Timeline
          </SectionHeading>

          <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">
                Remote Work Allowed (isRemote)
              </p>
              <p className="text-xs text-muted-foreground">
                Enable worldwide or distributed candidate applications.
              </p>
            </div>
            <Switch
              checked={form.isRemote}
              onCheckedChange={(checked) => setField("isRemote", checked)}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Job Location" hint="(location)" required>
              <div className="relative">
                <MapPin className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-8"
                  placeholder="New York, USA"
                  value={form.location}
                  onChange={(e) => setField("location", e.target.value)}
                />
              </div>
            </Field>

            <Field label="Application Deadline" hint="(deadline)">
              <div className="relative">
                <CalendarIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="date"
                  className="pl-8"
                  value={form.deadline}
                  onChange={(e) => setField("deadline", e.target.value)}
                />
              </div>
            </Field>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <Field label="Min Salary / Rate">
              <div className="relative">
                <span className="absolute top-1/2 left-2.5 -translate-y-1/2 text-sm text-muted-foreground">
                  €
                </span>
                <Input
                  type="number"
                  min={0}
                  className="pl-7"
                  placeholder="25"
                  value={form.minSalary}
                  onChange={(e) => setField("minSalary", e.target.value)}
                />
              </div>
            </Field>

            <Field label="Max Salary / Rate">
              <div className="relative">
                <span className="absolute top-1/2 left-2.5 -translate-y-1/2 text-sm text-muted-foreground">
                  €
                </span>
                <Input
                  type="number"
                  min={0}
                  className="pl-7"
                  placeholder="40"
                  value={form.maxSalary}
                  onChange={(e) => setField("maxSalary", e.target.value)}
                />
              </div>
            </Field>

            <Field label="Frequency">
              <Select
                items={salaryFrequencies.map((frequency) => ({
                  value: frequency,
                  label: frequency,
                }))}
                value={form.salaryFrequency}
                onValueChange={(value) =>
                  setField("salaryFrequency", value as string)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="per hour" />
                </SelectTrigger>
                <SelectContent>
                  {salaryFrequencies.map((frequency) => (
                    <SelectItem key={frequency} value={frequency}>
                      {frequency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Status">
              <Select
                items={jobStatuses.map((status) => ({
                  value: status,
                  label: status,
                }))}
                value={form.status}
                onValueChange={(value) =>
                  setField("status", value as JobForm["status"])
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Active" />
                </SelectTrigger>
                <SelectContent>
                  {jobStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
        </section>

        <section className="space-y-5 rounded-xl border p-6">
          <SectionHeading>
            3. Responsibilities &amp; Requirements
          </SectionHeading>

          <Field label="Key Responsibilities" required>
            <Textarea
              rows={4}
              placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences..."
              value={form.responsibilities}
              onChange={(e) => setField("responsibilities", e.target.value)}
            />
          </Field>

          <Field label="Qualifications & Requirements" required>
            <Textarea
              rows={4}
              placeholder="List the qualifications and requirements for this role..."
              value={form.qualifications}
              onChange={(e) => setField("qualifications", e.target.value)}
            />
          </Field>
        </section>
        <section className="space-y-5 rounded-xl border p-6">
          <Button type="submit">
            Publish Job
            <ArrowRight data-icon="inline-end" />
          </Button>
        </section>
      </form>
    </div>
  )
}

export default NewJobsPage
