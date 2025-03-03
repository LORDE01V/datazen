import { type NextRequest, NextResponse } from "next/server"

export const config = {
  api: {
    bodyParser: false,
  },
}

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50 MB

export async function POST(req: NextRequest) {
  try {
    const contentLength = Number.parseInt(req.headers.get("content-length") || "0", 10)
    if (contentLength > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File size exceeds 50 MB limit" }, { status: 413 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // Check file size again (in case content-length header was manipulated)
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File size exceeds 50 MB limit" }, { status: 413 })
    }

    // Check file format
    const allowedFormats = [".csv", ".json", ".xlsx", ".xml", ".sql", ".pdf", ".txt"]
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()
    if (!allowedFormats.includes(fileExtension)) {
      return NextResponse.json({ error: "Invalid file format" }, { status: 400 })
    }

    // Here you would typically send the file to your backend for processing
    // For now, we'll just return a success message
    return NextResponse.json({ message: "File uploaded successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error processing file upload:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

