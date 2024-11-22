import { useState } from 'react'
import { format } from 'date-fns'
import { Workout } from '../types'
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface WorkoutListProps {
  workouts: Workout[]
}

export default function WorkoutList({ workouts }: WorkoutListProps) {
  const groupedWorkouts = workouts.reduce((acc, workout) => {
    const date = format(workout.date, 'yyyy-MM-dd')
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(workout)
    return acc
  }, {} as Record<string, Workout[]>)

  const calculateStats = (workouts: Workout[]) => {
    const totalWeight = workouts.reduce((sum, w) => sum + w.weight * w.reps * w.sets, 0)
    const totalReps = workouts.reduce((sum, w) => sum + w.reps * w.sets, 0)
    const avgWeight = totalWeight / totalReps || 0
    const avgReps = totalReps / workouts.length || 0

    return { totalWeight, totalReps, avgWeight, avgReps }
  }

  return (
    <Accordion type="single" collapsible className="space-y-4">
      {Object.entries(groupedWorkouts).map(([date, dayWorkouts]) => (
        <AccordionItem key={date} value={date}>
          <AccordionTrigger className="text-lg font-semibold">
            {format(new Date(date), 'MMMM d, yyyy')}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {dayWorkouts.map((workout) => (
                <div key={workout.id} className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-bold">{workout.exercise}</h3>
                  <p>Weight: {workout.weight} lbs</p>
                  <p>Reps: {workout.reps}</p>
                  <p>Sets: {workout.sets}</p>
                  <p>Time: {format(workout.date, 'HH:mm')}</p>
                </div>
              ))}
              <div className="mt-4 bg-emerald-100 p-4 rounded-lg">
                <h4 className="font-bold">Daily Summary</h4>
                <p>Total Weight: {calculateStats(dayWorkouts).totalWeight} lbs</p>
                <p>Total Reps: {calculateStats(dayWorkouts).totalReps}</p>
                <p>Average Weight: {calculateStats(dayWorkouts).avgWeight.toFixed(2)} lbs</p>
                <p>Average Reps: {calculateStats(dayWorkouts).avgReps.toFixed(2)}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

