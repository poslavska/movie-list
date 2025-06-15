import React from 'react'
import type { MovieType } from '../redux-state/movies'

type MovieCardProps = {
  movie: MovieType
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div>MovieCard</div>
  )
}