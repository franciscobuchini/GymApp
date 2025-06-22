// src/pages/SessionPage.jsx
import { useState } from 'react'
import SessionHeader from '../components/SessionHeader'
import ExercisesList from '../components/ExercisesList'

const EXERCISE_DATA = {
  'Barbell Squat': {
    primary: 'Quadriceps',
    secondary: ['Glutes', 'Hamstrings', 'Lower Back'],
  },
  'Deadlift': {
    primary: 'Hamstrings',
    secondary: ['Glutes', 'Back', 'Forearms'],
  },
  'Bench Press': {
    primary: 'Chest',
    secondary: ['Triceps', 'Shoulders'],
  },
  'Pull-Up': {
    primary: 'Lats',
    secondary: ['Biceps', 'Shoulders'],
  },
}

export default function SessionPage() {
  const [sessionName, setSessionName] = useState('')
  const [showSelect, setShowSelect] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState('')
  const [series, setSeries] = useState(3)
  const [reps, setReps] = useState(Array(3).fill(12))
  const [exercises, setExercises] = useState([])

  const handleAddExerciseClick = () => setShowSelect(true)

  const handleSelectChange = (e) => {
    const value = e.target.value
    setSelectedExercise(value)
    setSeries(3)
    setReps(Array(3).fill(12))
  }

  const increaseSeries = () => {
    setSeries((s) => s + 1)
    setReps((r) => [...r, 12])
  }

  const decreaseSeries = () => {
    if (series > 1) {
      setSeries((s) => s - 1)
      setReps((r) => r.slice(0, -1))
    }
  }

  const handleRepsChange = (index, value) => {
    const newReps = [...reps]
    newReps[index] = Number(value)
    setReps(newReps)
  }

  const handleConfirmExercise = () => {
    if (!selectedExercise) return
    setExercises((prev) => [
      ...prev,
      {
        name: selectedExercise,
        series,
        reps,
        primary: EXERCISE_DATA[selectedExercise].primary,
        secondary: EXERCISE_DATA[selectedExercise].secondary,
      },
    ])
    setShowSelect(false)
    setSelectedExercise('')
    setSeries(3)
    setReps(Array(3).fill(12))
  }

  const selectedData = EXERCISE_DATA[selectedExercise]

return (
  <div className="min-h-screen bg-white">
    <SessionHeader />

    <div className="flex flex-col m-6 gap-4">
      <input
        type="text"
        value={sessionName}
        onChange={(e) => setSessionName(e.target.value)}
        placeholder="Session Name..."
        className="w-full text-xl font-medium placeholder-gray-400 bg-transparent border-none focus:outline-none"
      />

      {exercises.length > 0 && (
        <div className="mt-6">
          <ExercisesList exercises={exercises} />
        </div>
      )}

      {!showSelect && (
        <button
          onClick={handleAddExerciseClick}
          className="w-full text-left px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          + Add exercise
        </button>
      )}

      {showSelect && (
        <div className="flex flex-col gap-6">
          <select
            value={selectedExercise}
            onChange={handleSelectChange}
            className="w-full p-2 border rounded"
          >
            <option value="" disabled>
              Select an exercise
            </option>
            {Object.keys(EXERCISE_DATA).map((exercise) => (
              <option key={exercise} value={exercise}>
                {exercise}
              </option>
            ))}
          </select>

          {selectedData && (
            <>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-200 text-xs text-gray-800 px-2 py-1 rounded">
                  {selectedData.primary}
                </span>
                {selectedData.secondary.map((muscle, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-xs text-gray-500 px-2 py-1 rounded"
                  >
                    {muscle}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 select-none">
                <h4 className="text-sm">Sets number:</h4>
                <button
                  onClick={decreaseSeries}
                  className="text-xl px-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  ←
                </button>
                <span className="text-md">{series}</span>
                <button
                  onClick={increaseSeries}
                  className="text-xl px-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  →
                </button>
              </div>

              <div className="w-full">
                <h4 className="text-sm mb-1">Repetitions number:</h4>
                <div className="flex gap-2 w-full">
                  {reps.map((rep, i) => (
                    <input
                      key={i}
                      type="number"
                      value={rep}
                      onChange={(e) =>
                        handleRepsChange(i, e.target.value)
                      }
                      className="text-center p-2 border rounded text-sm"
                      style={{ width: `${100 / reps.length}%` }}
                      min={1}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={handleConfirmExercise}
                className="self-start w-full px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200"
              >
                + Add exercise
              </button>
            </>
          )}
        </div>
      )}
    </div>
  </div>
)
}