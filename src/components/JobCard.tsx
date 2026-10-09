import { useDispatch, useSelector } from "react-redux"
import type { Job } from "../api/jobsApi"
import { removeJob, saveJob } from "../features/savedJobs/savedJobsSlice"
import type { RootState } from "../store/store"
import { Link } from "react-router"

type JobCardProps = {
    job: Job
}

function JobCard({ job }: JobCardProps){
    const dipatch = useDispatch()
    const savedJobs = useSelector((state: RootState)=> state.savedJobs.ids)

    return <div key={job._id}>
        <h3> { job.title } </h3>
        <p> { job.company } · { job.location } · { job.salary } </p>
        <p> Permit: { job.permitSupported ? 'Supported' : 'No Supported'}</p>
        <p>
            <Link to={`/jobs/${job._id}`} style={{ marginRight: '5px' }}>
                View Details
            </Link>

            { savedJobs.findIndex((id)=> id === job._id) === -1 ? <button onClick={()=> dipatch(saveJob(job._id))}>Save</button> : <button onClick={()=> dipatch(removeJob(job._id))}>Remove</button>  }
        </p>
    </div>
}

export default JobCard