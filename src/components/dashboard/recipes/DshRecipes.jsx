import { useEffect, useState } from "react"
import styles from "./DshRecipes.module.css"
import { useNavigate } from "react-router-dom"
import { fetchRecipes } from "../../../APIMethods"

export function DshRecipes() {

    const navigate = useNavigate()

    const [recipes, setRecipes] = useState([])

    const getRecipes = async () => {
        const recipesArray = await fetchRecipes(1, false)
        setRecipes(recipesArray)
    }

    useEffect(() => {
        getRecipes()
    }, [])


    return (
        <section className={styles.main}>
            <div>
                <h1 className="mb-2 text-xl">Recipes</h1>
                <div className={styles.searchCriteriaContainer}>
                    <input placeholder="Search..." />
                    {/* <button>
                        Filter
                    </button>
                    <button>
                        Sort
                    </button> */}
                    <button>
                        Create New
                    </button>
                </div>
            </div>

            <div className={styles.cardContainer}>
                {
                    recipes.map((recipe) => {
                        return (
                            <div
                                key={`dashboard-recipe-${recipe.id}`}
                                onClick={() => navigate(`/dashboard/recipes/${recipe.id}`)}
                                className={styles.card}
                            >
                                <span className="text-center text-2xl">{recipe.name}</span>
                                {/* <span>{recipe.notes}</span> */}
                                <span className="text-center text-sm">Recipe notes go here alsdkfj;a lsd asdfsdfasdf  sdfasdf kjfsdf</span>
                            </div>
                        )
                    })
                }
            </div>

        </section>
    )
}