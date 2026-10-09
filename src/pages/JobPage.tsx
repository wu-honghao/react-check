import { useEffect, useState } from "react"
import JobList from "../components/JobList"
import JobSearch, { type Search } from "../components/JobSearch"
import { getAPI, type Job } from "../api/jobsApi"
import Loading from "../components/JobLoading"
import Pagination from "../components/Pagination"
import { buildJobQuery } from "../utils"
import type { LoadingStatus } from "../types"

function JobPage(){
    // jobs search
    const [search, setSearch] = useState<Search>({
        keyword: '',
        location: '',
        permitSupported: false
    })

    // jobs get/load
    const [jobList, setJobList] = useState<Job[]>([])
    const [total, setTotal] = useState(0)

    const getJobs = async() => {
        setLoadStatus('loading')

        try{
            const res = await getAPI({
                url: '/jobs?'+ buildJobQuery({
                    ...search,
                    page: pagination, 
                    limit: pageSize,
                    keyword: debounceKeyword
                }),

                headersOption: {
                    isAuthorization: true
                }
            })

            setTotal(res.total)
            setLoadStatus('success')
            setJobList(res.data)
        } catch(e){
            console.log(e)
            setLoadStatus('error')
        }
    }

    // API state
    const [loadStatus, setLoadStatus] = useState<LoadingStatus>('idle')

    // pagination
    const [pagination, setPagination] = useState<number>(1)
    const pageSize = 2
    const totalPage = Math.ceil(total / pageSize)

    const [debounceKeyword, setDebounceKeyword] = useState<string>('')

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setPagination(1)
            setDebounceKeyword(search.keyword)
        }, 500)

        return ()=>{
            clearTimeout(timer)
        }
    },[search.keyword])

    useEffect(()=>{
        getJobs()
    },[debounceKeyword, pagination, search.location, search.permitSupported])

    return <div>
    <JobSearch search={search} setSearch={setSearch} onFilterChange={()=>setPagination(1)} />

    { /* data loading, idle, error */ }
    { loadStatus !== 'success' && <Loading status={loadStatus} retry={getJobs}/> } 
    
    { /* data ready */ }
    { loadStatus === 'success' && (jobList.length !== 0 ? <JobList jobsData={jobList} /> : <p>No matching jobs found.</p>) }

    {/* Pagination */}
    { totalPage > 1 && <Pagination pagination={pagination} setPagination={setPagination} totalPage={totalPage}/> }
  </div>
}

export default JobPage
