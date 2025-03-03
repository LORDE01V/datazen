import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    console.log("Received chat request")
    const { message } = await req.json()
    console.log("User message:", message)

    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not set")
      throw new Error("OPENAI_API_KEY is not set")
    }

    console.log("Sending request to OpenAI")
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant for data cleaning and organization." },
        { role: "user", content: message },
      ],
    })

    const aiResponse = completion.choices[0].message.content
    console.log("Received response from OpenAI:", aiResponse)

    return NextResponse.json({ message: aiResponse }, { status: 200 })
  } catch (error) {
    console.error("Error processing chat message:", error)
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 })
  }
}

