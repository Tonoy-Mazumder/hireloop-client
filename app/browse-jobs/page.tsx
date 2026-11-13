import { getJobs } from "@/lib/api/jobs";


const page = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    const serach = await searchParams
    const urlSearchParams = new URLSearchParams(serach as Record<string, string>)
    const query = urlSearchParams.toString()
    const jobs = await getJobs(query)
    console.log(jobs);
    return (
        <div>
            <h1>Browse Jobs</h1>
            <ul>
                {jobs.map((job: any) => (
                    <li key={job._id}>
                        <h2>{job.jobTitle}</h2>
                        <p>{job.responsibilities}</p>
                        <p>{job.companyName}</p>
                        <p>{job.jobCategory}</p>
                        <p>{job.location}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default page;