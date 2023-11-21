export function Movies({ movies }) {
    const hasMovies = movies?.length>0
    return(
        <>
        {
            hasMovies? (
                <ul className="movies">
                {movies.map( movie => (
                <li key={movie.id} className="movie">
                  <h3>{movie.title}</h3>
                  <p>{movie.year}</p>
                  <img src={movie.poster} alt={movie.Title} />
                </li>))}
            </ul>
            ) : (
              <h3>No se encontraron resultados</h3>
            )
          }
        </>
    )
}