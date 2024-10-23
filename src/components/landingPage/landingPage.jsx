import { useEffect } from "react";
import { getPokemon } from "../../utils/apiClient";
import Button from "../button";
import PokemonCardBack from "../cardBack/pokemonCardBack";
import "./styling.css"

export default function LandingPage({setPokemon, setPlay}) {

    useEffect(() => {
        getPokemon("pokemon/").then(setPokemon)
    }, [])

    const onClick = () => {
        setPlay(true)
    }

    return (
        <div className="landing-page">
            <main>
                <Button text={<PokemonCardBack />} className={"start-game-btn"} onClick={() => onClick()}/>
            </main>
            
        </div>
    )
}