from fastapi import FastAPI, File, UploadFile, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import json
from typing import List, Dict, Any
import io

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update this with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    message: str

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    # Here you would process the uploaded file
    # For now, we'll just return a success message
    return {"filename": file.filename, "message": "File uploaded successfully"}

@app.post("/chat")
async def chat(message: ChatMessage):
    # Here you would process the chat message using AI
    # For now, we'll just return a mock response
    ai_response = f"AI response to: '{message.message}'"
    return {"message": ai_response}

@app.get("/data-preview")
async def data_preview():
    # Here you would fetch and return the actual data preview
    # For now, we'll just return mock data
    mock_data = [
        {"id": 1, "name": "John Doe", "email": "john@example.com"},
        {"id": 2, "name": "Jane Smith", "email": "jane@example.com"},
        {"id": 3, "name": "Bob Johnson", "email": "bob@example.com"},
    ]
    return mock_data

@app.get("/download")
async def download_file(format: str = Query(...)):
    # Here you would generate the file in the specified format
    # For now, we'll just return mock data
    mock_data = "id,name,email\n1,John Doe,john@example.com\n2,Jane Smith,jane@example.com\n3,Bob Johnson,bob@example.com"
    
    if format.lower() == 'csv':
        return Response(content=mock_data, media_type="text/csv", headers={"Content-Disposition": "attachment; filename=cleaned_data.csv"})
    elif format.lower() == 'json':
        json_data = json.dumps(pd.read_csv(io.StringIO(mock_data)).to_dict(orient="records"))
        return Response(content=json_data, media_type="application/json", headers={"Content-Disposition": "attachment; filename=cleaned_data.json"})
    else:
        raise HTTPException(status_code=400,

 "attachment; filename=cleaned_data.json"})
    else:
        raise HTTPException(status_code=400, detail=f"Unsupported format: {format}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

