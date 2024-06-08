import { useState } from "react"
import styles from "./Home.module.css"

export function Home() {

    const [slots, setSlots] = useState(
        [
            {
                initiative: 0,
                name: "",
                ac: 0,
                hp: 0,
                condition: "",
                notes: ""
            }
        ]
    )

    const handleSort = () => {
        function compare( a, b ) {
            if ( a.initiative < b.initiative ) return 1
            if ( a.initiative > b.initiative ) return -1
            return 0;
        }

        const copy = [...slots]
        copy.sort(compare)
        setSlots(copy)
    }

    const handleAddRow = () => {
        const copy = [...slots]
        copy.push({
            initiative: 0,
            name: "",
            ac: 0,
            hp: 0,
            condition: "",
            notes: ""
        })
        setSlots(copy)
    }


    return <>
       <div className={styles.main}>
            <h1 className="text-4xl text-center">
                Combat tracker
            </h1>

            <div className="m-4">
                <button
                    className="mx-2"
                    onClick={handleSort}
                >
                    sort
                </button>
                <button
                    className="mx-2"
                    onClick={handleAddRow}
                >
                    add row
                </button>
            </div>

            <div className={styles.table}>
                <div className={`${styles.tr} ${styles.thead}`}>
                    <h2 className={`${styles.td} ${styles.move}`}></h2>
                    <h2 className={`${styles.td} ${styles.init}`}>Init.</h2>
                    <h2 className={`${styles.td} ${styles.name}`}>Name</h2>
                    <h2 className={`${styles.td} ${styles.ac}`}>AC</h2>
                    <h2 className={`${styles.td} ${styles.hp}`}>HP</h2>
                    <h2 className={`${styles.td} ${styles.cond}`}>Condition</h2>
                    <h2 className={`${styles.td} ${styles.notes}`}>Notes</h2>
                    <h2 className={`${styles.td} ${styles.del}`}></h2>
                </div>
                {
                    slots.map((slot, index) => {
                        return (
                            <div key={`slot-${index}`} className={`${styles.tr} ${styles.tbody}`}>
                                {/* Move buttons */}
                                <div className={`${styles.td} ${styles.move}`}>
                                    <svg
                                        className={`h-1/2 fill-gray-800 ${index > 0 ? "hover:cursor-pointer hover:fill-green-500" : ""} transition-all duration-200`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 320 512"
                                        onClick={() => {
                                            if (index > 0) {
                                                const copy = [...slots]
                                                // get the slot to be swapped with
                                                const slotToSwapWith = copy[index - 1]
                                                // swap this slot
                                                copy[index - 1] = copy[index]
                                                // swap the other slot
                                                copy[index] = slotToSwapWith
                                                setSlots(copy)
                                            }
                                        }}
                                    >
                                        <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/>
                                    </svg>
                                    <svg
                                        className={`h-1/2 fill-gray-800 ${index < slots.length - 1 ? "hover:cursor-pointer hover:fill-red-500" : ""} transition-all duration-200`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 320 512"
                                        onClick={() => {
                                            if (index < slots.length - 1) {
                                                const copy = [...slots]
                                                // get the slot to be swapped with
                                                const slotToSwapWith = copy[index + 1]
                                                // swap this slot
                                                copy[index + 1] = copy[index]
                                                // swap the other slot
                                                copy[index] = slotToSwapWith
                                                setSlots(copy)
                                            }
                                        }}
                                    >
                                        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/>
                                    </svg>
                                </div>

                                {/* Inputs */}
                                <input
                                    className={`${styles.td} ${styles.init}`}
                                    type="number"
                                    value={slot.initiative}
                                    onChange={(evt) => {
                                        const copy = [...slots]
                                        copy[index].initiative = parseInt(evt.target.value)
                                        setSlots(copy)
                                    }}
                                />
                                <input
                                    className={`${styles.td} ${styles.name}`}
                                    type="text"
                                    value={slot.name}
                                    onChange={(evt) => {
                                        const copy = [...slots]
                                        copy[index].name = evt.target.value
                                        setSlots(copy)
                                    }}
                                />
                                <input
                                    className={`${styles.td} ${styles.ac}`}
                                    type="number"
                                    value={slot.ac}
                                    onChange={(evt) => {
                                        const copy = [...slots]
                                        copy[index].ac = parseInt(evt.target.value)
                                        setSlots(copy)
                                    }}
                                />
                                <input
                                    className={`${styles.td} ${styles.hp}`}
                                    type="number"
                                    value={slot.hp}
                                    onChange={(evt) => {
                                        const copy = [...slots]
                                        copy[index].hp = parseInt(evt.target.value)
                                        setSlots(copy)
                                    }}
                                />
                                <input
                                    className={`${styles.td} ${styles.cond}`}
                                    type="text"
                                    value={slot.condition}
                                    onChange={(evt) => {
                                        const copy = [...slots]
                                        copy[index].condition = evt.target.value
                                        setSlots(copy)
                                    }}
                                />
                                <input
                                    className={`${styles.td} ${styles.notes}`}
                                    type="text"
                                    value={slot.notes}
                                    onChange={(evt) => {
                                        const copy = [...slots]
                                        copy[index].notes = evt.target.value
                                        setSlots(copy)
                                    }}
                                />

                                {/* Delete button */}
                                <div className={`${styles.td} ${styles.del}`}>
                                    <svg
                                        className="w-5 h-5 fill-gray-800 hover:cursor-pointer hover:fill-red-600 transition-all duration-200"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                        onClick={() => {
                                            const copy = [...slots]
                                            copy.splice(index, 1)
                                            setSlots(copy)
                                        }}
                                    >
                                        <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
                                    </svg>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    </>
}