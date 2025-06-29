import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'

const DIFFICULTY = [
  { id: 'red', icon: 'twemoji:red-circle' },
  { id: 'yellow', icon: 'twemoji:yellow-circle' },
  { id: 'green', icon: 'twemoji:green-circle' },
]

export default function ExercisesList({ exercises, onCompleteChange }) {
  return (
    <div className="flex flex-col gap-4 text-left">
      {exercises.map((ex, i) => (
        <ExerciseCard
          key={i}
          ex={ex}
          index={i}
          onCompleteChange={onCompleteChange}
        />
      ))}
    </div>
  )
}

function ExerciseCard({ ex, index, onCompleteChange }) {
  const [expanded, setExpanded] = useState(false)
  const [difficulty, setDifficulty] = useState(null)
  const [weights, setWeights] = useState([])

  useEffect(() => {
    if (expanded) {
      setWeights(Array(ex.series).fill(''))
    }
  }, [expanded, ex.series])

  useEffect(() => {
    onCompleteChange?.(index, difficulty)
  }, [difficulty])

  const toggle = () => setExpanded(!expanded)

  const handleWeightChange = (i, value, e) => {
    e.stopPropagation()
    const newW = [...weights]
    newW[i] = value
    setWeights(newW)
    if (value === '') setDifficulty(null)
  }

  const weightsComplete = weights.length > 0 && weights.every(w => w !== '')

  const selectDiff = (id, e) => {
    e.stopPropagation()
    if (!weightsComplete) return
    setDifficulty(id)
  }

  const weightsString =
    weights.length && weights.some(w => w !== '')
      ? weights.map(w => (w === '' ? '-' : `${w}kg`)).join(' - ')
      : '-'

  return (
    <div
      onClick={toggle}
      className="relative bg-blue-100 rounded-xl py-2 px-4 flex flex-col gap-1 cursor-pointer"
    >
      {difficulty && (
        <Icon
          icon={
            difficulty === 'red'
              ? 'twemoji:red-circle'
              : difficulty === 'yellow'
              ? 'twemoji:yellow-circle'
              : 'twemoji:green-circle'
          }
          className="absolute top-2 right-2 text-2xl"
        />
      )}

      <h3 className="text-blue-700 font-semibold">{ex.name}</h3>
      <div className="flex gap-1 text-xs text-gray-700">
        <p className="font-medium">Reps:</p>
        <p>{ex.reps.join(' - ')}</p>
      </div>
      <div className="flex gap-1 text-xs text-gray-700">
        <p className="font-medium">Weight:</p>
        <p>{weightsString}</p>
      </div>
      {ex.notes && (
        <div className="text-xs text-gray-600 italic">
          {ex.notes}
        </div>
      )}

      {expanded && (
        <div className="flex flex-col gap-4" onClick={e => e.stopPropagation()}>
          <div className="w-full">
            <div className="flex w-full gap-2 items-center">
              <h4 className="text-xs font-medium mb-1 text-gray-700">Weight:</h4>
              {weights.map((w, i) => (
                <input
                  key={i}
                  type="number"
                  value={w}
                  placeholder="kg"
                  onChange={e => handleWeightChange(i, e.target.value, e)}
                  className="flex-1 text-center p-1 border rounded text-sm text-blue-700 font-medium focus:outline-none"
                  style={{ width: `${100 / weights.length}%` }}
                  min={0}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2 justify-end items-center">
            <p className="text-xs font-medium text-gray-700 select-none">
              Difficulty:
            </p>
            {DIFFICULTY.map(({ id, icon }) => (
              <Icon
                key={id}
                icon={icon}
                onClick={e => selectDiff(id, e)}
                className={
                  `text-2xl cursor-pointer ` +
                  (difficulty === id ? 'opacity-100' : 'opacity-20') +
                  (!weightsComplete ? ' opacity-20 cursor-not-allowed' : '')
                }
                style={{
                  pointerEvents: weightsComplete ? 'auto' : 'none',
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
