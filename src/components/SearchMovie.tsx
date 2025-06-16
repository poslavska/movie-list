import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../redux-state/store'
import { useState } from 'react'
import { searchMovie } from '../helpers'
import clearImg from '../assets/clear.png'
import MovieCard from './MovieCard'
import { clearFilteredMovies } from '../redux-state/movies'
import './css/SearchMovie.css'

export default function SearchMovie() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchType, setSearchType] = useState<'actor' | 'movie'>('actor')
  const [searchBtnPressed, setSearchBtnPressed] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const filteredMovies = useSelector((state: RootState) => state.movies.filtered)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSearchBtnPressed(true)
    searchMovie(searchType, searchTerm, dispatch)
  }

  function clearMovieResults() {
    dispatch(clearFilteredMovies())
    setSearchBtnPressed(false)
    setSearchTerm("")
  }

  return (
    <form onSubmit={handleSubmit} className='search-form'>
      <div className='search-group'>
        <p className='search-title'>What are you looking for?</p>
        <div className='radios'>
          <label className='radio-label'>
            <input type='radio' 
            className='radio-input' 
            value='actor'
            name='search'
            checked={searchType === 'actor'}
            onChange={() => setSearchType('actor')}
            required />
            <p className='radio-text'>Actor</p>
          </label>
          <label className='radio-label'>
            <input type='radio' 
            className='radio-input' 
            value='movie'
            name='search'
            checked={searchType === 'movie'}
            onChange={() => setSearchType('movie')}
            required />
            <p className='radio-text'>Movie</p>
          </label>
        </div>
      </div>
      <div className='search-wrapper'>
        <div className='input-icon-wrapper'>
          <input type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          required
          className='search-input'
          placeholder={searchType === 'actor' ? 'Kyle MacLachlan' : 'Titanic'} />
          <button className='clear-btn' onClick={clearMovieResults}
          disabled={!searchTerm}>
            <img src={clearImg} alt="delete icon" className='clear-input-icon' />
          </button>
        </div>
        <button type='submit' className='search-btn'>Search</button>
      </div>
      {(filteredMovies.length === 0 && searchTerm && searchBtnPressed) ?
        <p className='no-results'>No results found</p>
        :
        <div className='filtered-movies-wrapper'>
          {filteredMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      }
    </form>
  )
}