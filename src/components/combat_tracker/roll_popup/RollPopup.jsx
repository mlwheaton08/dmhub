import styles from "./RollPopup.module.css"

export function RollPopup({ roll, setRoll }) {

    const clearRollState = (showRoll) => {
        setRoll({
            showRoll: showRoll,
            modifier: "",
            rolls: "",
            finalResult: null
        })
    }


    return <div className={`${styles.main} ${roll.showRoll ? "" : styles.hide}`}>
        <div className="flex gap-4 text-sm text-gray-500">
            <span><i>{roll.rollType}</i></span>
            <span>
                {roll.diceCount}
                d{roll.die}
                {
                    roll.modifier === null
                    ? ""
                    : roll.modifier < 0
                        ? roll.modifier
                        : `+${roll.modifier}`
                }
            </span>
        </div>
        <div className="border-b">
            <span>
                {
                    roll.rolls.length > 0
                    ? roll.rolls.map((r, index) => {
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
                    : ""
                }
            </span>
            {
                roll.modifier === null
                ? ""
                : <span className="text-yellow-500"><b> {roll.modifier < 0 ? "-" : "+"} {Math.abs(roll.modifier)}</b></span>
            }
        </div>
        <div className="text-5xl font-semibold">{roll.finalResult}</div>

        {/* - */}
        {/* <svg
            className="absolute top-1/2 -translate-y-1/2 -left-2 w-4 h-4 bg-black fill-white border border-white rounded-full hover:cursor-pointer hover:fill-yellow-500 hover:border-yellow-500 transition-all duratin-200"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            onClick={() => clearRollState(true)}
        >
            <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
        </svg> */}

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