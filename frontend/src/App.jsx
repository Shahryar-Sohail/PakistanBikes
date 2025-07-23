import { useState } from 'react'
import './index.css'
import 'flowbite'
import 'flowbite/dist/flowbite.min.css'
import Navbar from './components/Navbar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    
    </>
  )
}

export default App
