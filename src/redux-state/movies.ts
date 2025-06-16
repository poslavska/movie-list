import { createSlice } from "@reduxjs/toolkit";

export type ActorType = {
  id: number,
  name: string
}

export type MovieType = {
  id: number,
  title: string,
  format: "DVD" | "VHS"
  year: number,
  actors: ActorType[]
}

const initialState: { data: MovieType[]} = { data: []}

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.data = action.payload
    },
    deleteMovie: (state, action) => {
      state.data = state.data.filter(movie => movie.id !== action.payload)
    },
    postNewMovie: (state, action) => {
      state.data = [...state.data, action.payload]
    }
  }
})

export const { setMovies, deleteMovie, postNewMovie } = moviesSlice.actions
export default moviesSlice.reducer