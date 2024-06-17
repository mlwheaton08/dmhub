import { useNavigate } from "react-router-dom"
import styles from "./SearchBar.module.css"
import { useState } from "react"

export function SearchBar({ setMonster }) {

    const [searchTerms, setSearchTerms] = useState("")

    const convertRollStringToObj = (string) => {
        // example string 1: 12d20+14
        // example string 2: 12d20
        // example string 3: 12

        // if just a static number (no dice roll), just return null
        const dIndex = string.indexOf("d")
        if (dIndex === -1) return null
        
        // otherwise continue on to parse and make object
        const outputObj = {
            dice_count: null,
            die: null,
            modifier: null
        }

        // iterate through string
        let currentString = ""
        let foundModifier
        for (let i = 0; i < string.length; i++) {
            switch (string[i]) {
                case "d":
                    outputObj.dice_count = parseInt(currentString)
                    currentString = ""
                    break
                case "+":
                    foundModifier = true
                    outputObj.die = parseInt(currentString)
                    currentString = ""
                    break
                default:
                    currentString += string[i]
            }
        }

        // after loop, determine which property the remaining currentString belongs to
        if (foundModifier) outputObj.modifier = parseInt(currentString)
        else outputObj.die = parseInt(currentString)

        return outputObj
    }

    const formatMonsterObj = (m) => {
        // creating a copy. idk if i need this or not
        const monsterObj = m
        // hit points object
        monsterObj.hit_points_roll_obj = convertRollStringToObj(monsterObj.hit_points_roll)
        // actions
        monsterObj.actions.map((a) => {
            if (a.hasOwnProperty('damage')) a.damage.map((d) => {
                d.damage_dice_roll_obj = convertRollStringToObj(d.damage_dice)
            })
        })
        // legendary actions object
        monsterObj.legendary_actions.map((la) => {
            if (la.hasOwnProperty('damage')) la.damage.map((d) => {
                d.damage_dice_roll_obj = convertRollStringToObj(d.damage_dice)
            })
        })
        // challenge rating string (fraction)
        if (monsterObj.challenge_rating < 1 && monsterObj.challenge_rating > 0) monsterObj.challenge_rating_fraction = `1/${1 / monsterObj.challenge_rating}`
        else monsterObj.challenge_rating_fraction = monsterObj.challenge_rating.toString()

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


    return (
        <div className={styles.main}>
            <input
                value={searchTerms}
                onChange={(e) => setSearchTerms(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") getMonster(searchTerms.split(' ').join('-').toLowerCase())
                }}
            />
            <button onClick={() => getMonster(searchTerms.split(' ').join('-').toLowerCase())}>
                Search
            </button>
        </div>
    )
}