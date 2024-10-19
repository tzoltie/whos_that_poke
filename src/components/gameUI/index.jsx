import { useEffect, useState } from "react"
import { getPokemon } from "../../utils/apiClient.js"
import "./styling.css"
import Button from "../button/index.jsx"

export default function GameUI({pokemon}) {
    const [pokeGuessed, setPokeGuessed] = useState([])
    const [current, setCurrent] = useState({})
    const [found, setFound] = useState(false)
    const [pokemonNames, setPokemonNames] = useState([])
    let score = 0

    useEffect(() => {
        if(!found) {
            newPokemon()
        }
    }, [found])

    useEffect(() => {
        if(current.name) {
            createOptions()
        }
    }, [current])

    const pokemonRandomizer = () => {
        return pokemon[Math.floor(Math.random() * pokemon.length)]
    }

    const buttonRandomIzer = () => {
        for(let i = pokemonNames.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = pokemonNames[i]
            pokemonNames[j] = temp
        }
        return pokemonNames
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
    }

    const createOptions = () => {
        let selectedPokemon = []
        while(selectedPokemon.length < 3) {
            const pokemonPicker = pokemonRandomizer()
            const alreadySelected = selectedPokemon.find(poke => poke.name === pokemonPicker.name)
            if(!alreadySelected) {
                selectedPokemon.push(pokemonPicker)
            }
        }
        setPokemonNames([...selectedPokemon, current])
    }

    const verifyClick = (choice) => {
        console.log(choice)
        if(choice.name === current.name) {
            console.log(true)
            score++
        }
    }

    return (
        <div className="game-interface">
            <div>
                <h2>Guess the pokemon</h2>
                <p>Use the outline of the image to guess the correct Pokemon.</p>
                <h3>Score: {score}</h3>
            </div>
            {found &&
            <div className="pokemon-card">
                <img 
                    alt="pokemon image"
                    className="pokemon-image"
                    src={current.sprites.front_default}
                />
                <div className="btn-container">
                {pokemonNames.map((pokemon, index) => 
                    <Button text={pokemon.name} key={index} onClick={() => verifyClick(pokemon)}/>)}
                </div>
            </div>}
        </div>
    )
}