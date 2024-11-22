import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SignUpProps {
  onSignUp: (userData: {
    firstName: string
    lastName: string
    email: string
    birthYear: number
    password: string
  }) => void
  onSwitchToSignIn: () => void
}

export default function SignUp({ onSignUp, onSwitchToSignIn }: SignUpProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 10) {
      setError('Password must be at least 10 characters long')
      return
    }

    if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(password)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
      return
    }

    onSignUp({
      firstName,
      lastName,
      email,
      birthYear: parseInt(birthYear),
      password,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
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
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
        Sign Up
      </Button>
      <p className="text-center">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignIn}
          className="text-emerald-600 hover:underline"
        >
          Sign In
        </button>
      </p>
    </form>
  )
}

