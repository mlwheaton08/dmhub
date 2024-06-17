import { useNavigate } from "react-router-dom"
import styles from "./CombatTracker2.module.css"
import { useEffect, useState } from "react"
import { StatBlock } from "../stat_block/StatBlock"
import { SearchBar } from "../search/SearchBar"

export function CombatTracker2() {

    const navigate = useNavigate()

    const [search, setSearch] = useState("")
    const [monster, setMonster] = useState({})

    function isEmpty(obj) {
        for (const prop in obj) {
            if (Object.hasOwn(obj, prop)) {
                return false
            }
        }
      
        return true
    }


    return (
        <div className={styles.main}>
            <h3
                className="m-4 italic hover:cursor-pointer hover:text-purple-500 transition-all duration-200"
                onClick={() => navigate("/")}
            >
                Home
            </h3>

            <SearchBar
                setMonster={setMonster}
            />

            {
                isEmpty(monster)
                    ? ""
                    : <StatBlock monster={monster} />
            }
        </div>
    )
}