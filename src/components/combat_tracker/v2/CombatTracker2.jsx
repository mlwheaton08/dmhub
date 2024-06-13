import { useNavigate } from "react-router-dom"
import styles from "./CombatTracker2.module.css"
import { useState } from "react"

export function CombatTracker2() {

    const navigate = useNavigate()

    const [monster, setMonster] = useState("")

    const fetchMonster = async (monster) => {
        const response = await fetch(`https://www.dnd5eapi.co/api/monsters/${monster}`)
        const monsterObj = await response.json()
        console.log(monsterObj)
        return monsterObj
    }


    return (
        <div className={styles.main}>
            <h3
                className="m-4 italic hover:cursor-pointer hover:text-purple-500 transition-all duration-200"
                onClick={() => navigate("/")}
            >
                Home
            </h3>
            Num 2
            <input
                value={monster}
                onChange={(e) => setMonster(e.target.value)}
            />
            <button onClick={() => fetchMonster(monster)}>
                search
            </button>
        </div>
    )
}