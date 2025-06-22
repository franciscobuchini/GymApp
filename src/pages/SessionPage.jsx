// src/pages/SessionPage.jsx
import { useState } from 'react'
import SessionHeader from '../components/SessionHeader'

const EXERCISES = [
  'Barbell Squat',
  'Deadlift',
  'Bench Press',
  'Overhead Press',
  'Pull-Up',
  'Lat Pulldown',
  'Leg Press',
  'Romanian Deadlift',
  'Seated Row',
  'Incline Dumbbell Press',
  'Chest Fly Machine',
  'Cable Crossover',
  'Leg Extension',
  'Lying Leg Curl',
  'Standing Calf Raise',
  'Barbell Curl',
  'Dumbbell Hammer Curl',
  'Triceps Pushdown',
  'Triceps Dips',
  'Plank'
]

export default function SessionPage() {
  const [showSelect, setShowSelect] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState('')

  const handleAddExerciseClick = () => {
    setShowSelect(true)
  }

  const handleSelectChange = (e) => {
    setSelectedExercise(e.target.value)
  }

  return (
  <div className="min-h-screen bg-white">
    <SessionHeader />

    <div className="p-4">
      <input
        type="text"
        placeholder="session name..."
        className="w-full text-xl font-medium m-4 placeholder-gray-400 bg-transparent border-none focus:outline-none"
      />

      <button
        onClick={handleAddExerciseClick}
        className="my-2 w-full text-left px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
      >
        + Add exercise
      </button>

      {showSelect && (
        <div className="mt-4">
          <select
            value={selectedExercise}
            onChange={handleSelectChange}
            className="w-full p-2 border rounded"
          >
            <option value="" disabled>Select an exercise</option>
            {EXERCISES.map((exercise, i) => (
              <option key={i} value={exercise}>
                {exercise}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  </div>
)
}