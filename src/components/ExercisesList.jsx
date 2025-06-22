// src/components/ExercisesList.jsx
export default function ExercisesList({ exercises }) {
  return (
    <div className="flex flex-col gap-4">
      {exercises.map((ex, i) => (
        <div key={i} className="border rounded p-4">
          <h3 className="font-medium">{ex.name}</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            <span className="bg-gray-200 text-xs text-gray-800 px-2 py-1 rounded">
              {ex.primary}
            </span>
            {ex.secondary.map((m, j) => (
              <span
                key={j}
                className="bg-gray-100 text-xs text-gray-500 px-2 py-1 rounded"
              >
                {m}
              </span>
            ))}
          </div>
          <p className="text-sm mt-2">Series: {ex.series}</p>
          <p className="text-sm">Reps: {ex.reps.join(', ')}</p>
        </div>
      ))}
    </div>
  )
}
