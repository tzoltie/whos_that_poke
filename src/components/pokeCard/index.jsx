import Button from "../button";

export default function PokeCard({current, pokemonNames, verifyClick, revealPoke}) {
  return (
    <div className="pokemon-card">
      <div className="pokemon-card-inner">
        <div className="pokemon-name">
            {revealPoke ?
          <h3>{current.name}</h3> : (
            <h3>???</h3>
          )}
        </div>
        <div className="pokemon-image-box">
          <img
            alt="pokemon image"
            className="pokemon-image"
            src={current.sprites?.front_default}
          />
        </div>
        {!revealPoke &&
        <div className="btn-container">
          {pokemonNames.map((pokemon, index) => (
            <Button
              text={pokemon.name}
              key={index}
              onClick={() => verifyClick(pokemon)}
            />
          ))}
        </div>}
      </div>
    </div>
  );
}
