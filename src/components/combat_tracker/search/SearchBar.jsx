import styles from "./SearchBar.module.css"
import { useState } from "react"
import useDebounce from "../../../customHooks/useDebounce"
import { fetchSomething, searchMonsters } from "../../../utils/apiMethods"
import { formatMonsterObj } from "../../../utils/constants"

export function SearchBar({ setMonster }) {

    const [searchTerms, setSearchTerms] = useState("")
    const [topSearchResults, setTopSearchResults] = useState([])
    const [searchDropdown, setSearchDropdown] = useState(false)

    const getTopFiveSearchResults = async () => {
        if (searchTerms) {
            const response = await searchMonsters(searchTerms)
            setTopSearchResults(response)
            setSearchDropdown(true)
        } else {
            setSearchDropdown(false)
        }
    }
    
    document.body.addEventListener("click", (event) => {
        const searchBar = document.getElementById("combat-search-bar")
        
        const clickedElement = event.target
        const isClickInsideSearchBar = searchBar.contains(clickedElement) || clickedElement.id === "combat-search-bar"
        
        if (!isClickInsideSearchBar || !searchTerms) setSearchDropdown(false)
            else setSearchDropdown(true)
    })

    const clearSearchState = () => {
        setSearchTerms("")
        setTopSearchResults([])
        setSearchDropdown(false)
    }
    
    const getMonster = async (monster) => {
        const monsterObj = await fetchSomething(monster)
        setMonster(formatMonsterObj(monsterObj))
        clearSearchState()
    }

    useDebounce(() => getTopFiveSearchResults(), 400, [searchTerms])
    

    return (
        <div id="combat-search-bar" className={styles.main}>
            {/* searchbar */}
            <input
                className="w-full"
                value={searchTerms}
                onChange={(e) => setSearchTerms(e.target.value)}
            />

            {/* Dropdown */}
            {
                searchDropdown
                ? <div className="absolute w-full bg-gray-800">
                    {
                        topSearchResults.length > 0
                        ? topSearchResults.map((r, index) => {
                            return <>
                                <div
                                    key={`monster-search-result-${index}`}
                                    className="px-2 py-1 hover:cursor-pointer hover:bg-gray-200 hover:text-black transition-all duration-150"
                                    onClick={() => getMonster(r.url)}
                                >
                                    {r.name}
                                </div>
                            </>
                        })
                        : <div className="px-2 py-1">No results</div>
                    }
                </div>
                : ""
            }
        </div>
    )
}