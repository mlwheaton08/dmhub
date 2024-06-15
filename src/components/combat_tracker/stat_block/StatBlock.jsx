import styles from "./StatBlock.module.css"
import { exampleMonsterObj } from "../../../utils/constants"
import { useState } from "react"

export function StatBlock({  }) {

    // carefully format the jsx so it's as readable as possible. it's getting cluttered fast lol
    // need to compile a list of properties that need to be parsed out. right now it's only the "1d8+4" shit
    // still need sections for other things (like spells)
    // think of good place to cleanly keep logic that determines whether or not to add a section to the stat block
    // lil note: each spell has a url to this api so i can easily have definitions ready :) i'm sure there are other properties like this too
    
    const monster = exampleMonsterObj

    const [roll, setRoll] = useState({
        showRoll: false,
        bonusDisplay: "",
        rollsDisplay: "",
        finalResult: null
    })

    const displayAbilityScore = (abilityScore) => {
        const modifier = `${abilityScore > 10 ? "+" : ""}${Math.floor((abilityScore - 10) / 2)}`
        return `${abilityScore} (${modifier})` // ex: "14 (+2)"
    }

    const rollDice = (diceCount, die, bonus) => {
        const copy = {...roll}
        
        // roll dice
        const rolls = []
        for (let n = 1; n <= diceCount; n++) {
            rolls.push((Math.floor((Math.random() * die) + 1)))
        }
        
        copy.showRoll = true
        copy.bonusDisplay = `${bonus < 0 ? "-" : "+"} ${Math.abs(bonus)}`
        copy.rollsDisplay = rolls.join(" + ")
        copy.finalResult = rolls.reduce((a, b) => a + b, 0) + bonus
        setRoll(copy)
    }

    const clearRollState = (showRoll) => {
        setRoll({
            showRoll: showRoll,
            bonusDisplay: "",
            rollsDisplay: "",
            finalResult: null
        })
    }


    return <div className={styles.main}>
        {/* Roll */}
        {
            <div className={`${roll.showRoll ? "" : "hidden"} fixed bottom-4 right-4 flex flex-col items-center gap-1 px-6 py-4 rounded bg-black`}>
                {
                    roll.finalResult === null
                        ? <span>Roll results will appear here</span>
                        : <>
                            <div className="border-b">{roll.rollsDisplay} <b>{roll.bonusDisplay}</b></div>
                            <div className="text-4xl font-semibold text-red-500">{roll.finalResult}</div>

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
                <div><b>Armor Class</b> {monster.armor_class[0].value} ({monster.armor_class[0].desc})</div>
                <div><b>Hit Points</b> {monster.hit_points} <button className={styles.button}>({monster.hit_points_roll.die_count}d{monster.hit_points_roll.die} + {monster.hit_points_roll.bonus})</button></div>
                <div><b>Speed</b> {monster.speed.walk}</div>
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
                <div><b>Damage Vulnerabilities</b> Bludgeoning</div>
                <div><b>Damage Immunities</b> Poison</div>
                <div><b>Condition Immunities</b> Exhaustion, Poisoned</div>
                <div><b>Senses</b> Darkvision 60 ft.</div>
                <div><b>Languages</b> Understands all languages it knew in life but can't speak</div>
                <div className="flex gap-8">
                    <div><b>Challenge</b> 1/4 (50 XP)</div>
                    <div><b>Proficiency Bonus</b> +2</div>
                </div>
            </div>
            <div className={styles.divider}>
                <img src="https://media-waterdeep.cursecdn.com/file-attachments/0/579/stat-block-header-bar.svg"></img>
            </div>

            {/* feats, traits */}
            <div className={`${styles.cardSection} ${styles.featsTraits}`}>
                <div><i><b>Keen Smell.</b></i> The cat has advantage on Wisdom (Perception) checks that rely on smell.</div>
            </div>

            {/* actions */}
            <div className={`${styles.cardSection} ${styles.actions}`}>
                <h2>Actions</h2>
                <div><i><b>Shortsword.</b> Melee Weapon Attack:</i> <button className={styles.button}>+4</button> to hit, reach 5 ft., one target. Hit: 5 <button className={styles.button}>(1d6) + 2</button> piercing damage.</div>
                <div><i><b>Shortbow.</b> Ranged Weapon Attack:</i> <button className={styles.button}>+4</button> to hit, range 80/320 ft., one target. Hit: 5 <button className={styles.button}>(1d6) + 2</button> piercing damage.</div>
            </div>

            {/* bonus actions */}
            <div className={`${styles.cardSection} ${styles.actions}`}>
                <h2>Bonus Actions</h2>
                <div><i><b>Shortsword.</b> Melee Weapon Attack:</i> <button className={styles.button}>+4</button> to hit, reach 5 ft., one target. Hit: 5 <button className={styles.button}>(1d6) + 2</button> piercing damage.</div>
                <div><i><b>Shortbow.</b> Ranged Weapon Attack:</i> <button className={styles.button}>+4</button> to hit, range 80/320 ft., one target. Hit: 5 <button className={styles.button}>(1d6) + 2</button> piercing damage.</div>
            </div>

            {/* reactions */}
            <div className={`${styles.cardSection} ${styles.actions}`}>
                <h2>Reactions</h2>
                <div><i><b>Shortsword.</b> Melee Weapon Attack:</i> <button className={styles.button}>+4</button> to hit, reach 5 ft., one target. Hit: 5 <button className={styles.button}>(1d6) + 2</button> piercing damage.</div>
                <div><i><b>Shortbow.</b> Ranged Weapon Attack:</i> <button className={styles.button}>+4</button> to hit, range 80/320 ft., one target. Hit: 5 <button className={styles.button}>(1d6) + 2</button> piercing damage.</div>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bar}></div>
    </div>
}