import type { UserMovieDataType } from "./components/AddMovieForm"
import { deleteMovie, setFilteredMovies, setMovies } from "./redux-state/movies"
import type { AppDispatch } from "./redux-state/store"

const windowImport = (window as any)

export async function createUser(){
  const response = await fetch(`${windowImport.VITE_API_URL}/users`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        "email": windowImport.VITE_EMAIL,
        "name": windowImport.VITE_NAME,
        "password": windowImport.VITE_PASSWORD,
        "confirmPassword": windowImport.VITE_PASSWORD
      }
    )
  })

  if (!response.ok) {
    throw new Error("Sign up failed")
  }
}

export async function createSession(){
  const response = await fetch(`${windowImport.VITE_API_URL}/sessions`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        "email": windowImport.VITE_EMAIL,
        "password": windowImport.VITE_PASSWORD
      }
    )
  })

  if (!response.ok) {
    throw new Error("Login failed")
  }
  
  const data = await response.json()
  localStorage.setItem("token", data.token)
}

function checkToken() {
  const token = localStorage.getItem("token")
  if (!token) {
    console.log("No token available for fetching movies")
    return
  }

  return token
}

export async function fetchMovies(dispatch: AppDispatch) {
  const token = checkToken() || ""

  try {
    //response from /movies didn't include actors in the movies for some reason
    const response = await fetch(`${windowImport.VITE_API_URL}/movies`, {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    })
    const moviesData = await response.json()

    if (!moviesData?.data || moviesData.data.length === 0) {
      console.log("No movies found")
      dispatch(setMovies([]))
      return
    }

    //'fetch' for each movie by its id to get the list of actors
    const detailedMovies = await Promise.all(
      moviesData.data.map(async (movie: { id: number }) => {
        const movieRes = await fetch(`${windowImport.VITE_API_URL}/movies/${movie.id}`, {
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          }
        })
        const movieData = await movieRes.json()
        return movieData.data
      })
    )

    dispatch(setMovies(detailedMovies))
  } catch (err) {
    console.log("Error while fetching movies", err)
  }
}

export async function deleteMovieById(id:number, dispatch: AppDispatch) {
  const token = checkToken() || ""

  try {
    const response = await fetch(`${windowImport.VITE_API_URL}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    })
    dispatch(deleteMovie(id))
  } catch (err) {
    console.log("Error while deleting a movie", err)
  }
}

async function getMovieDetails(moviesData: { data: { id: number }[] }, token: string) {
  const detailedMovies = await Promise.all(
    moviesData.data.map(async (movie: { id: number }) => {
      const movieRes = await fetch(`${windowImport.VITE_API_URL}/movies/${movie.id}`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      })
      const movieData = await movieRes.json()
      return movieData.data
    })
  )

  return detailedMovies
}

export async function sortAlphabetically(sort: string, order: string, dispatch: AppDispatch) {
  const token = checkToken() || ""

  try {
    const response = await fetch(`${windowImport.VITE_API_URL}/movies?sort=${sort}&order=${order}`, {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    })
    const moviesData = await response.json()

    const detailedMovies = await getMovieDetails(moviesData, token)

    dispatch(setMovies(detailedMovies))
  } catch (err) {
    console.log("Error while sorting movies", err)
  }
}

export async function addMovie(movie: UserMovieDataType, dispatch: AppDispatch) {
  const token = checkToken() || ""

  if (!movie.title || !movie.year || !movie.format || !movie.actors) {
    alert("Some required fields are missing")
    return
  }

  try {
    const response = await fetch(`${windowImport.VITE_API_URL}/movies`, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          title: movie.title,
          year: Number(movie.year),
          format: movie.format,
          actors: movie.actors.split(',').map(name => name.trim())
        }
      )
    })

    await fetchMovies(dispatch)

  } catch (err) {
    console.log("Error while adding a movie", err)
  }
}

export async function searchMovie(searchType: string, searchText: string, dispatch: AppDispatch) {
  const token = checkToken() || ""
  const format = searchType === "actor" ? `actor=${searchText}` : `search=${searchText}`

  try {
    const response = await fetch(`${windowImport.VITE_API_URL}/movies?${format}`, {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    })

    const moviesData = await response.json()

    const detailedMovies = await getMovieDetails(moviesData, token)

    dispatch(setFilteredMovies(detailedMovies))

  } catch (err) {
    console.log("Error while adding a movie", err)
  }
}

export async function uploadMovieFile(
  formdata: FormData,
  setFileMsg: React.Dispatch<React.SetStateAction<string>>,
  dispatch: AppDispatch
) {
  const token = checkToken() || ""

  try {
    const response = await fetch(`${(window as any).VITE_API_URL}/movies/import`, {
      method: 'POST',
      headers: {
        'Authorization': token,
      },
      body: formdata
    })

    const data = await response.json()

    setFileMsg("File uploaded successfully")

    await fetchMovies(dispatch)
  } catch (err) {
    setFileMsg('File upload error')
  }
}