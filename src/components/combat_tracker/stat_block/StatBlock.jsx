import styles from "./StatBlock.module.css"
import { exampleMonsterObj } from "../../../utils/constants"
import { useState } from "react"

export function StatBlock({ monster, rollDice }) {

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

    const displayAbilityScore = (abilityScore) => {
        const modifier = `${abilityScore > 10 ? "+" : ""}${Math.floor((abilityScore - 10) / 2)}`
        return `${abilityScore} (${modifier})` // ex: "14 (+2)"
    }

    const fetchInfoTest = async (apiUrl) => {
        const response = await fetch(`https://www.dnd5eapi.co${apiUrl}`)
        const responseObj = await response.json()
        // responseObj.desc is an array, so check what all may be in there. air elemental is a good test monster
        console.log(responseObj.desc)
    }


    return <div className={styles.main}>
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
                            onClick={() => rollDice(1, 20, Math.floor((monster.strength - 10) / 2), true)}
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
                            onClick={() => rollDice(1, 20, Math.floor((monster.dexterity - 10) / 2), true)}
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
                            onClick={() => rollDice(1, 20, Math.floor((monster.constitution - 10) / 2), true)}
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
                            onClick={() => rollDice(1, 20, Math.floor((monster.intelligence - 10) / 2), true)}
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
                            onClick={() => rollDice(1, 20, Math.floor((monster.wisdom - 10) / 2), true)}
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
                            onClick={() => rollDice(1, 20, Math.floor((monster.charisma - 10) / 2), true)}
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
                                                onClick={() => rollDice(1, 20, a.attack_bonus, true)}
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
                                key={`stat_block_action-${index}`}
                                className="my-2"
                            >
                                <span><i><b>{la.name}.</b></i> </span>
                                <span>
                                    {
                                        la.desc_obj.preBonus === ""
                                        ? ""
                                        : <span>
                                            <span>{la.desc_obj.preBonus}</span>
                                            <button
                                                className={styles.button}
                                                onClick={() => rollDice(1, 20, la.attack_bonus, true)}
                                            >
                                                {la.attack_bonus < 0 ? "-" : "+"}{la.attack_bonus}
                                            </button>
                                        </span>
                                    }
                                    {
                                        la.desc_obj.preDamage.map((pd, i) => {
                                            if (pd !== "") return <span key={`stat_block_legendary_action_desc_obj_preDamage-${i}`}>
                                                <span>{la.desc_obj.preDamage}</span>
                                                <button
                                                    className={styles.button}
                                                    onClick={() => rollDice(la.damage[i].damage_dice_roll_obj.dice_count, la.damage[i].damage_dice_roll_obj.die, la.damage[i].damage_dice_roll_obj.modifier)}
                                                >
                                                    ({la.damage[i].damage_dice})
                                                </button>
                                            </span>
                                        })
                                    }
                                    <span>{la.desc_obj.remainder}</span>
                                </span>
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