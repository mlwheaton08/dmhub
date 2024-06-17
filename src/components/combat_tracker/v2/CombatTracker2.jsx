import { useNavigate } from "react-router-dom"
import styles from "./CombatTracker2.module.css"
import { useState } from "react"
import { StatBlock } from "../stat_block/StatBlock"
import { SearchBar } from "../search/SearchBar"
import { RollPopup } from "../roll_popup/RollPopup"

export function CombatTracker2() {

    const navigate = useNavigate()

    const [monster, setMonster] = useState({})
    const [roll, setRoll] = useState({
        showRoll: false,
        rollType: "",
        diceCount: null,
        die: null,
        modifier: null,
        rolls: [],
        finalResult: null,
        styleCrit: false
    })

    const rollDice = (rollType, diceCount, die, modifier, styleCrit = false) => {
        // make it disappear for a split sec, then reappear with results
        setRoll({
            showRoll: false,
            diceCount: roll.diceCount,
            die: roll.die,
            modifier: roll.modifier,
            rolls: roll.rolls,
            finalResult: roll.finalResult,
            styleCrit: roll.styleCrit
        })

        const copy = {...roll}
        
        // roll dice
        const rolls = []
        for (let n = 1; n <= diceCount; n++) {
            rolls.push((Math.floor((Math.random() * die) + 1)))
        }
        
        copy.showRoll = true
        copy.rollType = rollType
        copy.diceCount = diceCount
        copy.die = die
        // copy.modifier = `${modifier < 0 ? "-" : "+"} ${Math.abs(modifier)}`
        copy.modifier = modifier
        // copy.rolls = rolls.join(" + ")
        copy.rolls = rolls
        copy.finalResult = rolls.reduce((a, b) => a + b, 0) + modifier
        copy.styleCrit = styleCrit

        setTimeout(() => setRoll(copy), 300)
    }

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
            <button onClick={() => setRoll({
                    showRoll: !roll.showRoll,
                    diceCount: roll.diceCount,
                    die: roll.die,
                    modifier: roll.modifier,
                    rolls: roll.rolls,
                    finalResult: roll.finalResult,
                    styleCrit: roll.styleCrit
                })}
            >
                    showRoll
            </button>

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
                    : <StatBlock
                        monster={monster}
                        rollDice={rollDice}
                    />
            }

            <RollPopup
                roll={roll}
                setRoll={setRoll}
            />
        </div>
    )
}