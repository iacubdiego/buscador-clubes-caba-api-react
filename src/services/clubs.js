export const searchClubs = async ({ search }) => {
  if (search === '') return null

  try {
    const response = await fetch(`http://localhost:8000/api/contenido-json/?s=${search}`)
    const json = await response.json()

    const clubs = json

    return clubs?.map(club => ({
      id: club.ID,
      title: club.CLUB,
      year: club.CUIT,
      image: club.CUIT
    }))
  } catch (e) {
    throw new Error('Error searching movies')
  }

}
