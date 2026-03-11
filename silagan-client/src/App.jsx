import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div className="App-header">
        <h1>Welcome to My React App</h1>
        <p>
          Name: Jose Neil Silagan <br />
          Email: neilsilagan@gmail.com <br />
          GitHub: ArjTheProgrammer <br />
          <a href="https://github.com/ArjTheProgrammer/silagan-webprog">Click here to see the repo!</a>
        </p>
      </div>
    </div>
  )
}

export default App
