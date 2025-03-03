import FileUpload from "../components/FileUpload"
import DatabaseSelection from "../components/DatabaseSelection"
import ScriptingLanguageSelection from "../components/ScriptingLanguageSelection"
import ChatInterface from "../components/ChatInterface"
import DataPreview from "../components/DataPreview"
import DownloadButton from "../components/DownloadButton"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">DATAZEN-AI Data Cleaner</h1>
      <div className="w-full max-w-4xl space-y-8">
        <FileUpload />
        <DatabaseSelection />
        <ScriptingLanguageSelection />
        <ChatInterface />
        <DataPreview />
        <DownloadButton />
      </div>
    </main>
  )
}

