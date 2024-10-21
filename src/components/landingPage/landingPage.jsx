import { useEffect } from "react";
import { getPokemon } from "../../utils/apiClient";
import Button from "../button";
import PokemonCardBack from "../cardBack/pokemonCardBack";

export default function LandingPage({setPokemon, pokemon, setPlay}) {

    useEffect(() => {
        getPokemon().then(setPokemon)
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