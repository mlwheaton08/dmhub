import styles from "./StatBlock.module.css"
import { exampleMonsterObj } from "../../../utils/constants"

export function StatBlock({ monster }) {

    // carefully format the jsx so it's as readable as possible. it's getting cluttered fast lol
    // need to compile a list of properties that need to be parsed out. right now it's only the "1d8+4" shit
    // still need sections for other things (like spells)
    // think of good place to cleanly keep logic that determines whether or not to add a section to the stat block
    // lil note: each spell has a url to this api so i can easily have definitions ready :) i'm sure there are other properties like this too

    const displayAbilityScore = (abilityScore) => {
        const modifier = `${abilityScore > 10 ? "+" : ""}${Math.floor((abilityScore - 10) / 2)}`
        return `${abilityScore} (${modifier})` // ex: "14 (+2)"
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
                        <button className={styles.button}>{displayAbilityScore(monster.strength)}</button>
                    </div>
                </div>
                <div>
                    <div><b>DEX</b></div>
                    <div>
                        <button className={styles.button}>{displayAbilityScore(monster.dexterity)}</button>
                    </div>
                </div>
                <div>
                    <div><b>CON</b></div>
                    <div>
                        <button className={styles.button}>{displayAbilityScore(monster.constitution)}</button>
                    </div>
                </div>
                <div>
                    <div><b>INT</b></div>
                    <div>
                        <button className={styles.button}>{displayAbilityScore(monster.intelligence)}</button>
                    </div>
                </div>
                <div>
                    <div><b>WIS</b></div>
                    <div>
                        <button className={styles.button}>{displayAbilityScore(monster.wisdom)}</button>
                    </div>
                </div>
                <div>
                    <div><b>CHA</b></div>
                    <div>
                        <button className={styles.button}>{displayAbilityScore(monster.charisma)}</button>
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