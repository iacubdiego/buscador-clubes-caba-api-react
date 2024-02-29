// eslint-disable-next-line react/prop-types
function ListOfClubs ({ clubs }) {
  return (
    <ul className='clubs'>
      {
        // eslint-disable-next-line react/prop-types
        clubs.map(club => (
          <li className='club' key={club.id}>
            <h3>{club.title}</h3>
            <p>{club.year}</p>
            <img src={club.image} alt={club.title} />
          </li>
        ))
      }
    </ul>
  )
}

function NoClubsResults () {
  return (
    <p>No se encontraron películas para esta búsqueda</p>
  )
}

// eslint-disable-next-line react/prop-types
export function Clubs ({ clubs }) {
  // eslint-disable-next-line react/prop-types
  const hasClubs = clubs?.length > 0

  return (
    hasClubs
      ? <ListOfClubs clubs={clubs} />
      : <NoClubsResults />
  )
}
