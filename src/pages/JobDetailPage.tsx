import { Link, useParams } from "react-router"
import { getAPI, type Job } from "../api/jobsApi"
import { useEffect, useState } from "react"
import type { LoadingStatus } from "../types"
import Loading from "../components/JobLoading"

function JobDetailPage(){
    const params = useParams()

    const [currJob, setCurrJob] = useState<Job | null>(null)
    const [loading, setLoading] = useState<LoadingStatus>('idle')

    const getJobByid = async () => {
        setLoading('loading')

        try{
            const res = await getAPI({
                url: "/jobs/" + params.id,
                headersOption: {
                    isAuthorization: true
                }
            })

            setCurrJob(res.data)
            setLoading('success')
        }catch(e){
            console.log(e)

            setLoading('error')
        }
    }

    useEffect(()=>{
        getJobByid()
    },[])

    if(currJob === null){
        return <div>
            <h2>Job Detail</h2>
            
            { loading === 'success' && <p>No data</p> }

            { loading !== 'success' && <Loading status={loading} retry={getJobByid} /> }
        </div>
    }

    return <div>
        <h2>Job Detail</h2>
        <p>Title: {currJob.title}</p>
        <p>Company: {currJob.company}</p>
        <p>Location: {currJob.location}</p>
        <p>Salary: €{currJob.salary}</p>
        <p>Permit: { currJob.permitSupported ? 'Supported' : 'No Supported'}</p>
        <p>Skills: { currJob.skills.join(', ') }</p>
        <Link to="/">Back to Jobs</Link>
    </div>
}

export default JobDetailPage