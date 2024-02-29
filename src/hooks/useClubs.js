import { useRef, useState, useMemo, useCallback } from 'react'
import { searchClubs } from '../services/clubs.js'

export function useClubs ({search, sort}) {
    const [clubs, setClubs] = useState([])
    const [loading, setLoading] = useState(false)

    const [, setError] = useState(null)
    const previousSearch = useRef(search)
    
    const getClubs = useCallback(async ({ search }) => {
        if (search === previousSearch.current) return 

    try {
        setLoading(true)
        setError(null)
        previousSearch.current = search
        const newClubs = await searchClubs({ search })
        setClubs(newClubs)
      } catch (e) {
        setError(e.message)
      } finally {
        // tanto en el try como en el catch
        setLoading(false)
      }
    }, [])
    
    const sortedClubs = useMemo(() => {
        if (!clubs) return;
    return sort
      ? [...clubs].sort((a, b) => a.title.localeCompare(b.title))
      : clubs
  }, [sort, clubs])

    return { clubs: sortedClubs, getClubs, loading }
}