import { useState } from 'react'
import './App.css'
import LandingPage from './components/landingPage/landingPage'
import GameUI from './components/gameUI'

function App() {
  const [pokemon, setPokemon] = useState({})
  const [play, setPlay] = useState(false)

  return (
    <div className="app-container">
      <header className='app-header'>
        <h1>Who&apos;s that Pokemon?</h1>
      </header>
      <main className='app-main'>
      {!play ? (
        <LandingPage setPokemon={setPokemon} pokemon={pokemon} setPlay={setPlay}/>
      ) : (
        <GameUI />
      )}
      </main>
    </div>
  )
}

export default App
