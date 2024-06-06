import { useState } from "react"
import styles from "./Home.module.css"

export function Home() {

    const initialSlots = [
        {
            initiative: undefined,
            name: undefined,
            ac: undefined,
            hp: undefined,
            condition: undefined,
            notes: undefined
        },
        {
            initiative: undefined,
            name: undefined,
            ac: undefined,
            hp: undefined,
            condition: undefined,
            notes: undefined
        },
        {
            initiative: undefined,
            name: undefined,
            ac: undefined,
            hp: undefined,
            condition: undefined,
            notes: undefined
        }
    ]

    const [slots, setSlots] = useState(initialSlots)

    const handleSort = () => {
        function compare( a, b ) {
            if ( a.initiative < b.initiative ) return 1
            if ( a.initiative > b.initiative ) return -1
            return 0;
        }

        const copy = [...slots]
        const t = copy.sort(compare)
        console.log(t)
        setSlots(t)
    }

    const handleAddRow = () => {
        const copy = [...slots]
        copy.push({
            initiative: undefined,
            name: undefined,
            ac: undefined,
            hp: undefined,
            condition: undefined,
            notes: undefined
        })
        setSlots(copy)
    }


    return <>
       <div className={styles.main}>
            <h1 className="text-4xl text-center">
                Combat tracker
            </h1>

            <div className={styles.table}>
                <ul className={`${styles.tr} ${styles.thead}`}>
                    <li>
                        <h2 className={`${styles.td} ${styles.del}`}></h2>
                        <h2 className={`${styles.td} ${styles.init}`}>Init.</h2>
                        <h2 className={`${styles.td} ${styles.name}`}>Name</h2>
                        <h2 className={`${styles.td} ${styles.ac}`}>AC</h2>
                        <h2 className={`${styles.td} ${styles.hp}`}>HP</h2>
                        <h2 className={`${styles.td} ${styles.cond}`}>Condition</h2>
                        <h2 className={`${styles.td} ${styles.notes}`}>Notes</h2>
                    </li>
                </ul>
                {
                    slots.map((slot, index) => {
                        return (
                            <ul className={`${styles.tr} ${styles.tbody}`}>
                                <li>
                                    <button
                                        className={`${styles.td} ${styles.del}`}
                                        onClick={() => {
                                            const copy = [...slots]
                                            copy.splice(index, 1)
                                            setSlots(copy)
                                        }}
                                    >
                                        del
                                    </button>
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
                                </li>
                            </ul>
                        )
                    })
                }
            </div>

            <button
                onClick={handleSort}
            >
                sort
            </button>
            <button
                onClick={handleAddRow}
            >
                add
            </button>

        </div>
    </>
}