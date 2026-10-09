type PaginationProps = {
    pagination: number,
    setPagination: (currPage: number) => void
    totalPage: number
}

function Pagination({pagination, setPagination, totalPage}: PaginationProps){
    const toPrevPage = () => {
        setPagination(pagination - 1)
    }
    const toNextPage = () => {
        setPagination(pagination + 1)
    }

    const totalsList = () => {
        const paginationNumber = []
        for(let i = 1; i <= totalPage; i++){
            paginationNumber.push(i)
        }

        return paginationNumber.map((page)=>{
            return <span key={page} style={{ 
                marginRight: '10px', 
                marginLeft: page === 1 ? '10px': '0px', 
                cursor: "pointer",
                textDecoration: page === pagination ? "underline" : '',
            }} onClick={()=>setPagination(page)}>{ page }</span>
        })
    }

    return <div>
        <button onClick={toPrevPage} disabled={pagination===1}>{`<`}</button>
        { totalsList() }
        <button onClick={toNextPage} disabled={pagination===totalPage}>{`>`}</button>
    </div>
}

export default Pagination