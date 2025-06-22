import { useState } from 'react'
import { format, addDays, isToday } from 'date-fns'

export default function DayNavigator({ onChange }) {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const changeDay = (offset) => {
    const newDate = addDays(selectedDate, offset)
    setSelectedDate(newDate)
    onChange?.(newDate)
  }

  const displayLabel = `Session for ${
    isToday(selectedDate)
      ? 'today'
      : format(selectedDate, 'EEE dd MMM') // día y mes abreviados a 3 letras
  }`

  return (
    <div className="flex gap-4 items-center">
      <div className="flex gap-2">
        <button
          onClick={() => changeDay(-1)}
          className="text-xl px-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          ←
        </button>
        <button
          onClick={() => changeDay(1)}
          className="text-xl px-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          →
        </button>
      </div>

      <span className="text-md font-medium">
        {displayLabel}
      </span>
    </div>
  )
}
