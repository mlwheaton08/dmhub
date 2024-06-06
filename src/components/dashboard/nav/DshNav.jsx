import { Link } from "react-router-dom"
import styles from "./DshNav.module.css"

export function DshNav({ navState }) {

    const navItems = [
        {text: "Lists", navigateTo: "/dashboard/lists"},
        {text: "Recipes", navigateTo: "/dashboard/recipes"},
        {text: "Items", navigateTo: "/dashboard/items"}
    ]


    return (
        <aside className={styles.main}>
            <h2 className="mb-6 text-3xl">
                Dashboard
            </h2>
            <nav className={styles.nav}>
                {
                    navItems.map((item, index) => {
                        return (
                            <Link
                                key={`dashboard-nav-item-${index}`}
                                to={item.navigateTo}
                                className={`hover:cursor-pointer ${navState.currentRoute.startsWith(`/dashboard/${item.text.toLowerCase()}`) ? "underline" : ""}`}
                            >
                                {item.text}
                            </Link>
                        )
                    })
                }
            </nav>
        </aside>
    )
}