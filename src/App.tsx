import { useEffect, useState } from 'react'
import './App.css'
import './fonts.css'
import { createSession, fetchMovies } from './helpers'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from './redux-state/store'
import MovieList from './components/MovieList'

export default function App() {
  const dispatch = useDispatch<AppDispatch>()
  const [tokenAvailable, setTokenAvailable] = useState(false)

  useEffect(()=> {
    const init = async () => {
      if (!localStorage.getItem("token")) { 
        try {
          await createSession()
        } catch (err) {
          console.log("Session creation failed", err)
          return
        }
      }
      setTokenAvailable(true)
    }

    init()
  }, [])

  useEffect(() => {
    if (tokenAvailable) fetchMovies(dispatch)
  }, [tokenAvailable])

  return (
    <main>
      <MovieList />
    </main>
  )
}