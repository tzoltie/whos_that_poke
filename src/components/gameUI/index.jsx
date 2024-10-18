import { useEffect, useState } from "react"
import { getPokemon } from "../../utils/apiClient.js"
import "./styling.css"
import Button from "../button/index.jsx"

export default function GameUI({pokemon}) {
    const [pokeGuessed, setPokeGuessed] = useState([])
    const [current, setCurrent] = useState({})
    const [found, setFound] = useState(false)
    const [pokemonNames, setPokemonNames] = useState([])
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

    const createOptions = () => {
        while(pokemonNames.length < 3) {
            console.log(true)
            const pokemonPicker = pokemonRandomizer()
            const alreadySelected = pokemonNames.find(poke => poke.name === pokemonPicker.name)
            if(!alreadySelected) {
                setPokemonNames(prevNames => [...prevNames, pokemonPicker, current])
            }
        }
        console.log("names",pokemonNames)
    }

    return (
        <div className="game-interface">
            <div>
                <h2>Guess the pokemon?</h2>
                <p>Use the outline of the image to guess the correct Pokemon.</p>
            </div>
            <div>
                {typeof current.name !== "undefined" &&
                <>
                <img 
                    alt="pokemon image"
                    className="pokemon-image"
                    src={current.sprites.front_default}
                />
                {pokemonNames.map((pokemon, index) => 
                    <Button text={pokemon.name} key={index}/>)}
                </>}
            </div>
        </div>
    )
}