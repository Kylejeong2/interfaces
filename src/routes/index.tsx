import { createFileRoute } from '@tanstack/react-router'
import { Museum } from '#/components/Museum'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return <Museum />
}
