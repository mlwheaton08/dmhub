import { useState } from "react"
import { Link } from "react-router-dom"
import styles from "./Nav.module.css"

export function AccountNav() {

    const navItems = [
        {text: "My List", navigateTo: "/list/(id for most recently updated open list)"},
        {text: "Dashboard", navigateTo: "/dashboard/recipes"},
        {text: "Settings", navigateTo: "/settings"},
        {text: "Sign Out", navigateTo: "/login"}
    ]

    const [showDropdown, setShowDropdown] = useState(false)


    return (
        <div
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            className={`${styles.section} hover:cursor-pointer`}
        >
            <div className="relative h-full">

                {/* Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className={`${styles.dropdownIcon} ${styles.account} ${showDropdown ? styles.active : ""}`}
                >
                    <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/>
                </svg>
                
                <nav
                    className={`${styles.dropdownMenu} ${styles.account} ${!showDropdown ? styles.hide : ""}`}
                >
                    {
                        navItems.map((item, index) => {
                            return (
                                <Link
                                    key={`accountNavItem-${index}`}
                                    to={item.navigateTo}
                                    className="w-full py-1.5 text-center hover:text-clr-accent active:text-clr-accent"
                                >
                                    {item.text}
                                </Link>
                            )
                        })
                    }
                </nav>
                
            </div>
        </div>
    )
}