export const fetchSomething = async (url) => {
    const response = await fetch(`https://www.dnd5eapi.co${url}`)
    const responseJSON = await response.json()
    console.log(responseJSON)
    return responseJSON
}

export const searchMonsters = async (searchTerms) => {
    const searchTermsFormatted = searchTerms.split(' ').join('+')
    const response = await fetch(`https://www.dnd5eapi.co/api/monsters/?name=${searchTermsFormatted}`)
    const responseJSON = await response.json()
    console.log(responseJSON.results)
    return responseJSON.results
}