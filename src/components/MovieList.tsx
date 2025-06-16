import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../redux-state/store'
import MovieCard from './MovieCard'
import sortIcon from '../assets/sort.png'
import './css/MovieList.css'
import { sortAlphabetically, uploadMovieFile } from '../helpers'
import { useState } from 'react'
import AddMovieForm from './AddMovieForm'
import SearchMovie from './SearchMovie'

export default function MovieList() {
  const movies = useSelector((state: RootState) => state.movies.data)
  const dispatch = useDispatch<AppDispatch>()
  const [isAscOrder, setIsAscOrder] = useState(false)
  const orderText = isAscOrder ? "ASC" : "DESC"
  const [formActivated, setFormActivated] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [fileMsg, setFileMsg] = useState('')

  function handleImport() {
    if (!file) {
      setFileMsg('No file selected')
      return
    }
    
    const formData = new FormData()
    formData.append('movies', file)

    setFileMsg("Uploading...")
    uploadMovieFile(formData, setFileMsg, dispatch)
  }
  
  return (
    <section className='movie-list'>
      {formActivated ? <AddMovieForm setFormActivated={setFormActivated} /> 
        : 
        <>
          <div className='own-movie-wrapper'>
            <h2 className='own-movie-text'>Add your own movie ✏️🎬</h2>
            <button onClick={() => setFormActivated(true)} className='own-movie-btn'>Let's go</button>
            <p className='or-text'>or</p>
            <div className='file-wrapper'>
              <input type="file" accept='.txt' className='file-input'
              onChange={(e) => {
                const selectedFile = e.target.files?.[0]
                if (selectedFile && selectedFile.type === "text/plain") {
                  setFile(selectedFile)
                  setFileMsg("")
                } else {
                  setFile(null)
                  setFileMsg("Only .txt files are allowed")
                }
              }}
              />
              {fileMsg && <p className='file-msg'>{fileMsg}</p>}
              <button onClick={handleImport} className='import-btn'>Import movie file (.txt)</button>
            </div>
          </div>
          <hr style={{marginTop: "2.75em"}} />
          <SearchMovie />
          <hr />
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
          {movies.length > 0 ?
            <div className='movies-wrapper'>
              {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
            </div>
            : <p className='no-movies'>No movies here yet</p>
          }
        </>
      }
    </section>
  )
}