import { useState } from 'react'
import './App.css'
import LandingPage from './components/landingPage/landingPage'

function App() {
  const [pokemon, setPokemon] = useState({})
  const [play, setPlay] = useState(false)
  
  console.log(pokemon)

  return (
    <div className="app-container">
      <header className='app-header'>
        <h1>Who's that Pokemon?</h1>
      </header>
      <main className='app-main'>
      {!play ? (
        <LandingPage setPokemon={setPokemon} pokemon={pokemon} setPlay={setPlay}/>
      ) : (
        <p>Welcome!</p>
      )}
      </main>
    </div>
  )
}

export default App
