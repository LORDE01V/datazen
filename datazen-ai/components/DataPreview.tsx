"use client"

import { useState, useEffect } from "react"
import axios from "axios"

export default function DataPreview() {
  const [data, setData] = useState<any[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/data-preview")
        if (Array.isArray(response.data) && response.data.length > 0) {
          setData(response.data)
        } else {
          setError("No data available for preview")
        }
      } catch (error) {
        console.error("Error fetching data preview:", error)
        setError("Error fetching data preview")
      }
    }

    fetchData()
  }, [])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (!data) {
    return <div>Loading data preview...</div>
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Data Preview</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key} className="px-4 py-2 border-b">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value: any, i) => (
                  <td key={i} className="px-4 py-2 border-b">
                    {String(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

