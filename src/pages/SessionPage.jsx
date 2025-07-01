import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SessionHeader from '../components/SessionHeader'
import ExercisesList from '../components/ExercisesList'
import ExerciseForm from '../components/ExerciseForm'

export default function SessionPage() {
  const navigate = useNavigate()
  const [sessionName, setSessionName] = useState('')
  const [exercises, setExercises] = useState([])

  const handleConfirm = (exercise) => {
    setExercises(prev => [...prev, { ...exercise, completed: false }])
  }

  const toggleCompleted = (index, completed) => {
    setExercises(prev => {
      const copy = [...prev]
      copy[index] = { ...copy[index], completed }
      return copy
    })
  }

  const handleEdit = (index, updated) => {
    setExercises(prev => {
      const copy = [...prev]
      copy[index] = { ...copy[index], ...updated }
      return copy
    })
  }

  const handleDelete = (index) => {
    setExercises(prev => prev.filter((_, i) => i !== index))
  }

  const anyCompleted = exercises.some(ex => ex.completed)

  const finishSession = () => {
    // Persistencia futura aquí
    navigate('/app')
  }

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

        <ExercisesList
          exercises={exercises}
          onCompleteChange={toggleCompleted}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <ExerciseForm onConfirm={handleConfirm} />

        {exercises.length > 0 && (
          <button
            onClick={finishSession}
            disabled={!anyCompleted}
            className={
              'px-6 py-2 rounded-full text-white w-auto ' +
              (anyCompleted
                ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed')
            }
          >
            Finish session
          </button>
        )}
      </div>
    </div>
  )
}
