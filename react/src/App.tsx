import { useState, useEffect } from "react"
import "./App.css"

function App() {
  const [files, setFiles] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/files")
      .then((res) => res.json())
      .then((data) => setFiles(data.files))
  }, [])
  console.log(files)

  return (
    <>
      <h1>Files here</h1>
      <ul style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: "10px" }}>
        {files.map((file) => (
          <li key={file}>{file}</li>
        ))}
      </ul>
    </>
  )
}

export default App
