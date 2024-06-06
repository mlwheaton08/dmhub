import { useState } from "react"
import styles from "./Nav.module.css"

export function SearchBar() {

    const [isActive, setIsActive] = useState(false)

    document.addEventListener("click", (event) => {
        const searchInputElement = document.getElementById("nav-search-input")
        if (document.activeElement === searchInputElement) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    })


    return (
        <div className={styles.section}>
            {/* Icon */}
            <div>
                {
                    isActive
                        ? ""
                        : <label
                            htmlFor="nav-search-input"
                            className="relative"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                className="absolute top-1/2 -translate-y-1/2 h-full left-1.5"
                            >
                                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                            </svg>
                        </label>
                }

                {/* Input */}
                <input
                    id="nav-search-input"
                    name="search-input"
                    autoComplete="off"
                    placeholder={`${isActive ? "Search..." : ""}`}
                    className={styles.searchInput}
                />
            </div>
        </div>
    )
}