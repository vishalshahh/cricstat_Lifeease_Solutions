// Types for enhanced commentary
type CommentaryEvent = {
  ball: number
  outcome: string
  batsmanId?: string
  bowlerId?: string
  runs?: number
  isExtra?: boolean
  isWicket?: boolean
}

// Commentary templates for different scenarios
const commentaryTemplates = {
  runs: [
    'Brilliant shot, timed perfectly!',
    'Excellent placement through the gap!',
    'Beautiful stroke, making it look easy!',
    'Masterful batting on display!',
    'Gracefully played through the field!',
  ],
  boundaries: [
    'FOUR! Exquisite timing, races to the boundary!',
    'FOUR! Pierces the field with precision!',
    'FOUR! Magnificent stroke through the covers!',
    'FOUR! Threading the needle between fielders!',
    'FOUR! Classic cricket shot, pure elegance!',
  ],
  sixes: [
    'SIX! Into the crowd, what a massive hit!',
    "SIX! That's huge, sailing over the ropes!",
    'SIX! Maximum result, incredible power!',
    'SIX! Deposited into the stands with authority!',
    'SIX! Pure muscle, clearing the boundary with ease!',
  ],
  wickets: [
    'OUT! Big wicket, crucial breakthrough!',
    'OUT! The timber has been disturbed!',
    'OUT! What a catch, brilliant fielding!',
    'OUT! Clean bowled, fantastic delivery!',
    "OUT! That's plumb in front, LBW!",
  ],
  dots: [
    'Defended with a straight bat',
    'Good line and length, no run',
    'Watchful batting, playing it safe',
    'Solid defense on display',
    'Beat the bat, dot ball',
  ],
  extras: {
    wide: [
      'Wide ball, straying down the leg side',
      'Wide delivery, too far outside off',
      'Signaled wide by the umpire',
      'Drifting down leg, called wide',
      'Lost control there, called wide',
    ],
    noBall: [
      'No ball! Overstepping the mark',
      'Front foot no ball called',
      'No ball! Height was the issue',
      'Free hit coming up after the no ball',
      'No ball signaled by the umpire',
    ],
    bye: [
      'Byes taken, good running between wickets',
      'Sneaky bye, alert running',
      'Quick thinking to grab the bye',
      'Bonus run through byes',
      "Keeper couldn't prevent the bye",
    ],
    legBye: [
      'Leg byes added to the total',
      'Deflection off the pads, leg bye taken',
      'Leg bye, good running by the batsmen',
      'Additional run through leg byes',
      'Leg bye signaled by the umpire',
    ],
  },
}

const getRandomComment = (comments: string[]) => {
  return comments[Math.floor(Math.random() * comments.length)]
}

const formatOver = (ballNumber: number) => {
  const over = Math.floor((ballNumber - 1) / 6)
  const ball = ((ballNumber - 1) % 6) + 1
  return `${over}.${ball}`
}

const generateCommentary = (
  event: CommentaryEvent,
  batsman?: string,
  bowler?: string,
) => {
  const overBall = formatOver(event.ball)
  let commentary = ''

  switch (event.outcome) {
    case '4':
      commentary = `${overBall} | ${getRandomComment(commentaryTemplates.boundaries)} ${batsman} showing great form.`
      break
    case '6':
      commentary = `${overBall} | ${getRandomComment(commentaryTemplates.sixes)} ${batsman} dominating the bowling.`
      break
    case '0':
      commentary = `${overBall} | ${getRandomComment(commentaryTemplates.dots)} from ${bowler}.`
      break
    case 'Wicket':
      commentary = `${overBall} | ${getRandomComment(commentaryTemplates.wickets)} ${batsman} has to walk back.`
      break
    case 'Wide':
      commentary = `${overBall} | ${getRandomComment(commentaryTemplates.extras.wide)} by ${bowler}.`
      break
    case 'No Ball':
      commentary = `${overBall} | ${getRandomComment(commentaryTemplates.extras.noBall)} by ${bowler}.`
      break
    case 'Bye':
      commentary = `${overBall} | ${getRandomComment(commentaryTemplates.extras.bye)}`
      break
    case 'Leg Bye':
      commentary = `${overBall} | ${getRandomComment(commentaryTemplates.extras.legBye)}`
      break
    default:
      if (!isNaN(Number(event.outcome)) && Number(event.outcome) > 0) {
        commentary = `${overBall} | ${getRandomComment(commentaryTemplates.runs)} ${batsman} takes ${event.outcome} runs.`
      }
  }

  return commentary
}

const BallLog: React.FC<{
  commentary: CommentaryEvent[]
  players?: { [key: string]: string } // Map of player IDs to names
}> = ({ commentary, players = {} }) => (
  <div className="space-y-3 max-h-96 overflow-y-auto">
    {commentary
      .map((event, index) => {
        const batsman = event.batsmanId
          ? players[event.batsmanId] || 'Batsman'
          : 'Batsman'
        const bowler = event.bowlerId
          ? players[event.bowlerId] || 'Bowler'
          : 'Bowler'
        const commentaryText = generateCommentary(event, batsman, bowler)

        return (
          <div
            key={index}
            className={`p-3 rounded-lg border transition-all ${
              event.outcome === 'Wicket'
                ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                : event.outcome === '4' || event.outcome === '6'
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                  : event.outcome === 'Wide' || event.outcome === 'No Ball'
                    ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
                    : 'bg-muted/50 border-muted-foreground/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{commentaryText}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  event.outcome === 'Wicket'
                    ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    : event.outcome === '4' || event.outcome === '6'
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : event.outcome === 'Wide' || event.outcome === 'No Ball'
                        ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                }`}
              >
                {event.outcome}
              </span>
            </div>
          </div>
        )
      })
      .reverse()}
  </div>
)

export default BallLog
