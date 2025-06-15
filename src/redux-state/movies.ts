import { createSlice } from "@reduxjs/toolkit";

export type MovieType = {
  id: number,
  title: string,
  format: "DVD" | "VHS"
  year: number,
  actors: string[]
}

const initialState: { data: MovieType[]} = { data: []}

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // getMovies: (state) => state
    setMovies: (state, action) => {
      state.data = action.payload
    }
  }
})

export const { setMovies } = moviesSlice.actions
export default moviesSlice.reducer