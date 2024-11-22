'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import WorkoutForm from './components/WorkoutForm'
import WorkoutList from './components/WorkoutList'
import { Workout } from './types'

export default function FitnessApp() {
  const [workouts, setWorkouts] = useState<Workout[]>([])

  const addWorkout = (workout: Workout) => {
    setWorkouts([...workouts, workout])
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="bg-emerald-600 p-4 text-white">
        <h1 className="text-2xl font-bold">Fitness Tracker</h1>
      </header>
      <main className="container mx-auto p-4">
        <WorkoutForm onAddWorkout={addWorkout} />
        <WorkoutList workouts={workouts} />
      </main>
    </div>
  )
}

