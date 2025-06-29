import { useState } from 'react'
import { Icon } from '@iconify/react'

const EXERCISE_DATA = {
  'Barbell Squat': {
    primary: 'Quadriceps',
    secondary: ['Glutes', 'Hamstrings', 'Lower Back'],
  },
  Deadlift: {
    primary: 'Hamstrings',
    secondary: ['Glutes', 'Back', 'Forearms'],
  },
}

export default function ExerciseForm({ onConfirm }) {
  const [selectedExercise, setSelectedExercise] = useState('')
  const [series, setSeries] = useState(3)
  const [reps, setReps] = useState(Array(3).fill(12))
  const [note, setNote] = useState('')

  const handleSelectChange = (e) => {
    setSelectedExercise(e.target.value)
    setSeries(3)
    setReps(Array(3).fill(12))
    setNote('')
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

  const handleCancel = () => {
    setSelectedExercise('')
    setSeries(3)
    setReps(Array(3).fill(12))
    setNote('')
  }

  const handleSubmit = () => {
    if (!selectedExercise) return
    onConfirm({
      name: selectedExercise,
      series,
      reps,
      note,
      primary: EXERCISE_DATA[selectedExercise].primary,
      secondary: EXERCISE_DATA[selectedExercise].secondary,
    })
    handleCancel()
  }

  const selectedData = EXERCISE_DATA[selectedExercise]

  return (
    <div className="flex flex-col gap-4 text-left p-4 bg-blue-100 rounded-xl">
      <select
        value={selectedExercise}
        onChange={handleSelectChange}
        className="w-full border-none rounded focus:outline-none text-blue-700 font-semibold"
      >
        <option value="" disabled>Select an exercise</option>
        {Object.keys(EXERCISE_DATA).map((exercise) => (
          <option key={exercise} value={exercise}>
            {exercise}
          </option>
        ))}
      </select>

      {selectedData && (
        <>
          <div className="flex items-center gap-4 select-none">
            <h4 className="text-sm">Sets number:</h4>
            <button onClick={decreaseSeries} className="text-blue-700 text-xl">
              <Icon icon="line-md:arrow-small-left" />
            </button>
            <span>{series}</span>
            <button onClick={increaseSeries} className="text-blue-700 text-xl">
              <Icon icon="line-md:arrow-small-right" />
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
                  onChange={(e) => handleRepsChange(i, e.target.value)}
                  className="text-center p-2 border border-blue-700 rounded text-xs text-blue-700 font-medium"
                  style={{ width: `${100 / reps.length}%` }}
                  min={1}
                />
              ))}
            </div>
          </div>

          <input
            type="text"
            placeholder="Add note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-2 rounded border border-gray-700 text-xs text-gray-700"
          />

          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 bg-white text-blue-700 rounded-full"
            >
              + Add exercise
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-blue-700 border-gray-300 rounded-full hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  )
}
