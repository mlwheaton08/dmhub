import { useState } from "react"
import { Link } from "react-router-dom"
import styles from "./Nav.module.css"

export function MobileNav({ navItems }) {

    const [showDropdown, setShowDropdown] = useState(false)


    return (
        <div
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            className={`${styles.section} ${styles.browseMobile} hover:cursor-pointer`}
        >
            <div className="relative h-full">

                {/* Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className={`${styles.dropdownIcon} ${styles.mobile} ${showDropdown ? styles.active : ""}`}
                >
                    <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
                </svg>
                
                <nav
                    className={`${styles.dropdownMenu} ${!showDropdown ? styles.hide : ""}`}
                >
                    {
                        navItems.map((item, index) => {
                            return (
                                <Link
                                    key={`mobileNavItem-${index}`}
                                    to={item.navigateTo}
                                    className="w-full py-1.5 text-center hover:text-clr-primary active:text-clr-primary"
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