import React from 'react'

const Buttons = ({
  onButtonClick,
}: {
  onButtonClick: (event: string) => void
}) => {
  const events = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '6',
    'Wide',
    'No Ball',
    'Bye',
    'Leg Bye',
    'Wicket',
    'New Ball',
  ]

  return (
    <div className="grid grid-cols-3 gap-2">
      {events.map((event) => (
        <button
          key={event}
          onClick={() => onButtonClick(event)}
          className="p-2 border rounded bg-gray-200 hover:bg-gray-300"
        >
          {event}
        </button>
      ))}
    </div>
  )
}

export default Buttons
