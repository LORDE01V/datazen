import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const format = searchParams.get("format")

  if (!format) {
    return NextResponse.json({ error: "No format specified" }, { status: 400 })
  }

  // Here you would typically generate the file in the specified format
  // For now, we'll just return a mock response
  const mockData = "This is mock cleaned data"

  return new NextResponse(mockData, {
    status: 200,
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="cleaned_data.${format.toLowerCase()}"`,
    },
  })
}

