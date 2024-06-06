export const fetchRecipes = async (userId, listItems) => {
    const response = await fetch(`https://localhost:7286/Recipes?userId=${userId}&listItems=${listItems}`)
    const recipesArray = await response.json()
    return recipesArray
}

export const fetchRecipe = async (id) => {
    const response = await fetch(`https://localhost:7286/Recipes/${id}`)
    const recipeObj = await response.json()
    return recipeObj
}

export const fetchStoreSections = async () => {
    const response = await fetch("https://localhost:7286/StoreSections")
    const storeSectionsArray = await response.json()
    return storeSectionsArray
}