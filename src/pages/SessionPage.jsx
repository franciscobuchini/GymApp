import { useState } from 'react'
import SessionHeader from '../components/SessionHeader'
import ExercisesList from '../components/ExercisesList'
import ExerciseForm from '../components/ExerciseForm'

export default function SessionPage() {
  const [sessionName, setSessionName] = useState('')
  const [exercises, setExercises] = useState([])

  // Añade ejercicio con completed = false
  const handleConfirm = (exercise) => {
    setExercises(prev => [...prev, { ...exercise, completed: false }])
  }

  // Actualiza completed de un ejercicio por índice
  const toggleCompleted = (index, completed) => {
    setExercises(prev => {
      const copy = [...prev]
      copy[index] = { ...copy[index], completed }
      return copy
    })
  }

  // Chequea si hay al menos un ejercicio completado
  const anyCompleted = exercises.some(ex => ex.completed)

  return (
    <div className="min-h-screen bg-white">
      <SessionHeader />

      <div className="flex flex-col m-4 gap-4">
        <input
          type="text"
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
          placeholder="Session Name..."
          className="w-full text-xl p-2 font-medium placeholder-gray-400 bg-transparent border-none focus:outline-none"
        />

        {exercises.length > 0 && (
          <ExercisesList
            exercises={exercises}
            onToggleCompleted={toggleCompleted} // Pasar función para actualizar
          />
        )}

        <ExerciseForm onConfirm={handleConfirm} />

        <button
          disabled={!anyCompleted}
          className={
            'mt-4 px-6 py-3 rounded-full text-white ' +
            (anyCompleted
              ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
              : 'bg-gray-300 cursor-not-allowed')
          }
        >
          Finish session
        </button>
      </div>
    </div>
  )
}
