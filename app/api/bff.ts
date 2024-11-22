import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const signIn = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/signin', { email, password })
    return response.data
  } catch (error) {
    throw error
  }
}

export const signUp = async (userData: {
  firstName: string
  lastName: string
  email: string
  birthYear: number
  password: string
}) => {
  try {
    const response = await api.post('/auth/signup', userData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getWorkouts = async () => {
  try {
    const response = await api.get('/workouts')
    return response.data
  } catch (error) {
    throw error
  }
}

export const addWorkout = async (workout: {
  exercise: string
  weight: number
  reps: number
  sets: number
  date: Date
}) => {
  try {
    const response = await api.post('/workouts', workout)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateWorkout = async (id: string, workout: {
  exercise: string
  weight: number
  reps: number
  sets: number
  date: Date
}) => {
  try {
    const response = await api.put(`/workouts/${id}`, workout)
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteWorkout = async (id: string) => {
  try {
    const response = await api.delete(`/workouts/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

