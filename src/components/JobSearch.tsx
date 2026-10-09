export type Search = {
    keyword: string
    location: string
    permitSupported: boolean
}

type JobSearchProps = { 
    search: Search,
    setSearch: React.Dispatch<React.SetStateAction<Search>>
    onFilterChange: () => void
}

function JobSearch({ search, setSearch, onFilterChange }: JobSearchProps){
    const handleKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch((prev)=>({
            ...prev,
            keyword: event.target.value
        }))
    }

    const handleLocation = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSearch((prev)=>({
            ...prev,
            location: event.target.value
        }))
        onFilterChange()
    }

    const handleIsPermit = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch((prev)=>({
            ...prev,
            permitSupported: event.target.checked
        }))
        onFilterChange()
    }

    return <div>
        <p><label htmlFor="keyword">Keyword：</label><input id="keyword" name="keyword" value={search.keyword} onChange={handleKeyword}/></p>
        <p>
            <label htmlFor="location">location：</label> 
            <select id="location" name="location" value={search.location} onChange={handleLocation}>
                <option value="Dublin">Dublin</option>
                <option value="Cork">Cork</option>
                <option value="Galway">Galway</option>
                <option value="">All locations</option>
            </select>
        </p>
        <p>
            <label htmlFor="permitSupported">Permit supported only：</label> 
            <input id="permitSupported" type="checkbox" name="permitSupported" checked={search.permitSupported} onChange={handleIsPermit}/> 
        </p>
    </div>
}

export default JobSearch