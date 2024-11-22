'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { Workout, User } from '../types'

type AppState = {
  user: User | null
  workouts: Workout[]
  token: string | null
}

type Action =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_WORKOUTS'; payload: Workout[] }
  | { type: 'ADD_WORKOUT'; payload: Workout }
  | { type: 'UPDATE_WORKOUT'; payload: Workout }
  | { type: 'DELETE_WORKOUT'; payload: string }
  | { type: 'SET_TOKEN'; payload: string | null }

const initialState: AppState = {
  user: null,
  workouts: [],
  token: null,
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<Action>
} | undefined>(undefined)

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'SET_WORKOUTS':
      return { ...state, workouts: action.payload }
    case 'ADD_WORKOUT':
      return { ...state, workouts: [...state.workouts, action.payload] }
    case 'UPDATE_WORKOUT':
      return {
        ...state,
        workouts: state.workouts.map((w) =>
          w.id === action.payload.id ? action.payload : w
        ),
      }
    case 'DELETE_WORKOUT':
      return {
        ...state,
        workouts: state.workouts.filter((w) => w.id !== action.payload),
      }
    case 'SET_TOKEN':
      return { ...state, token: action.payload }
    default:
      return state
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

