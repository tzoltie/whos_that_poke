import { useEffect, useState } from "react"
import { getPokemon } from "../../utils/apiClient.js"
import "./styling.css"
import Button from "../button/index.jsx"
import Pokeball from "../cardBack/pokeball.jsx"
import Logo from "../cardBack/logo.jsx"
import PokeCard from "../pokeCard/index.jsx"
import PokemonCardBack from "../cardBack/pokemonCardBack.jsx"
import ReactCardFlip from "react-card-flip"

export default function GameUI({pokemon}) {
    const [pokeGuessed, setPokeGuessed] = useState([])
    const [current, setCurrent] = useState({})
    const [found, setFound] = useState(false)
    const [revealPoke, setRevealPoke] = useState(false)
    const [pokemonNames, setPokemonNames] = useState([])
    const [score, setScore] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)

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

        setRevealPoke(!revealPoke)
        setIsFlipped(!isFlipped)
        

        const pokemonImage = document.getElementsByClassName("pokemon-image")[0]
        pokemonImage.style.filter = "none"

        if(choice.name === current.name) {
            setScore(score + 1)
            // setFound(prev => !prev)
        }

        setTimeout(() => {
            setIsFlipped(prev => !prev)
        }, 2000)
    }

   

    return (
        <div className="game-interface">
            <div>
                <h2>Guess the pokemon</h2>
                <p>Use the outline of the image to guess the correct Pokemon.</p>
                <h3>Score: {score}</h3>
            </div>
                <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                    <PokeCard current={current} pokemonNames={pokemonNames} verifyClick={verifyClick} revealPoke={revealPoke}/>
                    {isFlipped ?
                    <PokemonCardBack setIsFlipped={setIsFlipped} isFlipped={isFlipped} revealPoke={revealPoke}/>
                : 
                    <PokeCard current={current} pokemonNames={pokemonNames} verifyClick={verifyClick} revealPoke={revealPoke}/>}
                </ReactCardFlip>
        </div>
    )
}