import styles from "./StatBlock.module.css"

export function StatBlock() {


    return <div className={styles.main}>
        {/* Top bar */}
        <div className={styles.bar}></div>

        <div className={styles.card}>
            {/* header */}
            <div className={`${styles.cardSection} ${styles.header}`}>
                <h1>Abyssal Basilisk</h1>
                <h2><i>Large fiend (demon), chaotic evil</i></h2>
            </div>
            <div className={styles.divider}>
                <img src="https://media-waterdeep.cursecdn.com/file-attachments/0/579/stat-block-header-bar.svg"></img>
            </div>

            {/* ac, hp, speed (base stats) */}
            <div className={`${styles.cardSection} ${styles.baseStats}`}>
                <div><b>Armor Class</b> 17 (natural armor)</div>
                <div><b>Hit Points</b> 126 <button className={styles.button}>(12d10 + 60)</button></div>
                <div><b>Speed</b> 20 ft.</div>
            </div>
            <div className={styles.divider}>
                <img src="https://media-waterdeep.cursecdn.com/file-attachments/0/579/stat-block-header-bar.svg"></img>
            </div>

            {/* abilities */}
            <div className={`${styles.cardSection} ${styles.abilities}`}>
                <div>
                    <div><b>STR</b></div>
                    <div>
                        <button className={styles.button}>19 (+4)</button>
                    </div>
                </div>
                <div>
                    <div><b>DEX</b></div>
                    <div>
                        <button className={styles.button}>13 (+1)</button>
                    </div>
                </div>
                <div>
                    <div><b>CON</b></div>
                    <div>
                        <button className={styles.button}>20 (+5)</button>
                    </div>
                </div>
                <div>
                    <div><b>INT</b></div>
                    <div>
                        <button className={styles.button}>4 (-3)</button>
                    </div>
                </div>
                <div>
                    <div><b>WIS</b></div>
                    <div>
                        <button className={styles.button}>14 (+2)</button>
                    </div>
                </div>
                <div>
                    <div><b>CHA</b></div>
                    <div>
                        <button className={styles.button}>8 (-1)</button>
                    </div>
                </div>
            </div>
            <div className={styles.divider}>
                <img src="https://media-waterdeep.cursecdn.com/file-attachments/0/579/stat-block-header-bar.svg"></img>
            </div>

            {/* skills, proficiencies, etc. */}
            <div className={`${styles.cardSection} ${styles.skillsProficiencies}`}>
                <div><b>Skills</b> Stealth +4, Perception +3</div>
                <div><b>Damage Immunities</b> Bludgeoning</div>
                <div><b>Damage Resistances</b> Poison</div>
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
                <div><i><b>Shortsword.</b> Melee Weapon Attack:</i> +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.</div>
                <div><i><b>Shortbow.</b> Ranged Weapon Attack:</i> +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.</div>
            </div>

            {/* bonus actions */}
            <div className={`${styles.cardSection} ${styles.actions}`}>
                <h2>Bonus Actions</h2>
                <div><i><b>Shortsword.</b> Melee Weapon Attack:</i> +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.</div>
                <div><i><b>Shortbow.</b> Ranged Weapon Attack:</i> +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.</div>
            </div>

            {/* reactions */}
            <div className={`${styles.cardSection} ${styles.actions}`}>
                <h2>Reactions</h2>
                <div><i><b>Shortsword.</b> Melee Weapon Attack:</i> +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.</div>
                <div><i><b>Shortbow.</b> Ranged Weapon Attack:</i> +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.</div>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bar}></div>
    </div>
}