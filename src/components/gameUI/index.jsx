import { useEffect, useState } from "react"
import { getPokemon } from "../../utils/apiClient.js"
import "./styling.css"
import Button from "../button/index.jsx"
import Pokeball from "../cardBack/pokeball.jsx"
import Logo from "../cardBack/logo.jsx"
import PokeCard from "../pokeCard/index.jsx"
import PokemonCardBack from "../cardBack/pokemonCardBack.jsx"
import ReactCardFlip from "react-card-flip"
import ThumbsUp from "../assets/thumbsUp.jsx"
import ThumbsDown from "../assets/thumbsDown.jsx"

export default function GameUI({pokemon, pokemonRes, setPokemon}) {
    const [pokeGuessed, setPokeGuessed] = useState([])
    const [current, setCurrent] = useState({})
    const [found, setFound] = useState(false)
    const [revealPoke, setRevealPoke] = useState(false)
    const [pokemonNames, setPokemonNames] = useState([])
    const [score, setScore] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)
    const [isIncorrect, setIsIncorrect] = useState(false)

    useEffect(() => {
        if(!found) {
            setIsCorrect(false)
            setIsIncorrect(false)
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

    const getPokemonDetails = (pokemon) => {
        return getPokemon(pokemon)
    }

    const newPokemon = () => {
       const newPoke = pokemonRandomizer()
       const pokeAlreadyGuessed = pokeGuessed.find((p) => p.name === current.name)
        
       if(pokeAlreadyGuessed) {
        getNewPokemonList()
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
        selectedPokemon.push(current)
        const newArr = selectedPokemon.sort(() => Math.random() - 0.5)
        setPokemonNames(newArr)
    }

    const verifyClick = (choice) => {

        setRevealPoke(!revealPoke)
        setIsFlipped(!isFlipped)
        

        const pokemonImage = document.getElementsByClassName("pokemon-image")[0]
        pokemonImage.style.filter = "none"

        if(choice.name === current.name) {
            setScore(score + 1)
            setIsCorrect(true)
            setTimeout(() => {
                setIsCorrect(false)
            }, 3500)
        } else {
            setIsIncorrect(true)
            setTimeout(() => {
                setIsIncorrect(false)
            }, 3500)
        }

        setPokeGuessed([...pokeGuessed, current])

        setTimeout(() => {
            setIsFlipped(prev => !prev)
        }, 2000)
    }

    const getNewCard = () => {
        setIsFlipped(!isFlipped)
        setFound(false)
        setRevealPoke(prev => !prev)
        setTimeout(() => {
            setIsFlipped(prev => !prev)
        }, 2000)
        const pokemonImage = document.getElementsByClassName("pokemon-image")[0]
        pokemonImage.style.filter = "invert(100%)"
        pokemonImage.style.filter = "contrast(0%)"
    }

   const getNewPokemonList = () => {
        getPokemon(pokemonRes.next).then(setPokemon)
   }

    return (
        <div className="game-interface">
            <div>
                <h2>Guess the pokemon</h2>
                <p>Use the outline of the image to guess the correct Pokemon.</p>
                <h3>Score: {score}</h3>
            </div>
            {isCorrect &&
            <>
                <ThumbsUp />
                <h2 className="answer-message">Nice Job! You got that right</h2>
            </>
            }
            {isIncorrect &&
            <>
                <ThumbsDown />
                <h2 className="answer-message">Unlucky, not this time</h2>
            </> 
            }
                <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                    <PokeCard current={current} pokemonNames={pokemonNames} verifyClick={verifyClick} revealPoke={revealPoke}/>
                    {isFlipped ?
                    <PokemonCardBack setIsFlipped={setIsFlipped} isFlipped={isFlipped} revealPoke={revealPoke}/>
                : 
                    <PokeCard current={current} pokemonNames={pokemonNames} verifyClick={verifyClick} revealPoke={revealPoke}/>
                }
                </ReactCardFlip>
            {!isFlipped && revealPoke &&
            <Button text={"next"} onClick={() => getNewCard()} className={"next-poke-btn"}/>}
        </div>
    )
}