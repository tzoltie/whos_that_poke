import Logo from "./logo";
import Pokeball from "./pokeball";

export default function PokemonCardBack() {

    return (
        <div className="pokemon-card-back">
                <div className="pokemon-card-inner-back">
                    <Logo className={"pokemon-logo"} />
                    <Pokeball />
                    <Logo className={"pokemon-logo-upside-down"}/>
                </div>
            </div>
    )
}