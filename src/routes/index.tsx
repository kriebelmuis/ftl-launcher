import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: Index,
})

function Index() {
  return (
    <div>
      <div className="text-3xl">hello</div>
    </div>
  )
}
