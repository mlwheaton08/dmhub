import { useEffect, useState } from "react"
import styles from "./Home.module.css"
import { conditions_dict } from '../../utils/dictionaries'
import { emptySlot, defaultColumns } from '../../utils/constants'

export function Home() {

    // noel says let user color each row how they want
    // maybe number rows?
    // also count rounds of combat
    // maybe radio button to track whose turn it is?
        // might have to do custom radio button since there's one per slot, and i'm mapping the slots to get them to appear
            // what i mean is idk if the default radio button logic would work if they're all not part of the same form. idk
        // also, the radio buttons prolly wouldn't even have to do anything. literally just a marker for whose turn it is
            // unless i implemented a "next turn" and a round counter logic. then i'd need the radio buttons connected to state i think

    const [showColumnFilter, setShowColumnFilter] = useState(false)
    const [columns, setColumns] = useState(defaultColumns)
    const [slots, setSlots] = useState([emptySlot])
    const [mouseHoverRowIndex, setMouseHoverRowIndex] = useState(-1)
    const [showSavedPopup, setShowSavedPopup] = useState(false)

    const handleSort = () => {
        function compare( a, b ) {
            if ( a["initiative"].value < b["initiative"].value || a["initiative"].value === "" ) return 1
            if ( a["initiative"].value > b["initiative"].value ) return -1
            return 0;
        }

        const copy = [...slots]
        copy.sort(compare)
        setSlots(copy)
    }

    const handleAddSlot = () => {
        if (slots.length >= 100) return

        const copy = [...slots]
        copy.push(emptySlot)
        setSlots(copy)
    }

    const reset = () => {
        // setColumns(defaultColumns)
        setSlots([emptySlot])
    }

    const rollAll = () => {
        const copy = [...slots]
        for (const slot of copy) {
            if (!slot["hp"].isDead) {
                slot["initiative"].value = Math.floor(Math.random() * 21)
            }
        }
        setSlots(copy)
    }

    const handleFighterDead = (slotIndex, isDead) => {
        const copy = [...slots]
        copy[slotIndex]["hp"].isDead = isDead
        setSlots(copy)
    }

    function handleInputKeyDown(event, key, index) {
        if (event.repeat) return

        if (event.key === "Enter") {
            // the below logic gets the next non-disabled element
            let stopLoop
            let count = 0
            while (!stopLoop) {
                const element = document.getElementById(`slot_input-${key}-${index}`)
                if (element.disabled) {
                    index++
                    // if we're past the last slot, go back to first one
                    if (index > slots.length - 1) {
                        index = 0
                    }
                    count++
                    // prevents infinite looping
                        // i think it wouldn't loop infinitely anyway, because there has to be at least one active element for this function to run. but keeping the code below just to be safe
                    if (count > slots.length) {
                        stopLoop = true
                    }
                } else {
                    stopLoop = true
                    document.getElementById(`slot_input-${key}-${index}`).focus()
                    document.getElementById(`slot_input-${key}-${index}`).select()
                }
            }
        }
    }

    const setStorage = () => {
        localStorage.setItem("dnd_combat_tracker", JSON.stringify({
            columns: columns,
            slots: slots
        }))
    }

    const getStorage = async () => {
        const dnd_combat_tracker = await JSON.parse(localStorage.getItem("dnd_combat_tracker"))
        if (dnd_combat_tracker) {
            setColumns(dnd_combat_tracker.columns)
            setSlots(dnd_combat_tracker.slots)
        }
    }

    // useEffect(() => {
    //     getStorage()
    // },[])

    // useEffect(() => {
    //     setStorage()
    //     // i think the function below causes infinite loop
    //     // getStorage()
    // },[columns, slots])


    return <>
       <div className={styles.main}>
            {/* Save icon */}
            <div className="fixed top-6 right-6">
                <span className={`absolute top-0 text-sm ${showSavedPopup ? "right-8 opacity-100" : "right-0 opacity-0"} transition-all duration-300`}>
                    Saved!
                </span>
                <svg
                    className="absolute top-0 right-0 w-6 h-6 fill-slate-500 hover:cursor-pointer hover:fill-slate-300 transition-all duration-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    onClick={async () => {
                        setStorage()
                        await getStorage()
                        setShowSavedPopup(true)
                        setTimeout(() => setShowSavedPopup(false), 1000)
                    }}
                >
                    <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
                </svg>
            </div>

            <h1 id="title" className="py-8 text-4xl text-center">
                Combat tracker
            </h1>

            <div className="mx-4 py-6 flex gap-4">
                <button
                    className="bg-transparent text-emerald-300 border border-emerald-300 hover:bg-emerald-300 hover:text-black"
                    onClick={handleAddSlot}
                >
                    add row
                </button>
                <button
                    className="bg-transparent text-teal-300 border border-teal-300 hover:bg-teal-300 hover:text-black"
                    onClick={rollAll}
                >
                    roll for everyone
                </button>
                <button
                    className="bg-transparent text-cyan-300 border border-cyan-300 hover:bg-cyan-300 hover:text-black"
                    onClick={handleSort}
                >
                    sort
                </button>
                <button
                    className="bg-transparent text-slate-300 border border-slate-300 hover:bg-slate-300 hover:text-black"
                    onClick={reset}
                >
                    reset
                </button>

                {/* Column filter */}
                <div
                    className="relative z-10 ml-auto hover:cursor-pointer"
                    onMouseEnter={() => setShowColumnFilter(true)}
                    onMouseLeave={() => setShowColumnFilter(false)}
                >
                    <div className="absolute right-0 flex flex-col w-fit px-2 py-0.5 rounded bg-slate-300 hover:cursor-pointer">
                        <span className="text-gray-600 italic text-nowrap hover:cursor-pointer">Filter columns...</span>
                        {
                            !showColumnFilter
                                // ? <svg
                                //     className="h-3 fill-black"
                                //     xmlns="http://www.w3.org/2000/svg"
                                //     viewBox="0 0 512 512"
                                // >
                                //     <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
                                // </svg>
                                ? ""
                                : Object.keys(columns).map((key, index) => {
                                    return (
                                        <div key={`column_checkbox-${index}`} className="flex gap-1 text-black hover:cursor-pointer">
                                            <input
                                                className="hover:cursor-pointer"
                                                type="checkbox"
                                                id={key}
                                                value={key}
                                                checked={!columns[key].hidden}
                                                onChange={(e) => {
                                                    const copy = {...columns}
                                                    copy[key].hidden = !e.target.checked
                                                    setColumns(copy)
                                                }}
                                            />
                                            <label htmlFor={key} className="hover:cursor-pointer"> {columns[key].displayName}</label>
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>
            </div>

            {/* Headers */}
            <div className={styles.table}>
                <div className={`${styles.tr} ${styles.thead}`}>
                    <h2 className={`${styles.td} ${styles.move}`}></h2>
                    {
                        Object.keys(columns).map((key, index) => {
                            if (columns[key].hidden) return
                            return (
                                <h2
                                    key={`column_header-${index}`}
                                    className={`${styles.td} text-ellipsis overflow-hidden`}
                                    style={{width: columns[key].width}}
                                >
                                    {columns[key].displayName}
                                </h2>
                            )
                        })
                    }
                    <h2 className={`${styles.td} ${styles.dead}`}></h2>
                    <h2 className={`${styles.td} ${styles.del}`}></h2>
                </div>

                {/* Slots */}
                {
                    slots.map((slot, index) => {
                        return (
                            // <div key={index}>
                            //     <input
                            //         className="border border-white"
                            //         value={slot["name"].value}
                            //         onChange={(e) => {
                            //             const copy = [...slots]
                            //             // need the line below bc it was updating every item in slot array otherwise
                            //                 // "directly modifying nested properties of objects in React state isn't recommended because it can lead to unexpected behavior. React won't detect the change in state properly, which can cause issues with rendering and re-renders."
                            //             copy[index] = { ...copy[index], name: { ...copy[index].name, value: e.target.value } }
                            //             setSlots(copy)
                            //         }}
                            //     />
                            // </div>
                            <div
                                key={`slot-${index}`}
                                className={`${styles.tr} ${styles.tbody}`}
                                onMouseEnter={() => setMouseHoverRowIndex(index)}
                                onMouseLeave={() => setMouseHoverRowIndex(-1)}
                            >
                                {/* Move buttons */}
                                <div className={`${styles.td} ${styles.move}`}>
                                    {
                                        mouseHoverRowIndex === index
                                            ? <>
                                                <svg
                                                    className={`h-1/2 fill-gray-700 ${index > 0 ? "hover:cursor-pointer hover:fill-green-500" : ""} transition-all duration-200`}
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
                                                    className={`h-1/2 fill-gray-700 ${index < slots.length - 1 ? "hover:cursor-pointer hover:fill-red-500" : ""} transition-all duration-200`}
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
                                            </>
                                            : ""
                                    }
                                </div>

                                {/* Inputs */}
                                {
                                    columns["initiative"].hidden
                                        ? ""
                                        : <div className={`${styles.td} ${styles.init} ${slot["hp"].isDead ? "text-gray-600 italic line-through" : ""}`}>
                                            <input
                                                id={`slot_input-initiative-${index}`}
                                                className="w-2/3 h-full bg-transparent"
                                                type="number"
                                                disabled={slot["hp"].isDead}
                                                value={slot["initiative"].value}
                                                onChange={(e) => {
                                                    const copy = [...slots]
                                                    const currentValue = parseInt(e.target.value)
                                                    copy[index] = { ...copy[index], "initiative": { ...copy[index]["initiative"], value: isNaN(currentValue) ? "" : currentValue } }
                                                    setSlots(copy)
                                                }}
                                                onKeyDown={(e) => {
                                                    if (index < slots.length - 1) {
                                                        handleInputKeyDown(e, "initiative", index + 1)
                                                    }
                                                    if (index === slots.length - 1) {
                                                        handleInputKeyDown(e, "initiative", 0)
                                                    }
                                                }}
                                            />
                                            {
                                                mouseHoverRowIndex === index && !slot["hp"].isDead
                                                    ? <svg
                                                        className={`w-1/4 fill-clr-background ${!slot["hp"].isDead ? "hover:cursor-pointer hover:fill-clr-foreground" : ""}`}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 512 512"
                                                        onClick={() => {
                                                            if (!slot["hp"].isDead) {
                                                                const copy = [...slots]
                                                                copy[index]["initiative"].value = Math.floor(Math.random() * 21)
                                                                setSlots(copy)
                                                            }
                                                        }}
                                                    >
                                                        <path d="M48.7 125.8l53.2 31.9c7.8 4.7 17.8 2 22.2-5.9L201.6 12.1c3-5.4-.9-12.1-7.1-12.1c-1.6 0-3.2 .5-4.6 1.4L47.9 98.8c-9.6 6.6-9.2 20.9 .8 26.9zM16 171.7V295.3c0 8 10.4 11 14.7 4.4l60-92c5-7.6 2.6-17.8-5.2-22.5L40.2 158C29.6 151.6 16 159.3 16 171.7zM310.4 12.1l77.6 139.6c4.4 7.9 14.5 10.6 22.2 5.9l53.2-31.9c10-6 10.4-20.3 .8-26.9L322.1 1.4c-1.4-.9-3-1.4-4.6-1.4c-6.2 0-10.1 6.7-7.1 12.1zM496 171.7c0-12.4-13.6-20.1-24.2-13.7l-45.3 27.2c-7.8 4.7-10.1 14.9-5.2 22.5l60 92c4.3 6.7 14.7 3.6 14.7-4.4V171.7zm-49.3 246L286.1 436.6c-8.1 .9-14.1 7.8-14.1 15.9v52.8c0 3.7 3 6.8 6.8 6.8c.8 0 1.6-.1 2.4-.4l172.7-64c6.1-2.2 10.1-8 10.1-14.5c0-9.3-8.1-16.5-17.3-15.4zM233.2 512c3.7 0 6.8-3 6.8-6.8V452.6c0-8.1-6.1-14.9-14.1-15.9l-160.6-19c-9.2-1.1-17.3 6.1-17.3 15.4c0 6.5 4 12.3 10.1 14.5l172.7 64c.8 .3 1.6 .4 2.4 .4zM41.7 382.9l170.9 20.2c7.8 .9 13.4-7.5 9.5-14.3l-85.7-150c-5.9-10.4-20.7-10.8-27.3-.8L30.2 358.2c-6.5 9.9-.3 23.3 11.5 24.7zm439.6-24.8L402.9 238.1c-6.5-10-21.4-9.6-27.3 .8L290.2 388.5c-3.9 6.8 1.6 15.2 9.5 14.3l170.1-20c11.8-1.4 18-14.7 11.5-24.6zm-216.9 11l78.4-137.2c6.1-10.7-1.6-23.9-13.9-23.9H183.1c-12.3 0-20 13.3-13.9 23.9l78.4 137.2c3.7 6.4 13 6.4 16.7 0zM174.4 176H337.6c12.2 0 19.9-13.1 14-23.8l-80-144c-2.8-5.1-8.2-8.2-14-8.2h-3.2c-5.8 0-11.2 3.2-14 8.2l-80 144c-5.9 10.7 1.8 23.8 14 23.8z"/>
                                                    </svg>
                                                    : ""
                                            }
                                        </div>
                                }
                                {
                                    columns["name"].hidden
                                        ? ""
                                        : <input
                                            id={`slot_input-name-${index}`}
                                            className={`${styles.td} ${styles.name} ${slot["hp"].isDead ? "text-gray-600 italic line-through" : ""}`}
                                            type="text"
                                            disabled={slot["hp"].isDead}
                                            value={slot["name"].value}
                                            onChange={(e) => {
                                                const copy = [...slots]
                                                // need the line below bc it was updating every item in slot array otherwise
                                                    // "directly modifying nested properties of objects in React state isn't recommended because it can lead to unexpected behavior. React won't detect the change in state properly, which can cause issues with rendering and re-renders."
                                                copy[index] = { ...copy[index], "name": { ...copy[index]["name"], value: e.target.value } }
                                                setSlots(copy)
                                            }}
                                            onKeyDown={(e) => {
                                                if (index < slots.length - 1) {
                                                    handleInputKeyDown(e, "name", index + 1)
                                                }
                                                if (index === slots.length - 1) {
                                                    handleInputKeyDown(e, "name", 0)
                                                }
                                            }}
                                        />
                                }
                                {
                                    columns["ac"].hidden
                                        ? ""
                                        : <input
                                            id={`slot_input-ac-${index}`}
                                            className={`${styles.td} ${styles.ac} ${slot["hp"].isDead ? "text-gray-600 italic line-through" : ""}`}
                                            type="number"
                                            disabled={slot["hp"].isDead}
                                            value={slot["ac"].value}
                                            onChange={(e) => {
                                                const copy = [...slots]
                                                const currentValue = parseInt(e.target.value)
                                                copy[index] = { ...copy[index], "ac": { ...copy[index]["ac"], value: isNaN(currentValue) ? "" : currentValue } }
                                                setSlots(copy)
                                            }}
                                            onKeyDown={(e) => {
                                                if (index < slots.length - 1) {
                                                    handleInputKeyDown(e, "ac", index + 1)
                                                }
                                                if (index === slots.length - 1) {
                                                    handleInputKeyDown(e, "ac", 0)
                                                }
                                            }}
                                        />
                                }
                                {
                                    columns["hp"].hidden
                                        ? ""
                                        : <input
                                            id={`slot_input-hp-${index}`}
                                            className={`${styles.td} ${styles.hp} ${slot["hp"].isDead ? "text-gray-600 italic line-through" : ""}`}
                                            type="number"
                                            disabled={slot["hp"].isDead}
                                            value={slot["hp"].value}
                                            onChange={(e) => {
                                                const copy = [...slots]
                                                const currentValue = parseInt(e.target.value)
                                                copy[index] = { ...copy[index], "hp": { ...copy[index]["hp"], value: isNaN(currentValue) ? "" : currentValue } }
                                                setSlots(copy)
                                            }}
                                            onKeyDown={(e) => {
                                                if (index < slots.length - 1) {
                                                    handleInputKeyDown(e, "hp", index + 1)
                                                }
                                                if (index === slots.length - 1) {
                                                    handleInputKeyDown(e, "hp", 0)
                                                }
                                            }}
                                        />
                                }
                                {
                                    columns["conditions"].hidden
                                        ? ""
                                        : <div className={`z-0 ${styles.td} ${styles.cond}`}>
                                            {/* Icons */}
                                            <div className="flex gap-0.5 overflow-hidden">
                                                {
                                                    Object.keys(conditions_dict).map((condKey, condIndex) => {
                                                        if (slot["conditions"][condKey].value === true) {
                                                            return (
                                                                <span
                                                                    key={`cond-${index}-${condIndex}`}
                                                                    className="relative"
                                                                    // onMouseEnter={() => {
                                                                    //     const copy = [...slots]
                                                                    //     copy[index]["conditions"][condKey].showIconPopup = true
                                                                    //     setSlots(copy)
                                                                    // }}
                                                                    // onMouseLeave={() => {
                                                                    //     const copy = [...slots]
                                                                    //     copy[index]["conditions"][condKey].showIconPopup = false
                                                                    //     setSlots(copy)
                                                                    // }}
                                                                >
                                                                    <span
                                                                        className={`absolute left-1/2 -translate-x-1/2 px-1 py-0.5 rounded bg-slate-800 text-sm ${slots[index]["conditions"][condKey].showIconPopup ? "-top-4" : "top-0 hidden"}`}
                                                                    >
                                                                        {condKey}
                                                                    </span>
                                                                    {conditions_dict[condKey].svg}
                                                                </span>
                                                            )
                                                        }
                                                    })
                                                }
                                            </div>
                                            {/* ----- Dropdown ----- */}
                                            {/* Parent */}
                                            <div className="relative z-10">
                                                {/* The div below is only there so the svg can rotate while this div stays still (aka it is just the background) */}
                                                {/* Dropdown Icon */}
                                                <div
                                                    className={`relative w-4 h-4 ${slot["conditions"].showDropdown ? "bg-clr-foreground" : "bg-clr-transparent"} hover:cursor-pointer hover:bg-clr-foreground rounded transition-all duration-200`}
                                                    onClick={() => {
                                                        const copy = [...slots]
                                                        copy[index] = { ...copy[index], "conditions": { ...copy[index]["conditions"], showDropdown: !copy[index]["conditions"].showDropdown } }
                                                        setSlots(copy)
                                                    }}
                                                >
                                                    <svg
                                                        className={`w-full h-full ${slot["conditions"].showDropdown ? "fill-clr-background rotate-180" : "fill-clr-foreground"} hover:fill-clr-background transition-all duration-200`}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 320 512"
                                                    >
                                                        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/>
                                                    </svg>
                                                </div>
                                                {/* Dropdown Menu */}
                                                {
                                                    slot["conditions"].showDropdown
                                                        ? <div className="fixed bg-slate-400 rounded">
                                                            {
                                                                Object.keys(conditions_dict).map((condKey_checkbox, i) => {
                                                                    return (
                                                                        <div key={`cond_checkbox-${i}`} className="flex gap-1 text-black hover:cursor-pointer">
                                                                            <input
                                                                                className="hover:cursor-pointer"
                                                                                type="checkbox"
                                                                                id={condKey_checkbox}
                                                                                value={slot["conditions"][condKey_checkbox].value}
                                                                                checked={slot["conditions"][condKey_checkbox].value}
                                                                                onChange={(e) => {
                                                                                    const copy = [...slots];
                                                                                    const updatedConditions = { ...copy[index].conditions };
                                                                                    updatedConditions[condKey_checkbox] = { ...updatedConditions[condKey_checkbox], value: e.target.checked };
                                                                                    copy[index] = { ...copy[index], conditions: updatedConditions };
                                                                                    setSlots(copy);
                                                                                  }}
                                                                            />
                                                                            <label htmlFor={condKey_checkbox} className="hover:cursor-pointer"> {condKey_checkbox}</label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        : ""
                                                }
                                            </div>
                                        </div>
                                }
                                {
                                    columns["notes"].hidden
                                        ? ""
                                        : <input
                                            id={`slot_input-notes-${index}`}
                                            className={`${styles.td} ${styles.notes} ${slot["hp"].isDead ? "text-gray-400 italic" : ""}`}
                                            type="text"
                                            value={slot["notes"].value}
                                            onChange={(e) => {
                                                const copy = [...slots]
                                                copy[index] = { ...copy[index], "notes": { ...copy[index]["notes"], value: e.target.value } }
                                                setSlots(copy)
                                            }}
                                            onKeyDown={(e) => {
                                                if (index < slots.length - 1) {
                                                    handleInputKeyDown(e, "notes", index + 1)
                                                }
                                                if (index === slots.length - 1) {
                                                    handleInputKeyDown(e, "notes", 0)
                                                }
                                            }}
                                        />
                                }

                                {/* Death button */}
                                <div className={`${styles.td} ${styles.dead}`}>
                                    {
                                        mouseHoverRowIndex === index
                                            ? slot["hp"].isDead
                                                ? <svg
                                                    className="w-5 h-5 mx-auto fill-gray-700 hover:cursor-pointer hover:fill-yellow-500 transition-all duration-200"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 512 512"
                                                    onClick={() => handleFighterDead(index, false)}
                                                >
                                                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM388.1 312.8c12.3-3.8 24.3 6.9 19.3 18.7C382.4 390.6 324.2 432 256.3 432s-126.2-41.4-151.1-100.5c-5-11.8 7-22.5 19.3-18.7c39.7 12.2 84.5 19 131.8 19s92.1-6.8 131.8-19zM208 192c0 35.3-14.3 64-32 64s-32-28.7-32-64s14.3-64 32-64s32 28.7 32 64zm128 64c-17.7 0-32-28.7-32-64s14.3-64 32-64s32 28.7 32 64s-14.3 64-32 64z"/>
                                                </svg>
                                                : <svg
                                                    className="w-5 h-5 mx-auto fill-gray-700 hover:cursor-pointer hover:fill-white transition-all duration-200"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 512 512"
                                                    onClick={() => handleFighterDead(index, true)}
                                                >
                                                    <path d="M416 398.9c58.5-41.1 96-104.1 96-174.9C512 100.3 397.4 0 256 0S0 100.3 0 224c0 70.7 37.5 133.8 96 174.9c0 .4 0 .7 0 1.1v64c0 26.5 21.5 48 48 48h48V464c0-8.8 7.2-16 16-16s16 7.2 16 16v48h64V464c0-8.8 7.2-16 16-16s16 7.2 16 16v48h48c26.5 0 48-21.5 48-48V400c0-.4 0-.7 0-1.1zM96 256a64 64 0 1 1 128 0A64 64 0 1 1 96 256zm256-64a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
                                                </svg>
                                            : ""
                                    }
                                </div>
                                {/* Delete button */}
                                <div className={`${styles.td} ${styles.del}`}>
                                    {
                                        mouseHoverRowIndex === index
                                        ? <svg
                                                className="w-5 h-5 max-auto fill-gray-700 hover:cursor-pointer hover:fill-red-600 transition-all duration-200"
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
                                            : ""
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    </>
}