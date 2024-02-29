import './App.css'
import { useClubs } from "./hooks/useClubs.js"
import { Clubs } from "./components/Clubs.jsx"
import { useState, useEffect, useRef, useCallback } from 'react'
import debounce from 'just-debounce-it'


function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar un campo vacío')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

function App() {
const [sort, setSort] = useState(false)
const { search, updateSearch, error } = useSearch()
const { clubs, loading, getClubs } = useClubs({ search, sort })

// eslint-disable-next-line react-hooks/exhaustive-deps
const debouncedGetClubs = useCallback(
  debounce(search => {
    console.log('search', search)
    getClubs({ search })
  }, 300)
  , [getClubs]
)

const handleSubmit = (event) => {
  event.preventDefault()
getClubs({ search })
}

const handleSort = () => {
  setSort(!sort)
}

const handleChange = (event) => {
  const newSearch = event.target.value
  updateSearch(newSearch)
  debouncedGetClubs(newSearch)
}

return (
    <>
    <div className="page">
      <header>
        <form className="form" onSubmit={handleSubmit}>
          <input 
          style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }} onChange={handleChange} value={search} name='query' placeholder="club ..." />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
      {
          loading ? 
          <p>Cargando...</p> 
          : 
          <Clubs clubs={clubs} />
        }      
      </main>
    </div>
    </>
  )
}

export default App
