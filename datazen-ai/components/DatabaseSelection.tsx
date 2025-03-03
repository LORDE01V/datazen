"use client"

import { Database } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const databases = ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "Microsoft SQL Server", "OracleDB", "Firebase Firestore"]

export default function DatabaseSelection() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Database Selection</h2>
      <Select>
        <SelectTrigger className="w-full">
          <Database className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Select a database" />
        </SelectTrigger>
        <SelectContent>
          {databases.map((db) => (
            <SelectItem key={db} value={db}>
              {db}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

