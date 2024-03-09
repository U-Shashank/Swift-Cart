import { createContext, useContext, useEffect, useState } from "react";

const SearchContext = createContext()

const SearchProvider = ({children}) => {
    const [search, setSearch] = useState("")

    return (
        <SearchContext.Provider value={[search, setSearch]}>
            {children}
        </SearchContext.Provider>
    )
}

const useSearch = () => useContext(SearchContext)

export {useSearch, SearchProvider}