import { useEffect, useState } from "react"
import { getPokemonById, sendAnswerToAPI } from "../../utils/apiClient.js"
import "./styling.css"
import Button from "../button/index.jsx"
import PokeCard from "../pokeCard/index.jsx"
import PokemonCardBack from "../cardBack/pokemonCardBack.jsx"
import ReactCardFlip from "react-card-flip"
import ThumbsUp from "../assets/thumbsUp.jsx"
import ThumbsDown from "../assets/thumbsDown.jsx"
import Confetti from "../assets/confetti.jsx"


export default function GameUI() {
    const [current, setCurrent] = useState({ status: "pending"})
    const [found, setFound] = useState(false)
    const [revealPoke, setRevealPoke] = useState(false)
    const [score, setScore] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)
    const [isIncorrect, setIsIncorrect] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    })
    const [guessed, setGuessed] = useState([])
    const [gameComplete, setGameComplete] = useState(false)
    const [pokeCards, setPokeCards] = useState([])

    useEffect(() => {
        setIsCorrect(false)
        setIsIncorrect(false)
        newPokemon()
    }, [found])

    const idGenerator = () => {
        const id = Math.floor(Math.random() * (50 - 1 + 1) + 1)
        return checkIfGuessed(id)
    }

    const checkIfGuessed = (id) => {
        const alreadyGuessed = guessed.find((usedId) => usedId === id)
        if(alreadyGuessed) {
            return idGenerator()
        }
        if(guessed.length === 25) {
            setRevealPoke(!revealPoke)
            return setGameComplete(true)
        }
        setGuessed([...guessed, id])
        return id
    }

    const newPokemon = () => {
        const randomId = idGenerator()
        return getPokemonById(randomId).then(setCurrent)
    }

    const sendAnswer = (choice) => {
        sendAnswerToAPI(choice.name, current.data.pokemon.id)
        .then((updatedData) => {
            setCurrent(updatedData)
            setPokeCards([...pokeCards, updatedData])
            return updatedData
        })
        .then((updatedData) => {
            if(updatedData.data.apiResults === "correct!") {
                setScore(score + 1)
                setIsCorrect(true)
                setShowConfetti(true)
            } else {
                setIsIncorrect(true)
            }
            setRevealPoke(!revealPoke)
            setIsFlipped(prev => !prev)
            setTimeout(() => {
                setIsCorrect(false)
                setIsIncorrect(false)
                setIsFlipped(prev => !prev)
                const pokemonImage = document.getElementsByClassName("pokemon-image")[0]
                pokemonImage.style.filter = "none"
            }, 1000)
        })
    }

    const getNewCard = () => {
        setIsFlipped(!isFlipped)
        setFound(prev => !prev)
        setRevealPoke(prev => !prev)
        setCurrent({ status: "pending" })
        setShowConfetti(false)
        setTimeout(() => {
            setIsFlipped(prev => !prev)
        }, 500)
        const pokemonImage = document.getElementsByClassName("pokemon-image")[0]
        pokemonImage.style.filter = "invert(100%)"
        pokemonImage.style.filter = "contrast(0%)"
    }

    const handleWindowSize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    useEffect(() => {
        window.onresize = () => {
            handleWindowSize
        }
    }, [showConfetti])

    return (
        <div className="game-interface">
            {gameComplete ?
            <div className="game-complete-box">
                <div className="complete-message-box">
                    <h2>Congratulations, you&apos;ve completed the game!</h2>
                    <h3>Your score was: {score}</h3>
                </div>
                <div className="all-card-box">
                    {pokeCards.map((p) => 
                    <PokeCard current={p.data} revealPoke={revealPoke}/>)
                    }
                </div>
            </div>
            :
            <>
            <div className="game-ui-box">
                <h2 className="game-ui-title">Guess the pokemon</h2>
                <p>Use the outline of the image to guess the correct Pokemon.</p>
                <h3>Score: {score}</h3>
            </div>
            {isCorrect &&
            <>
                <ThumbsUp />
            </>
            }
            {showConfetti &&
                <Confetti width={windowSize.width} height={windowSize.height}/>
            }
            {isIncorrect &&
            <>
                <ThumbsDown />
                <h2 className="answer-message">Unlucky, not this time</h2>
            </> 
            }
            {current.status === "success" &&
                <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                    <PokeCard current={current.data} pokemonNames={current.data.names} verifyClick={sendAnswer} revealPoke={revealPoke}/>
                    {isFlipped ?
                    <PokemonCardBack setIsFlipped={setIsFlipped} isFlipped={isFlipped} revealPoke={revealPoke}/>
                : 
                    <PokeCard current={current.data} pokemonNames={current.data.names} verifyClick={sendAnswer} revealPoke={revealPoke}/>
                }
                </ReactCardFlip>}
            {!isFlipped && revealPoke &&
            <Button text={"next"} onClick={() => getNewCard()} className={"next-poke-btn"}/>}
            </>
        }
        </div>
    )
}