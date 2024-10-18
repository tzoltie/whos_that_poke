import { useEffect } from "react";
import { getPokemon } from "../../utils/apiClient";
import Button from "../button";

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
                {/* <img src={pokemon?.results[0].url}/> */}
                <Button text={"Play!"} className={"start-game-btn"} onClick={() => onClick()}/>
            </main>
            
        </div>
    )
}