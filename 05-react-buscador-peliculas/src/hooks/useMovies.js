import { useState, useRef, useMemo, useCallback } from 'react'
import withoutResults from '../mocks/no-results.json'
import { searchMovies } from '../services/services'
const MOVIES_API_URL = "http://www.omdbapi.com/?apikey=c64fa831&s="
export function useMovies ({ search, sort }) {
    const previousSearch = useRef(search)
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    
    const getMovies = useCallback( async (search) => {
    if(search === previousSearch.current) return
    setLoading(true)
    previousSearch.current = search
    const newMovies = await searchMovies(search)
    setLoading(false)
    setMovies(newMovies)
    }, [search])
    
    // const getSortedMovies = () => {
    //     const sortedMovies = sort
    //     ? [...movies].sort((a,b) => a.title.localeCompare(b.title)) : movies
    //     return sortedMovies
    // }

    const sortedMovies = useMemo(() => {
        console.log('memo sorted movies')
        return sort? [...movies].sort((a,b) => a.title.localeCompare(b.title)) : movies
    }, [sort, movies])

    return { movies: sortedMovies, getMovies, loading}
}   