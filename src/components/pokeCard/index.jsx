import Button from "../button";

export default function PokeCard({current, pokemonNames, verifyClick, revealPoke}) {

  return (
    <div className="pokemon-card">
      <div className="pokemon-card-inner">
        <div className="pokemon-name">
            {revealPoke ?
          <>
            <div className="pokemon-name-box">
            <h3>{current.pokemon.name}</h3> 
          </div>
          <div className="pokemon-hp-box">
            <h3>{current.pokemon.hp} HP</h3>
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
            src={current.pokemon.image}
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
          <div>
              <p>{current.pokemon.abilites[0].short_effect}</p>
          </div>
        </div>}
      </div>
    </div>
  );
}
