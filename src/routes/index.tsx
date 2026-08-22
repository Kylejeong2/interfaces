import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main>
      <p>Archive 001</p>
      <h1>The AI Interface Museum</h1>
      <p>A visual history of how humans learned to interact with AI.</p>
    </main>
  )
}

