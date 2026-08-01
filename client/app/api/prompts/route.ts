import { type NextRequest } from "next/server"

const BACKEND = process.env.BACKEND_URL ?? "http://localhost:3001/api"

export async function GET() {
  const res = await fetch(`${BACKEND}/prompts`, {
    headers: { "Content-Type": "application/json" },
  })

  const data = await res.json()
  return Response.json(data, { status: res.status })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const res = await fetch(`${BACKEND}/prompts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  return Response.json(data, { status: res.status })
}
