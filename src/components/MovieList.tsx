import { useSelector } from 'react-redux'
import type { RootState } from '../redux-state/store'
import MovieCard from './MovieCard'
import './css/MovieList.css'

export default function MovieList() {
  const movies = useSelector((state: RootState) => state.movies.data)
  
  return (
    <section className='movie-list'>
      <h1>Browse our Movie List 🎬</h1>
      {movies.length > 0 && 
        <div className='movies-wrapper'>
          {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      }
    </section>
  )
}