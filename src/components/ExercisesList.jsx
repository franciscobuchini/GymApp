import { useState, useEffect, useRef } from 'react'

const DIFFICULTY = [
  { id: 'red',    color: 'bg-red-500',    label: 'Hard'   },
  { id: 'yellow', color: 'bg-yellow-500', label: 'Mid'    },
  { id: 'green',  color: 'bg-green-500',  label: 'Easy'   },
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
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (expanded) setWeights(Array(ex.series).fill(''))
  }, [expanded, ex.series])

  useEffect(() => {
    onCompleteChange?.(index, difficulty)
  }, [difficulty])

  useEffect(() => {
    const handler = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const toggle = () => setExpanded(!expanded)

  const handleWeightChange = (i, value, e) => {
    e.stopPropagation()
    const newW = [...weights]
    newW[i] = value
    setWeights(newW)
    if (value === '') setDifficulty(null)
  }

  const weightsComplete = weights.length > 0 && weights.every(w => w !== '')

  const toggleDropdown = e => {
    e.stopPropagation()
    if (!weightsComplete) return
    setShowDropdown(prev => !prev)
  }

  const selectDiff = (id, e) => {
    e.stopPropagation()
    setDifficulty(id)
    setShowDropdown(false)
  }

  const weightsString = weights.length && weights.some(w => w)
    ? weights.map(w => (w ? `${w}kg` : '-')).join(' - ')
    : '-'

  const selected = DIFFICULTY.find(d => d.id === difficulty)

  return (
    <div
      onClick={toggle}
      className="relative bg-blue-100 rounded-xl py-2 px-4 flex flex-col gap-1"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-blue-700 font-semibold">{ex.name}</h3>

        <div className="relative" ref={dropdownRef}>
  <button
    onClick={toggleDropdown}
    disabled={!weightsComplete}
    className={`px-3 py-1 rounded-full text-sm font-medium w-[72px] text-center ${
      !weightsComplete
        ? 'bg-white text-gray-300 cursor-not-allowed'
        : selected
        ? `${selected.color} text-white`
        : 'bg-white text-blue-700 hover:bg-gray-100'
    }`}
  >
    {selected ? selected.label : 'Done'}
  </button>

  {showDropdown && (
    <div className="absolute right-0 mt-1 flex flex-col bg-white border rounded shadow-md z-10">
      {DIFFICULTY.map(({ id, color, label }) => (
        <div
          key={id}
          onClick={e => selectDiff(id, e)}
          className={`${color} text-white px-3 py-1 text-sm rounded-full m-1 cursor-pointer text-center`}
        >
          {label}
        </div>
      ))}
    </div>
  )}
</div>

      </div>

      <div className="flex gap-1 text-xs text-gray-700">
        <p className="font-medium">Reps:</p>
        <p>{ex.reps.join(' - ')}</p>
      </div>

      <div className="flex gap-1 text-xs text-gray-700">
        <p className="font-medium">Weight:</p>
        <p>{weightsString}</p>
      </div>

      {ex.notes && (
        <div className="text-xs text-gray-600 italic">{ex.notes}</div>
      )}

      {expanded && (
        <div className="flex flex-col gap-4" onClick={e => e.stopPropagation()}>
          <div className="flex w-full gap-2 items-center">
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
      )}
    </div>
  )
}
