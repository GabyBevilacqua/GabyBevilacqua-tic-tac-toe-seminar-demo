import { useState, useRef, useEffect } from "react";
import "./App.css";

import { GamePiece } from "./GamePiece";

import x_svg from "./assets/x.svg";
import o_svg from "./assets/o.svg";

const backgrounds = {
  x: {backgroundImage: `url(${x_svg})`},
  o: {backgroundImage: `url(${o_svg})`},
}

const lines = [
  //filas
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //diagonales
  [0, 4, 8],
  [6, 4, 2],
  //columnas
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

function App() {
  const [xWins, setXWins] = useState(0);
  const [ties, setTies] = useState(0);
  const [oWins, setOWins] = useState(0);

  const isDone = useRef(false);
  const [currentPlayer, setCurrentPlayer] = useState("x");
  const [gameState, setGameState] = useState([
    null, null, null,
    null, null, null,
    null, null, null,
  ]);

  const handleClick =(idx) => {
    if (isDone.current) {
      setGameState([
        null, null, null,
        null, null, null,
        null, null, null,
      ]);
      isDone.current = false;
      return;
    }
    if (gameState[idx] !==null){
      return;
    }

    setGameState(gameState.toSpliced(idx, 1, currentPlayer));
    setCurrentPlayer(currentPlayer === "x" ? "o" : "x");
  }

  //chequea si alguien ha ganado el juego o si es empate.

  useEffect(() => {
    for (let line of lines) {
      if (line.every(idx => gameState[idx] === "x")) {
        isDone.current = true;
        setXWins(xWins + 1);
        return;
      } else if (line.every(idx => gameState[idx] === "o")) {
        isDone.current = true;
        setOWins(oWins + 1);
      }
    }
    if (gameState.every(cell => cell !== null)) {
      isDone.current = true;
      setTies(ties + 1);
    }
  }, [gameState]);

  return (
    <>
      <div className="container d-flex flex-column align-items-center mt-3">
        <h1>
        <i className="fas fa-times"></i> wins: <code>{xWins}</code> .|. 
        <i className="far fa-circle"></i> wins: <code>{oWins}</code> .|. 
          Ties:   <code>{ties}</code>
        </h1>
        <div className="game-board mt-3">
          {gameState.map((player, idx) => <GamePiece 
          key={idx}
          player={player} 
          style={backgrounds[player]}
          onClick={() => handleClick(idx)}
          />)}
        </div>
      </div>
    </>
  );
}

export default App;
