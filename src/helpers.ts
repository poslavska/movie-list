import { setMovies } from "./redux-state/movies"
import type { AppDispatch } from "./redux-state/store"

export async function createSession(){
  const response = await fetch(`${import.meta.env.VITE_API_URL}/sessions`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        "email": import.meta.env.VITE_EMAIL,
        "password": import.meta.env.VITE_PASSWORD
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
    const response = await fetch(`${import.meta.env.VITE_API_URL}/movies`, {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    })
    const moviesData = await response.json()
    dispatch(setMovies(moviesData.data))
  } catch (err) {
    console.log("Error while fetching movies", err)
  }
}

export async function addMovie() {
  const token = checkToken() || ""

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/movies`, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          "title": "Once Upon a Time... in Hollywood",
          "year": 2019,
          "format": "DVD",
          "actors": [
              "Leonardo DiCaprio",
              "Brad Pitt",
              "Margot Robbie",
              "Margaret Qualley"
          ]
        }
      )
    })
    
  } catch (err) {
    console.log("Error while adding a movie", err)
  }
}