import { useState } from 'react'
import { format, addDays, isToday } from 'date-fns'

export default function DayNavigator({ onChange }) {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const changeDay = (offset) => {
    const newDate = addDays(selectedDate, offset)
    setSelectedDate(newDate)
    onChange?.(newDate)
  }

  const displayLabel = isToday(selectedDate)
    ? 'Today'
    : format(selectedDate, 'EEEE dd MMMM')

  return (
    <div className="flex justify-between items-center py-4">
      <span className="text-lg font-medium">
        {displayLabel}
      </span>
      <div className="flex gap-4">
        <button
          onClick={() => changeDay(-1)}
          className="text-xl px-2 py-1 hover:bg-gray-200 rounded"
        >
          ←
        </button>
        <button
          onClick={() => changeDay(1)}
          className="text-xl px-2 py-1 hover:bg-gray-200 rounded"
        >
          →
        </button>
      </div>
    </div>
  )
}
