import { useEffect, useState } from "react";
import { getPokemon } from "../../utils/apiClient";
import Button from "../button";

export default function PokeCard({current, pokemonNames, verifyClick, revealPoke}) {
  const [abilites, setAbilities] = useState({ pending: ""})
  const [abilitesDesc, setAbilitiesDesc] = useState("")

  useEffect(() => {
    if(revealPoke) {
      getPokemon(current?.abilities[0].ability.url).then((pokeAbilities) => {
        setAbilities(pokeAbilities)
      })
    }
  }, [revealPoke])

  useEffect(() => {
    getEnglishAbilities()
  }, [abilites])
  
  const getEnglishAbilities = () => {
    if(typeof abilites.pending === "undefined") {
      const ability = abilites.effect_entries
      if(Array.isArray(ability)) {
        const abilityEng = ability.find((ability) => ability.language.name === "en")
        return setAbilitiesDesc(abilityEng.short_effect)
      }
    }
    
    return;
  }

  return (
    <div className="pokemon-card">
      <div className="pokemon-card-inner">
        <div className="pokemon-name">
            {revealPoke ?
          <>
            <div className="pokemon-name-box">
            <h3>{current.name}</h3> 
          </div>
          <div className="pokemon-hp-box">
            <h3>{current.stats[0].base_stat} HP</h3>
          </div>
          </>
          : (
            <>
            <div className="pokemon-name-box">
              <h3>???</h3>
            </div>
            <div className="pokemon-hp-box">
              <h3>HP</h3>
            </div>
            </>
            
          )}
        </div>
        <div className="pokemon-image-box">
          <img
            alt="pokemon image"
            className="pokemon-image"
            src={current.sprites?.front_default}
          />
        </div>
        {!revealPoke ?
        <div className="btn-container">
          {pokemonNames.map((pokemon, index) => (
            <Button
              text={pokemon.name}
              key={index}
              onClick={() => verifyClick(pokemon)}
            />
          ))}
        </div> : 
        <div className="abilities-box">
          <div className="attack-header">
            <h3>{abilites.name}</h3>
          </div>
          <div>
              <p>{abilitesDesc}</p>
          </div>
        </div>}
      </div>
    </div>
  );
}
