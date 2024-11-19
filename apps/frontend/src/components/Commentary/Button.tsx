import React from 'react'
import { Button } from '@/components/ui/button'

const CommentaryButtons = ({
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
        <Button
          key={event}
          onClick={() => onButtonClick(event)}
          variant="outline"
          className="p-2 hover:bg-gray-300"
        >
          {event}
        </Button>
      ))}
    </div>
  )
}

export default CommentaryButtons
