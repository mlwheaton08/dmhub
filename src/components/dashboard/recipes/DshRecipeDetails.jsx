import { useParams } from "react-router-dom"
import styles from "./DshRecipeDetails.module.css"
import { fetchRecipe, fetchStoreSections } from "../../../APIMethods"
import { useEffect, useState } from "react"
import { DshRecipeItemForm } from "./DshRecipeItemForm"

export function DshRecipeDetails() {

    const {id} = useParams()

    const [recipe, setRecipe] = useState({})
    const [recipeItems, setRecipeItems] = useState([])
    const [storeSections, setStoreSections] = useState([])

    const [showRecipeItemForm, setShowRecipeItemForm] = useState(false)

    const getRecipe = async () => {
        const recipeObj = await fetchRecipe(id)
        setRecipe(recipeObj)
    }

    const getStoreSections = async () => {
        const storeSectionsArray = await fetchStoreSections()
        setStoreSections(storeSectionsArray)
    }

    useEffect(() => {
        getRecipe()
        getStoreSections()
    }, [])

    useEffect(() => {
        if (recipe) setRecipeItems(recipe.recipeItems)
    }, [recipe])


    return (
        <div className={styles.main}>
            <h1 className="text-xl">{recipe.name}</h1>
            <h6 className="mb-6 text-sm">Created: {new Date(recipe.dateCreated).toLocaleDateString('en-us', { year:"numeric", month:"numeric", day:"numeric"})}</h6>

            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr className={styles.tr}>
                        <th className={styles.th}>Item</th>
                        <th className={styles.th}>Notes</th>
                        <th className={styles.th}>Quantity</th>
                        <th className={styles.th}>Store Section</th>
                        <th className={styles.th}></th>
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {
                        !recipeItems
                            ? <tr className={styles.tr}><td>no data</td></tr>
                            : recipeItems.map((recipeItem, index) => {
                                return (
                                    <tr
                                        key={`dashboard-recipeItem-${recipeItem.id}`}
                                        className={styles.tr}
                                    >
                                        <td className={styles.td}>{recipeItem.item.name}</td>
                                        <td className={styles.td}>{recipeItem.item.notes}</td>
                                        <td className={styles.td}>
                                            <div>
                                                <input
                                                    type="number"
                                                    step={0.5}
                                                    min={0}
                                                    max={50}
                                                    value={recipeItems[index].quantity}
                                                    onChange={(e) => {
                                                        const copy = [...recipeItems]
                                                        copy[index].quantity = parseFloat(e.target.value)
                                                        setRecipeItems(copy)
                                                    }}
                                                    className="w-10"
                                                />
                                                <span>{`${recipeItem.unitMeas ? recipeItem.unitMeas : ""}`}</span>
                                            </div>
                                        </td>
                                        <td className={styles.td}>{recipeItem.item.storeSection.name}</td>
                                        <td className={styles.td}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 128 512"
                                                className="w-8 h-8 ml-auto p-1 fill-clr-foreground rounded-full hover:cursor-pointer hover:bg-clr-background-3"
                                            >
                                                <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/>
                                            </svg>
                                        </td>
                                    </tr>
                                )
                            })
                    }
                </tbody>
            </table>
            
            {
                !showRecipeItemForm
                    ? <button
                        disabled={showRecipeItemForm}
                        onClick={() => setShowRecipeItemForm(true)}
                    >
                        Add ingredient
                    </button>
                    : <DshRecipeItemForm
                        storeSections={storeSections}
                        recipe={recipe}
                        setRecipe={setRecipe}
                        setShowRecipeItemForm={setShowRecipeItemForm}
                    />
            }

            {
                !recipe.notes
                    ? ""
                    : <footer>Notes: {recipe.notes}</footer>
            }
        </div>
    )
}