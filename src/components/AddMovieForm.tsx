import React, { useState } from 'react'
import { addMovie } from '../helpers'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../redux-state/store'
import './css/AddMovieForm.css'

export type UserMovieDataType = {
  [key: string]: string
}

type AddMovieFormProps = {
  setFormActivated: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddMovieForm({setFormActivated}: AddMovieFormProps) {
  const [userMovieData, setUserMovieData] = useState<UserMovieDataType>({})
  const dispatch = useDispatch<AppDispatch>()

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target

    setUserMovieData(prevInputs => {
      if (value.trim() === "") {
        const updatedInputs = { ...prevInputs }
        delete updatedInputs[name]
        return updatedInputs
      } else {
        return { ...prevInputs, [name]: value }
      }
    })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addMovie(userMovieData, dispatch)
    setUserMovieData({})
    setFormActivated(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='add-movie-form'>
        <p className='form-title'>Your movie</p>
        <label className='text-group'>
          <p className='input-label'>Enter movie's title</p>
          <input type='text' name='title' className='text-input' 
          value={userMovieData.title || ''}
          maxLength={100}
          onChange={handleChange}
          placeholder='Star Wars' required />
        </label>
        <label className='year-group'>
          <p className='input-label'>Enter movie's release year</p>
          <input type='number' className='number-input'
          min={1870}
          value={userMovieData.year || ''}
          name='year' onChange={handleChange}
          placeholder='1973' required />
        </label>
        <div className='format-group'>
          <p className='radio-text'>Choose movie's format</p>
          <label className='radio-label'>
            <input type='radio' 
            className='radio-input' 
            value='DVD'
            name='format'
            checked={userMovieData.format === 'DVD'}
            onChange={handleChange}
            required />
            <p>DVD</p>
          </label>
          <label className='radio-label'>
            <input type='radio' 
            className='radio-input' 
            value='VHS'
            name='format'
            checked={userMovieData.format === 'VHS'}
            onChange={handleChange}
            required />
            <p>VHS</p>
          </label>
        </div>
        <label className='text-group'>
          <p className='input-label'>Enter the actors list separated by coma</p>
          <input type='text'
          className='text-input' name='actors' onChange={handleChange}
          value={userMovieData.actors || ''}
          placeholder='Margot Robbie, Chris Evans, Tom Holland, Zendaya'
          required
          />
        </label>
        <button type='submit' className='submit-btn'>Save</button>
      </form>
    </>
  )
}