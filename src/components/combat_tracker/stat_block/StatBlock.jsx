import styles from "./StatBlock.module.css"
import { exampleMonsterObj } from "../../../utils/constants"
import { useState } from "react"

export function StatBlock({ monster }) {

    // --- actions ---
        // loop
            // if action has attack bonus and damage (note: i think the other option is damage with no attack bonus)
                // if action has no attack bonus, does have damage
                    // <span>first part of action.description</span>
                    // <button>attack bonus</button>
                    // <span>middle part of action.description</span>
                // else
                    // <span>first part of action.description</span> (split string up to damage)
                // <button>damage</button>
                // <span>last part of action.description</span>
            // else
                // <span>action.description</span>
    // urls that show content when clicked (in a sidebar?)
        // when the api is hit (clicked the word with url link), may want to add that content to another variable (so that it doesn't have to hit api every single time it's clicked. basically loads it up once and keeps it)

    const [roll, setRoll] = useState({
        showRoll: false,
        diceCount: null,
        die: null,
        modifier: null,
        rolls: [],
        finalResult: null,
        styleCrit: false
    })

    const displayAbilityScore = (abilityScore) => {
        const modifier = `${abilityScore > 10 ? "+" : ""}${Math.floor((abilityScore - 10) / 2)}`
        return `${abilityScore} (${modifier})` // ex: "14 (+2)"
    }

    const rollDice = (diceCount, die, modifier, styleCrit = true) => {
        const copy = {...roll}
        
        // roll dice
        const rolls = []
        for (let n = 1; n <= diceCount; n++) {
            rolls.push((Math.floor((Math.random() * die) + 1)))
        }
        
        copy.showRoll = true
        copy.diceCount = diceCount
        copy.die = die
        // copy.modifier = `${modifier < 0 ? "-" : "+"} ${Math.abs(modifier)}`
        copy.modifier = modifier
        // copy.rolls = rolls.join(" + ")
        copy.rolls = rolls
        copy.finalResult = rolls.reduce((a, b) => a + b, 0) + modifier
        copy.styleCrit = styleCrit
        setRoll(copy)
    }

    const clearRollState = (showRoll) => {
        setRoll({
            showRoll: showRoll,
            modifier: "",
            rolls: "",
            finalResult: null
        })
    }

    const fetchInfoTest = async (apiUrl) => {
        const response = await fetch(`https://www.dnd5eapi.co${apiUrl}`)
        const responseObj = await response.json()
        // responseObj.desc is an array, so check what all may be in there. air elemental is a good test monster
        console.log(responseObj.desc)
    }


    return <div className={styles.main}>
        {/* Roll .. this needs to be own component */}
        {
            <div className={`${roll.showRoll ? "" : "hidden"} fixed bottom-4 right-4 flex flex-col items-center gap-1 px-6 py-4 rounded bg-black`}>
                {
                    roll.finalResult === null
                        ? <span>Roll results will appear here</span>
                        : <>
                            <div className="border-b">
                                <span>
                                    {
                                        roll.rolls.map((r, index) => {
                                            return <span key={`stat_block_roll-${index}`}>
                                                {
                                                    roll.styleCrit
                                                    ? <span className={`${r === 1 ? "text-red-500" : ""} ${r === roll.die ? "text-green-500" : ""}`}>{r}</span>
                                                    : <span>{r}</span>
                                                }
                                                <span>

                                                </span>
                                                <span>{index < roll.rolls.length - 1 ? " + " : ""}</span>
                                            </span>
                                        })
                                    }
                                </span>
                                {
                                    roll.modifier === null
                                    ? ""
                                    : <span><b> {roll.modifier < 0 ? "-" : "+"} {Math.abs(roll.modifier)}</b></span>
                                }
                            </div>
                            <div className="text-4xl font-semibold">{roll.finalResult}</div>

                            {/* - */}
                            {/* <svg
                                className="absolute top-1/2 -translate-y-1/2 -left-2 w-4 h-4 bg-black fill-white border border-white rounded-full hover:cursor-pointer hover:fill-yellow-500 hover:border-yellow-500 transition-all duratin-200"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                                onClick={() => clearRollState(true)}
                            >
                                <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                            </svg> */}
                        </>
                }

                {/* x */}
                <svg
                    className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 w-4 h-4 bg-black fill-white border border-white rounded-full hover:cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    onClick={() => clearRollState(false)}
                >
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                </svg>
            </div>
        }

        {/* Top bar */}
        <div className={styles.bar}></div>

        <div className={styles.card}>
            {/* header */}
            <div className={`${styles.cardSection} ${styles.header}`}>
                <h1>{monster.name}</h1>
                <h2><i>{monster.size} {monster.type}, {monster.alignment}</i></h2>
            </div>
            <div className={styles.divider}>
                <img src="https://media-waterdeep.cursecdn.com/file-attachments/0/579/stat-block-header-bar.svg"></img>
            </div>

            {/* ac, hp, speed (base stats) */}
            <div className={`${styles.cardSection} ${styles.baseStats}`}>
                <div><b>Armor Class</b> {monster.armor_class[0].value} ({monster.armor_class[0].desc ? monster.armor_class[0].desc : monster.armor_class[0].type})</div>
                <div>
                    <span><b>Hit Points</b> {monster.hit_points} </span>
                    <button
                        className={styles.button}
                        onClick={() => rollDice(monster.hit_points_roll_obj.dice_count, monster.hit_points_roll_obj.die, monster.hit_points_roll_obj.modifier)}
                    >
                        ({monster.hit_points_roll})
                    </button>
                </div>
                <div>
                    <span><b>Speed</b> </span>
                    <span>
                        {
                            Object.keys(monster.speed).map((key, index) => {
                                return <span key={`stat_block_sense-${index}`}>
                                    {`${key !== "walk" ? key.charAt(0).toUpperCase() + key.slice(1) : ""} ${monster.speed[key]}`}
                                    {index < Object.keys(monster.speed).length - 1 ? " | " : ""}
                                </span>
                            })
                        }
                    </span>
                </div>
            </div>
            <div className={styles.divider}>
                <img src="https://media-waterdeep.cursecdn.com/file-attachments/0/579/stat-block-header-bar.svg"></img>
            </div>

            {/* abilities */}
            <div className={`${styles.cardSection} ${styles.abilities}`}>
                <div>
                    <div><b>STR</b></div>
                    <div>
                        <button
                            className={styles.button}
                            onClick={() => rollDice(1, 20, Math.floor((monster.strength - 10) / 2))}
                        >
                            {displayAbilityScore(monster.strength)}
                        </button>
                    </div>
                </div>
                <div>
                    <div><b>DEX</b></div>
                    <div>
                    <button
                            className={styles.button}
                            onClick={() => rollDice(1, 20, Math.floor((monster.dexterity - 10) / 2))}
                        >
                            {displayAbilityScore(monster.dexterity)}
                        </button>
                    </div>
                </div>
                <div>
                    <div><b>CON</b></div>
                    <div>
                    <button
                            className={styles.button}
                            onClick={() => rollDice(1, 20, Math.floor((monster.constitution - 10) / 2))}
                        >
                            {displayAbilityScore(monster.constitution)}
                        </button>
                    </div>
                </div>
                <div>
                    <div><b>INT</b></div>
                    <div>
                    <button
                            className={styles.button}
                            onClick={() => rollDice(1, 20, Math.floor((monster.intelligence - 10) / 2))}
                        >
                            {displayAbilityScore(monster.intelligence)}
                        </button>
                    </div>
                </div>
                <div>
                    <div><b>WIS</b></div>
                    <div>
                    <button
                            className={styles.button}
                            onClick={() => rollDice(1, 20, Math.floor((monster.wisdom - 10) / 2))}
                        >
                            {displayAbilityScore(monster.wisdom)}
                        </button>
                    </div>
                </div>
                <div>
                    <div><b>CHA</b></div>
                    <div>
                    <button
                            className={styles.button}
                            onClick={() => rollDice(1, 20, Math.floor((monster.charisma - 10) / 2))}
                        >
                            {displayAbilityScore(monster.charisma)}
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.divider}>
                <img src="https://media-waterdeep.cursecdn.com/file-attachments/0/579/stat-block-header-bar.svg"></img>
            </div>

            {/* skills, proficiencies, etc. */}
            <div className={`${styles.cardSection} ${styles.skillsProficiencies}`}>
                {
                    monster.damage_vulnerabilities.length > 0
                        ? <div>
                            <span><b>Damage Vulnerabilities</b> </span>
                            {
                                monster.damage_vulnerabilities.map((dv, index) => {
                                    return <span key={`stat_block_damage_immunity-${index}`}>
                                        {dv.charAt(0).toUpperCase() + dv.slice(1)}
                                        {index < monster.damage_vulnerabilities.length - 1 ? " | " : ""}
                                    </span>
                                })
                            }
                        </div>
                        : ""
                }
                {
                    monster.damage_immunities.length > 0
                        ? <div>
                            <span><b>Damage Immunities</b> </span>
                            {
                                monster.damage_immunities.map((di, index) => {
                                    return <span key={`stat_block_damage_immunity-${index}`}>
                                        {di.charAt(0).toUpperCase() + di.slice(1)}
                                        {index < monster.damage_immunities.length - 1 ? " | " : ""}
                                    </span>
                                })
                            }
                        </div>
                        : ""
                }
                {
                    monster.damage_resistances.length > 0
                        ? <div>
                            <span><b>Damage Resistances</b> </span>
                            {
                                monster.damage_resistances.map((di, index) => {
                                    return <span key={`stat_block_damage_resistance-${index}`}>
                                        {di.charAt(0).toUpperCase() + di.slice(1)}
                                        {index < monster.damage_resistances.length - 1 ? " | " : ""}
                                    </span>
                                })
                            }
                        </div>
                        : ""
                }
                {
                    monster.condition_immunities.length > 0
                        ? <div>
                            <span><b>Condition Immunities</b> </span>
                            {
                                monster.condition_immunities.map((ci, index) => {
                                    return <span
                                        key={`stat_block_condition_immunity-${index}`}
                                        onClick={() => fetchInfoTest(ci.url)}
                                    >
                                        {ci.name.charAt(0).toUpperCase() + ci.name.slice(1)}
                                        {index < monster.condition_immunities.length - 1 ? " | " : ""}
                                    </span>
                                })
                            }
                        </div>
                        : ""
                }
                {
                    Object.keys(monster.senses).length > 0
                        ? <div>
                            <span><b>Senses</b> </span>
                            {
                                Object.keys(monster.senses).map((key, index) => {
                                    return <span key={`stat_block_sense-${index}`}>
                                        {/* the below code gets ride of "_", capitalizes each word, then adds a space in between */}
                                        {`${key.split("_").map((k) => k.charAt(0).toUpperCase() + k.slice(1)).join(" ")} ${monster.senses[key]}`}
                                        {index < Object.keys(monster.senses).length - 1 ? " | " : ""}
                                    </span>
                                })
                            }
                        </div>
                        : ""
                }
                <div><b>Languages</b> {monster.languages.charAt(0).toUpperCase() + monster.languages.slice(1)}</div>
                <div className="flex gap-8">
                    <div><b>Challenge</b> {`${monster.challenge_rating_fraction} (${monster.xp} XP)`}</div>
                    <div><b>Proficiency Bonus</b> +{monster.proficiency_bonus}</div>
                </div>
            </div>

            {
                monster.special_abilities.length > 0
                ? <div className={styles.divider}>
                    <img src="https://media-waterdeep.cursecdn.com/file-attachments/0/579/stat-block-header-bar.svg"></img>
                </div>
                : ""
            }

            {/* special abilities */}
            {
                monster.special_abilities.length > 0
                ? <div className={`${styles.cardSection} ${styles.specialAbilities}`}>
                    {
                        monster.special_abilities.map((sa, index) => {
                            return <div
                                key={`stat_block_special_ability-${index}`}
                                className="my-2"
                            >
                                <span><i><b>{sa.name}.</b></i> </span>
                                <span>{sa.desc}</span>
                            </div>
                        })
                    }
                </div>
                : ""
            }

            {/* actions */}
            {
                monster.actions.length > 0
                ? <div className={`${styles.cardSection} ${styles.actions}`}>
                    <h2>Actions</h2>
                    {
                        monster.actions.map((a, index) => {
                            return <div
                                key={`stat_block_action-${index}`}
                                className="my-2"
                            >
                                <span><i><b>{a.name}.</b></i> </span>
                                <span>
                                    {
                                        a.desc_obj.preBonus === ""
                                        ? ""
                                        : <span>
                                            <span>{a.desc_obj.preBonus}</span>
                                            <button
                                                className={styles.button}
                                                onClick={() => rollDice(1, 20, a.attack_bonus)}
                                            >
                                                {a.attack_bonus < 0 ? "-" : "+"}{a.attack_bonus}
                                            </button>
                                        </span>
                                    }
                                    {
                                        a.desc_obj.preDamage.map((pd, i) => {
                                            if (pd !== "") return <span key={`stat_block_action_desc_obj_preDamage-${i}`}>
                                                <span>{a.desc_obj.preDamage}</span>
                                                <button
                                                    className={styles.button}
                                                    onClick={() => rollDice(a.damage[i].damage_dice_roll_obj.dice_count, a.damage[i].damage_dice_roll_obj.die, a.damage[i].damage_dice_roll_obj.modifier)}
                                                >
                                                    ({a.damage[i].damage_dice})
                                                </button>
                                            </span>
                                        })
                                    }
                                    <span>{a.desc_obj.remainder}</span>
                                </span>
                            </div>
                        })
                    }
                </div>
                : ""
            }

            {/* legendary actions */}
            {
                monster.legendary_actions.length > 0
                ? <div className={`${styles.cardSection} ${styles.actions}`}>
                    <h2>Legendary Actions</h2>
                    {
                        monster.legendary_actions.map((la, index) => {
                            return <div
                                key={`stat_block_legendary_action-${index}`}
                                className="my-2"
                            >
                                <span><i><b>{la.name}.</b></i> </span>
                                <span>{la.desc}</span>
                            </div>
                        })
                    }
                </div>
                : ""
            }
        </div>

        {/* Bottom Bar */}
        <div className={styles.bar}></div>
    </div>
}