    import withoutResults from '../mocks/no-results.json'
    const API_KEY = 'c64fa831'
    export const searchMovies = async (search) => {
        if (search) {
        try{ 
            const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
            const json = await response.json()
            const movies = json.Search
            const mappedMovies = movies?.map(movie => ({
                id: movie.imdbID, 
                title: movie.Title,
                year: movie.Year,
                poster: movie.Poster
              }))
            return mappedMovies
        } catch (error) {
            throw new Error('Error searching movies')
        }
    } else {
        return null
    }
        }
    