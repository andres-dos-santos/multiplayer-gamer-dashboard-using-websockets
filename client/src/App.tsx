import { ChangeEvent, useEffect, useState } from 'react'
import io from 'socket.io-client'

interface Score {
  id: string
  value: number
  name: string
}

function App() {
  const socket = io('localhost:3000')

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    const currentObj = { [name]: value }

    setScore((prev) => ({ ...prev, ...currentObj }))
  }

  const [score, setScore] = useState({})
  const [playerScores, setPlayerScores] = useState<Score[]>([])

  function sendScores() {
    socket.emit('scores', score)

    socket.on('playerScores', (playerScores) => {
      console.log(playerScores)

      setPlayerScores(playerScores)
    })
  }

  function onConnect() {
    socket.on('connection', () => {
      console.log('connected!')
    })
  }

  useEffect(() => {
    onConnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="h-screen w-screen bg-zinc-900">
      <div className="max-w-[800px] mx-auto flex items-center justify-center h-full flex-col">
        <h1 className="text-2xl font-medium text-white -tracking-wide">
          Multiplayer Game Dashboard
        </h1>

        <input
          type="text"
          name="name"
          onChange={(event) => handleInput(event)}
          placeholder="Enter your name"
          className="h-12 border border-zinc-700 w-96 bg-zinc-800 mt-10 outline-none px-2.5 text-white font-light -tracking-wide text-[13px]"
        />

        <input
          type="text"
          name="score"
          onChange={(event) => handleInput(event)}
          placeholder="Enter your score"
          className="mt-2.5 h-12 border border-zinc-700 w-96 bg-zinc-800 outline-none px-2.5 text-white font-light -tracking-wide text-[13px]"
        />

        <button
          onClick={sendScores}
          className="mt-2.5 h-12 flex items-center justify-between border border-zinc-700 w-96 bg-white outline-none px-5 text-zinc-900 -tracking-wide text-[13px]"
        >
          <p>Send score</p>

          <svg
            className="with-icon_icon__MHUeb"
            data-testid="geist-icon"
            fill="none"
            height="24"
            shapeRendering="geometricPrecision"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M7 17L17 7"></path>
            <path d="M7 7h10v10"></path>
          </svg>
        </button>

        <ul className="mt-10">
          <li className="flex items-center justify-between h-12 border border-b-0 border-zinc-700 last:border-b w-96 px-10 bg-zinc-800/50">
            <p className="text-sm font-medium text-white -tracking-wide uppercase">
              PLAYER NAME
            </p>
            <p className="text-sm font-medium text-white -tracking-wide">
              SOCRE
            </p>
          </li>

          {playerScores.map((item) => (
            <li
              key={item.name}
              className="flex items-center justify-between h-12 border border-b-0 last:border-b w-96 px-10"
            >
              <p className="text-sm font-medium text-white -tracking-wide uppercase">
                {item.name}
              </p>
              <p className="text-sm font-medium text-white -tracking-wide">
                {item.value}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
