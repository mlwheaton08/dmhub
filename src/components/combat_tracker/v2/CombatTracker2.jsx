import { useNavigate } from "react-router-dom"
import styles from "./CombatTracker2.module.css"
import { useEffect, useState } from "react"
import { StatBlock } from "../stat_block/StatBlock"

export function CombatTracker2() {

    const navigate = useNavigate()

    const [search, setSearch] = useState("")
    const [monster, setMonster] = useState({})

    const convertRollStringToObj = (string) => {
        // example string 1: 12d20+14
        // example string 2: 12d20
        // example string 3: 12

        // if just a static number (no dice roll), just return null
        const dIndex = string.indexOf("d")
        if (dIndex === -1) return null
        
        // otherwise continue on to parse and make object
        const outputObj = {
            die_count: null,
            die: null,
            bonus: null
        }

        // iterate through string
        let currentString = ""
        let foundBonus
        for (let i = 0; i < string.length; i++) {
            switch (string[i]) {
                case "d":
                    outputObj.die_count = parseInt(currentString)
                    currentString = ""
                    break
                case "+":
                    foundBonus = true
                    outputObj.die = parseInt(currentString)
                    currentString = ""
                    break
                default:
                    currentString += string[i]
            }
        }

        // after loop, determine which property the remaining currentString belongs to
        if (foundBonus) outputObj.bonus = parseInt(currentString)
        else outputObj.die = parseInt(currentString)

        return outputObj
    }

    const formatMonsterObj = (m) => {
        // creating a copy. idk if i need this or not
        const monsterObj = m
        // hit points
        monsterObj.hit_points_roll_obj = convertRollStringToObj(monsterObj.hit_points_roll)
        // actions
        monsterObj.actions.map((a) => {
            if (a.hasOwnProperty('damage')) a.damage.map((d) => {
                d.damage_dice_roll_obj = convertRollStringToObj(d.damage_dice)
            })
        })
        // legendary actions
        monsterObj.legendary_actions.map((la) => {
            if (la.hasOwnProperty('damage')) la.damage.map((d) => {
                d.damage_dice_roll_obj = convertRollStringToObj(d.damage_dice)
            })
        })

        return monsterObj
    }
    
    const fetchMonster = async (monster) => {
        const response = await fetch(`https://www.dnd5eapi.co/api/monsters/${monster}`)
        const monsterObj = await response.json()
        console.log(monsterObj)
        return monsterObj
    }

    const getMonster = async (monster) => {
        const monsterObj = await fetchMonster(monster)
        setMonster(formatMonsterObj(monsterObj))
    }

    function isEmpty(obj) {
        for (const prop in obj) {
            if (Object.hasOwn(obj, prop)) {
                return false
            }
        }
      
        return true
    }

    // useEffect(() => {
    //     convertRollStringToObj("12")
    // },[])


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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={() => getMonster(search)}>
                search
            </button>

            {
                isEmpty(monster)
                    ? ""
                    : <StatBlock monster={monster} />
            }
        </div>
    )
}