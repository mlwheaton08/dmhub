import { useState } from "react"
import styles from "./DshRecipeDetails.module.css"

export const DshRecipeItemForm = ({ storeSections, recipe, setRecipe, setShowRecipeItemForm }) => {

    const [recipeItemToAdd, setRecipeItemToAdd] = useState({
        recipeId: recipe.id,
        // itemId: undefined, need to post the item, then get the id in the return and add it to the recipe
        quantity: 1,
        unitMeas: undefined,
        item: {
            id: undefined,
            userId: undefined,
            storeSectionId: 1,
            name: "",
            notes: undefined,
            dateCreated: undefined, // we'll create this when posting the item
            storeSection: {
                id: 1,
                name: "Produce",
                orderPosition: 1
            }
        }
})

    const handleAddRecipeItem = () => {
        // post newly created item (maybe have conditionals to be sure all required fields are filled out)
            // get new id from item posted
        // post recipeItem
        // note: won't need to reset state, as the post and the setShowRecipeItemForm(false) will do the work for us

        // thought: this method of waiting for the item to post before displaying it could be annoying to the user. Maybe it would be best to just add the new item to the recipe array (even with undefined values like id and dateCreated), then have an "update recipe" button that runs this logic (or it prompts to save with a window alert if there are changes unsaved)
            // more granular: maybe do add the item to the db, but asynchronously. but don't add it as a recipeitem until that "update recipe" button is clicked. just a thought. on second though, it's probably fine -- maybe even preferable -- not to save the item right away. idk. think about it

        setShowRecipeItemForm(false)
    }


    return (
        <form className={styles.ingredientForm}>
            <input
                placeholder="Item"
                value={recipeItemToAdd.item.name}
                onChange={(e) => {
                    const copy = {...recipeItemToAdd}
                    copy.item.name = e.target.value
                    setRecipeItemToAdd(copy)
                }}
            />
            <input
                placeholder="Notes"
                value={recipeItemToAdd.item.notes}
                onChange={(e) => {
                    const copy = {...recipeItemToAdd}
                    copy.item.notes = e.target.value
                    setRecipeItemToAdd(copy)
                }}
            />
            <input
                placeholder="Qty"
                type="number"
                step={0.5}
                min={0}
                max={50}
                value={recipeItemToAdd.quantity}
                onChange={(e) => {
                    const copy = {...recipeItemToAdd}
                    copy.quantity = parseFloat(e.target.value)
                    setRecipeItemToAdd(copy)
                }}
            />
            <input
                placeholder="Unit"
                maxLength={30}
                value={recipeItemToAdd.unitMeas}
                onChange={(e) => {
                    const copy = {...recipeItemToAdd}
                    copy.unitMeas = e.target.value
                    setRecipeItemToAdd(copy)
                }}
                className="w-16"
            />
            <select
                name="store_section"
                onChange={(e) => {
                    const copy = {...recipeItemToAdd}
                    copy.item.storeSection = storeSections[e.target.value]
                    setRecipeItemToAdd(copy)
                }}
            >
                {
                    storeSections.map((storeSection, index) => {
                        return (
                            <option
                                key={`storeSection-${storeSection.id}`}
                                value={index}
                            >
                                {storeSection.name}
                            </option>
                        )
                    })
                }
            </select>

            <button
                onClick={handleAddRecipeItem}
                className="ml-5"
            >
                Add
            </button>
        </form>
    )
}