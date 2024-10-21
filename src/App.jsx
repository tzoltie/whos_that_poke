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
        <h1>Who's that Pokemon?</h1>
      </header>
      <main className='app-main'>
      {!play ? (
        <LandingPage setPokemon={setPokemon} pokemon={pokemon} setPlay={setPlay}/>
      ) : (
        <GameUI pokemon={pokemon.results} pokemonRes={pokemon} setPokemon={setPokemon}/>
      )}
      </main>
    </div>
  )
}

export default App
