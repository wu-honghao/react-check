import type { Job } from "../api/jobsApi"
import JobCard from "./JobCard"

type JobListProps = {
    jobsData: Job[]
}

function JobList({ jobsData }: JobListProps){
    return jobsData.map((job)=>{
        return <JobCard key={job._id} job={job}></JobCard>
    })
}

export default JobList