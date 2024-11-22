'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import WorkoutForm from './WorkoutForm'
import WorkoutList from './WorkoutList'
import Navigation from './Navigation'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Profile from './Profile'
import { useAppContext } from '../context/AppContext'
import * as bff from '../api/bff'

export default function LoadOut() {
  const { state, dispatch } = useAppContext()
  const router = useRouter()

  useEffect(() => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
    if (token) {
      dispatch({ type: 'SET_TOKEN', payload: token })
      bff.initializeApi(token)
      fetchProfile()
      fetchWorkouts()
    } else if (state.currentView !== 'signin' && state.currentView !== 'signup') {
      router.push('/signin')
    }
  }, [state.currentView])

  const fetchProfile = async () => {
    try {
      const user = await bff.getProfile()
      dispatch({ type: 'SET_USER', payload: user })
    } catch (error) {
      console.error('Failed to fetch profile:', error)
      handleLogout()
    }
  }

  const fetchWorkouts = async () => {
    try {
      const workouts = await bff.getWorkouts()
      dispatch({ type: 'SET_WORKOUTS', payload: workouts })
    } catch (error) {
      console.error('Failed to fetch workouts:', error)
    }
  }

  const addWorkout = async (workout: Omit<Workout, 'id'>) => {
    try {
      const newWorkout = await bff.addWorkout(workout)
      dispatch({ type: 'ADD_WORKOUT', payload: newWorkout })
    } catch (error) {
      console.error('Failed to add workout:', error)
    }
  }

  const handleSignIn = async (email: string, password: string) => {
    try {
      const { token, user } = await bff.signIn(email, password)
      document.cookie = `token=${token}; path=/; max-age=86400; secure; samesite=strict`
      dispatch({ type: 'SET_TOKEN', payload: token })
      dispatch({ type: 'SET_USER', payload: user })
      bff.initializeApi(token)
      fetchWorkouts()
      dispatch({ type: 'SET_VIEW', payload: 'workouts' })
    } catch (error) {
      console.error('Failed to sign in:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Invalid email or password' })
    }
  }

  const handleSignUp = async (userData: {
    firstName: string
    lastName: string
    email: string
    birthYear: number
    password: string
  }) => {
    try {
      const { token, user } = await bff.signUp(userData)
      document.cookie = `token=${token}; path=/; max-age=86400; secure; samesite=strict`
      dispatch({ type: 'SET_TOKEN', payload: token })
      dispatch({ type: 'SET_USER', payload: user })
      bff.initializeApi(token)
      dispatch({ type: 'SET_VIEW', payload: 'workouts' })
    } catch (error) {
      console.error('Failed to sign up:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to create account' })
    }
  }

  const handleLogout = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    dispatch({ type: 'LOGOUT' })
    bff.initializeApi(null)
    router.push('/signin')
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="bg-emerald-600 p-4 text-white flex justify-between items-center">
        <h1 className="text-2xl font-bold">Load Out</h1>
        {state.user && <Navigation dispatch={dispatch} onLogout={handleLogout} />}
      </header>
      <main className="container mx-auto p-4 max-w-md">
        {!state.user ? (
          state.currentView === 'signin' ? (
            <SignIn onSignIn={handleSignIn} onSwitchToSignUp={() => dispatch({ type: 'SET_VIEW', payload: 'signup' })} error={state.error} />
          ) : (
            <SignUp onSignUp={handleSignUp} onSwitchToSignIn={() => dispatch({ type: 'SET_VIEW', payload: 'signin' })} error={state.error} />
          )
        ) : (
          <>
            {state.currentView === 'add' ? (
              <WorkoutForm onAddWorkout={addWorkout} />
            ) : state.currentView === 'profile' ? (
              <Profile />
            ) : (
              <WorkoutList workouts={state.workouts} onAddWorkout={() => dispatch({ type: 'SET_VIEW', payload: 'add' })} />
            )}
          </>
        )}
      </main>
    </div>
  )
}

