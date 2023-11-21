import { useCallback, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies' 
import debounce from 'just-debounce-it'
function useSearch () {
  const [search, setSearch] = useState('')
  
  return { search, setSearch}
}

function App() {
  const [sort, setSort] = useState(false)
  const { search, setSearch} = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort})

  const debouncedGetMovies = useCallback(
    debounce( search => {
      getMovies(search)
    }, 300)
  , [])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies(search)
  } 

  const handleChange = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }
  
  return (
  <div className='app-container'>
    <header>
    <form className="form" onSubmit={handleSubmit}>
    <label><h1>Busca una película</h1></label>
    <div className='buscador'>
    <input onChange={handleChange} value={search} placeholder="Avengers, Star Wars, ..." />
    <div className='sort'>
    <label><p>Sort</p></label>
    <input onChange={handleSort} type="checkbox" name="sort" id="sort" />
    </div>
    </div>
    <button type='submit'>Buscar</button>
    </form>
    </header>
    <main>
      {loading? <p>Cargando...</p> : <Movies movies={movies}/>}
    </main>
  </div>
  )
}

export default App
