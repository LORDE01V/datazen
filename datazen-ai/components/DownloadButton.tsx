"use client"

import { useState } from "react"
import axios from "axios"
import { Download } from "lucide-react"

const formats = ["CSV", "JSON", "Excel", "XML", "SQL", "PDF", "TXT"]

export default function DownloadButton() {
  const [selectedFormat, setSelectedFormat] = useState("")

  const handleDownload = async () => {
    if (!selectedFormat) return

    try {
      const response = await axios.get(`/api/download?format=${selectedFormat}`, {
        responseType: "blob",
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `cleaned_data.${selectedFormat.toLowerCase()}`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error("Error downloading file:", error)
      // Handle error (e.g., show error message)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Download Cleaned Data</h2>
      <div className="flex space-x-2">
        <select
          value={selectedFormat}
          onChange={(e) => setSelectedFormat(e.target.value)}
          className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option value="">Select format</option>
          {formats.map((format) => (
            <option key={format} value={format}>
              {format}
            </option>
          ))}
        </select>
        <button
          onClick={handleDownload}
          disabled={!selectedFormat}
          className={`bg-primary text-white px-4 py-2 rounded-md transition-colors flex items-center ${
            !selectedFormat ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-dark"
          }`}
        >
          <Download className="mr-2 h-5 w-5" />
          Download
        </button>
      </div>
    </div>
  )
}

