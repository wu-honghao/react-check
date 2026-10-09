import type { LoadingStatus } from "../types"

type LoadingProps = {
    status: LoadingStatus
    retry: () => void
}

function Loading({status, retry}: LoadingProps){
    return <div>
        { status === 'idle' && <p>No data</p> }
        { status === 'loading' && <p>Loading jobs...</p> }
        { status === 'error' && <div>
            <p>Failed to load jobs.</p>
            <button onClick={retry}>Retry</button>
        </div> }
    </div>
}

export default Loading