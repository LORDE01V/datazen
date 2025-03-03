import { NextResponse } from "next/server"

export async function GET() {
  // Here you would typically fetch the data preview from your backend
  // For now, we'll just return mock data
  const mockData = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com" },
  ]

  // Ensure we always return an array, even if it's empty
  return NextResponse.json(mockData || [], { status: 200 })
}

