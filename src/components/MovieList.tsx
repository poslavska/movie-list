import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../redux-state/store'
import MovieCard from './MovieCard'

export default function MovieList() {
  const movies = useSelector((state: RootState) => state.movies.data)
  
  return (
    <div>
      {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  )
}