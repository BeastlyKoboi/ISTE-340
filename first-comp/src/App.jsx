import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Welcome from './Components/Welcome'
import Welcome2 from './Components/Welcome2'

function App() {
  const [count, setCount] = useState(0)
  const [loaded, setLoaded] = useState(false);
  const [dataObj, setDataObj] = useState();


  const getData = () => {
    // load data into dataObj, flip the bit on loaded
    setDataObj({ title: "React is FUN!", description: "lots adn lot of words, something meaningful. Yadayada" });
    setLoaded(true);
  };

  if (!loaded) {
    return (
      <>
        <Welcome2 name="Dan" job="talk" myStyle="myStyle" />
        <Welcome2 name="Jill" job="walk" myStyle="myStyle" />

        <button onClick={getData}></button>
      </>
    )
  }
  return (
    <>
      <h1>Hello World</h1>

      <Welcome name='Allan' />
      <Welcome name='Oscar' />
      <Welcome2 name="Dan" job="talk" myStyle="myStyle" />

      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
