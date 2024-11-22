import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Workout } from '../types'

interface WorkoutFormProps {
  onAddWorkout: (workout: Workout) => void
}

export default function WorkoutForm({ onAddWorkout }: WorkoutFormProps) {
  const [workout, setWorkout] = useState<Workout>({
    id: '',
    exercise: '',
    weight: 0,
    reps: 0,
    sets: 0,
    date: new Date(),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddWorkout({ ...workout, id: Date.now().toString() })
    setWorkout({ id: '', exercise: '', weight: 0, reps: 0, sets: 0, date: new Date() })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setWorkout({ ...workout, [name]: name === 'date' ? new Date(value) : value })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div>
        <Label htmlFor="exercise">Exercise Name</Label>
        <Input
          type="text"
          id="exercise"
          name="exercise"
          value={workout.exercise}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="weight">Weight (lbs)</Label>
        <Input
          type="number"
          id="weight"
          name="weight"
          value={workout.weight}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="reps">Repetitions</Label>
        <Input
          type="number"
          id="reps"
          name="reps"
          value={workout.reps}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="sets">Sets</Label>
        <Input
          type="number"
          id="sets"
          name="sets"
          value={workout.sets}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="date">Date and Time</Label>
        <Input
          type="datetime-local"
          id="date"
          name="date"
          value={workout.date.toISOString().slice(0, 16)}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
        Add Workout
      </Button>
    </form>
  )
}

