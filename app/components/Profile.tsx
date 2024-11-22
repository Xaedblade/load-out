'use client'

import { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as bff from '../api/bff'

export default function Profile() {
  const { state, dispatch } = useAppContext()
  const [firstName, setFirstName] = useState(state.user?.firstName || '')
  const [lastName, setLastName] = useState(state.user?.lastName || '')
  const [email, setEmail] = useState(state.user?.email || '')
  const [birthYear, setBirthYear] = useState(state.user?.birthYear || '')
  const [error, setError] = useState('')

  useEffect(() => {
    if (state.user) {
      setFirstName(state.user.firstName)
      setLastName(state.user.lastName)
      setEmail(state.user.email)
      setBirthYear(state.user.birthYear.toString())
    }
  }, [state.user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const updatedUser = await bff.updateProfile({
        firstName,
        lastName,
        email,
        birthYear: parseInt(birthYear),
      })
      dispatch({ type: 'SET_USER', payload: updatedUser })
    } catch (error) {
      setError('Failed to update profile')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="birthYear">Birth Year</Label>
        <Input
          type="number"
          id="birthYear"
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
          required
          min="1900"
          max={new Date().getFullYear()}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
        Update Profile
      </Button>
    </form>
  )
}

