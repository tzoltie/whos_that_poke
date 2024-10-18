import { useEffect, useState } from "react"
import { getPokemon } from "../../utils/apiClient.js"

export default function GameUI({pokemon}) {
    const [pokeGuessed, setPokeGuessed] = useState([])
    const [current, setCurrent] = useState({})
    const [found, setFound] = useState(false)
    useEffect(() => {
        if(!found) {
            newPokemon()
        }
        if(current) {
            console.log("current Pokemon:", current)
        }
    }, [found])

    const pokemonRandomizer = () => {
        return pokemon[Math.floor(Math.random() * pokemon.length)]
    }

    const getPokemonDetails = (pokemon) => {
        return getPokemon(pokemon)
    }

    const newPokemon = () => {
       const newPoke = pokemonRandomizer()
       const pokeAlreadyGuessed = pokeGuessed.find((p) => p.name === current.name)
        
       if(pokeAlreadyGuessed) {
        const newPoke = pokemonRandomizer()
        getPokemonDetails(newPoke.url).then((pokeData) => {
            setCurrent(pokeData)
            setFound(true)
        })
        return;
       }

       getPokemonDetails(newPoke.url).then((pokeData) => {
        setCurrent(pokeData)
        setFound(true)
       })
       return;
    }

    return (
        <div className="game-interface">
            <div>
                <h2>Guess the pokemon?</h2>
                <p>Use the outline of the image to guess the correct Pokemon.</p>
            </div>
            <div>
                {typeof current.name !== "undefined" &&
                <img 
                    alt="pokemon image"
                    className="pokemon-image"
                    src={current.sprites.front_default}
                />}
            </div>
        </div>
    )
}