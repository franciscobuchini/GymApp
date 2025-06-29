// src/components/ExercisesList.jsx
import ExerciseInProgress from './ExerciseInProgress'

export default function ExercisesList({ exercises }) {
  return (
    <div className="flex flex-col gap-4 text-left">
      {exercises.map((ex, i) => (
        <ExerciseInProgress key={i} ex={ex} />
      ))}
    </div>
  )
}