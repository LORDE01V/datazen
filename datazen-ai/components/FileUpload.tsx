"use client"

import type React from "react"

import { useState } from "react"
import axios from "axios"
import { Upload, CheckCircle } from "lucide-react"

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50 MB
const ALLOWED_FORMATS = [".csv", ".json", ".xlsx", ".xml", ".sql", ".pdf", ".txt"]

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0]
      const fileExtension = "." + selectedFile.name.split(".").pop()?.toLowerCase()

      if (!ALLOWED_FORMATS.includes(fileExtension)) {
        setError("Invalid file format. Please upload a CSV, JSON, Excel, XML, SQL, PDF, or TXT file.")
        setFile(null)
      } else if (selectedFile.size > MAX_FILE_SIZE) {
        setError("File size exceeds 50 MB limit")
        setFile(null)
      } else {
        setFile(selectedFile)
        setError(null)
        setUploadSuccess(false)
      }
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setError(null)
    setUploadSuccess(false)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        maxContentLength: MAX_FILE_SIZE,
        maxBodyLength: MAX_FILE_SIZE,
      })
      console.log("File uploaded successfully:", response.data)
      setUploadSuccess(true)
    } catch (error) {
      console.error("Error uploading file:", error)
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 413) {
          setError("File size exceeds the server limit. Please try a smaller file.")
        } else {
          setError(`Error uploading file: ${error.response.data.error || "Unknown error"}`)
        }
      } else {
        setError("Error uploading file. Please try again.")
      }
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">File Upload</h2>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">CSV, JSON, Excel, XML, SQL, PDF, TXT (MAX. 50MB)</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept={ALLOWED_FORMATS.join(",")}
          />
        </label>
      </div>
      {file && <p className="text-sm text-gray-500">Selected file: {file.name}</p>}
      {error && <p className="text-red-500">{error}</p>}
      {uploadSuccess && (
        <p className="text-green-500 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          File uploaded successfully!
        </p>
      )}
      <button
        onClick={handleUpload}
        disabled={!file || isUploading}
        className={`bg-primary text-white px-4 py-2 rounded-md transition-colors ${
          !file || isUploading ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-dark"
        }`}
      >
        {isUploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  )
}

