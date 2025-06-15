import { useState } from 'react'
import dvdImg from '../assets/cd.png'
import vhsImg from '../assets/vhs.png'
import deleteImg from '../assets/delete.png'
import './css/MovieCard.css'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../redux-state/store'
import { deleteMovieById } from '../helpers'
import type { MovieType } from '../redux-state/movies'

type MovieCardProps = {
  movie: MovieType
}

export default function MovieCard({ movie }: MovieCardProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [isDvd, setIsDvd] = useState(movie.format === "DVD")

  return (
    <div className={`movie-card ${isDvd ? 'dvd-background' : 'vhs-background'}`}>
      {isDvd ? <img src={dvdImg} className='movie-format' alt='image of a dvd' /> 
        : <img src={vhsImg} className='movie-format' alt='image of a vhs' />}
      <div className='movie-info'>
        <div className='movie-info-wrapper'>
          <p className='movie-title'>{movie.title}</p>
          <p className='movie-year'>{movie.year}</p>
          <p className='movie-actors'>{movie.actors.map(actor => actor.name).join(", ")}</p>
        </div>
        <button onClick={() => deleteMovieById(movie.id, dispatch)} className='delete-btn'>
          <img src={deleteImg} className='delete-img' alt="delete icon" />
        </button>
      </div>
    </div>
  )
}