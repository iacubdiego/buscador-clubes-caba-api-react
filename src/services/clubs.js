const API_KEY = 'c2a16a4d'

export const searchClubs = async ({ search }) => {
  if (search === '') return null

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
    const json = await response.json()

    const clubs = json.Search
    
    return clubs?.map(club => ({
      id: club.imdbID,
      title: club.Title,
      year: club.Year,
      image: club.Poster
    }))
  } catch (e) {
    throw new Error('Error searching movies')
  }

}
