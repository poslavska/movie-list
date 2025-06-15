import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../redux-state/store'
import MovieCard from './MovieCard'
import sortIcon from '../assets/sort.png'
import './css/MovieList.css'
import { sortAlphabetically } from '../helpers'
import { useState } from 'react'

export default function MovieList() {
  const movies = useSelector((state: RootState) => state.movies.data)
  const dispatch = useDispatch<AppDispatch>()
  const [isAscOrder, setIsAscOrder] = useState(false)
  const orderText = isAscOrder ? "ASC" : "DESC"
  
  return (
    <section className='movie-list'>
      <h1>Browse our Movie List 🎬</h1>
      <div className='movies-sort'>
        <p className='sort-text'>Sort by</p>
        <button className='sort-btn' onClick={() => {
            setIsAscOrder(prev => !prev)
            sortAlphabetically("title", `${orderText}`, dispatch)
          }
        }>
          <img src={sortIcon} alt="alphabetical sort icon" className='sort-icon' /> Alphabetical
        </button>
      </div>
      {movies.length > 0 && 
        <div className='movies-wrapper'>
          {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      }
    </section>
  )
}