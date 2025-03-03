"use client"

import type React from "react"

import { useState } from "react"
import axios from "axios"

export default function ChatInterface() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.post("/api/chat", { message: input })
      const aiMessage = { role: "assistant", content: response.data.message }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      setError(error.response?.data?.error || "An error occurred while processing your request.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">AI Chat Composer</h2>
      <div className="h-64 overflow-y-auto border border-gray-300 rounded-md p-4">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            <span
              className={`inline-block p-2 rounded-md ${msg.role === "user" ? "bg-primary text-white" : "bg-gray-200"}`}
            >
              {msg.content}
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="text-left">
            <span className="inline-block p-2 rounded-md bg-gray-200">Thinking...</span>
          </div>
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-primary text-white px-4 py-2 rounded-md transition-colors ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-dark"
          }`}
        >
          Send
        </button>
      </form>
    </div>
  )
}

