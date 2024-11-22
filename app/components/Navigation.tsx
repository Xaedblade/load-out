'use client'

import * as React from 'react'
import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavigationProps {
  setCurrentView: (view: 'workouts' | 'add') => void
}

export default function Navigation({ setCurrentView }: NavigationProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="bg-emerald-700 hover:bg-emerald-800">
          <Menu className="h-[1.2rem] w-[1.2rem] text-white" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => alert('Sign In functionality not implemented')}>
          Sign In
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setCurrentView('workouts')}>
          Workouts
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setCurrentView('add')}>
          Add Workout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

