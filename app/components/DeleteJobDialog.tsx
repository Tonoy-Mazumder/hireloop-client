
'use client'
import { Trash2Icon } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { JobPost } from "../dashboard/recruiter/jobs/page"
import { deleteJob } from "@/lib/actions/jobs"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "@/components/ui/toast"


export function DeleteJobDialog({ job }: { job: JobPost }) {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        const res = await deleteJob(job._id)
        if (res.deletedCount > 0) {
            toast.add({
                title: "Job deleted",
                description: "The job posting has been successfully deleted.",
            })
            router.refresh()
            setIsOpen(false)
        }
        console.log('job id ', job._id, res)
    }
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger
                render={<Button variant="destructive" >
                    <Trash2Icon />
                </Button>}
            />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete job?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete the job posting for "{job.jobTitle}". View{" "}
                        <a href="#">Settings</a> to delete any memories saved during this chat.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
