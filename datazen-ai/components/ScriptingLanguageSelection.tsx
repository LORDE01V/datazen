"use client"

import { Code } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const languages = ["SQL", "Python", "R", "JavaScript", "TypeScript"]

export default function ScriptingLanguageSelection() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Scripting Language</h2>
      <Select>
        <SelectTrigger className="w-full">
          <Code className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Select a scripting language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang} value={lang}>
              {lang}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

