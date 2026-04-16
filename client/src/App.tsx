import { useEffect } from "react";
import './App.css'

function App() {
  useEffect(()=>{
    fetch("http://localhost:5001")
    .then( (res)=> res.text())
    .then( (data)=> console.log(data))
  }, [])

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold text-blue-500">
        E-Commerce App 🚀
      </h1>
    </div>
  );
}

export default App
