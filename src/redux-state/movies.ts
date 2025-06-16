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

const initialState: { data: MovieType[], filtered: MovieType[]} = { data: [], filtered: []}

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
    },
    setFilteredMovies: (state, action) => {
      state.filtered = action.payload
    },
    clearFilteredMovies: (state) => {
      state.filtered = []
    }
  }
})

export const { setMovies, deleteMovie, postNewMovie, setFilteredMovies, clearFilteredMovies } = moviesSlice.actions
export default moviesSlice.reducer