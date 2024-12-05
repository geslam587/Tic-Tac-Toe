import { useState } from "react"

import Player from "./componant/player.jsx"
import GameBoard from "./componant/GameBoard.jsx"
import Log from "./componant/Log.jsx"
import {WINNING_COMBINATIONS} from './winning-combinations.js'
import GameOver from "./componant/GameOver.jsx"

const PLAYERS = {
  X: 'palyer 1',
  O: 'player 2'
}

const initialGameBord = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
]


function deriveActivePlayer(gameTurns) {
  
  let currentPlayer = 'X';
      
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }
  return currentPlayer
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...initialGameBord.map(array => [...array])];
  for ( const turn of gameTurns ){
    const {square , player }= turn ;
    const {row , col }= square;
    // console.log(turns);
    // console.log(square);

    gameBoard[row][col]= player;
  }
  return gameBoard
}

function derivWinner(gameBoard , players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const  firstSquareSymbol =
        gameBoard[combination[0].row][combination[0].column]
    const  secondSquareSymbol= 
        gameBoard[combination[1].row][combination[1].column]
    const  thirdSquareSymbol= 
        gameBoard[combination[2].row][combination[2].column]

    if(
      firstSquareSymbol &&
       firstSquareSymbol === secondSquareSymbol &&
       firstSquareSymbol === thirdSquareSymbol
      ){
        winner = players[firstSquareSymbol];
      }
  }
  return winner;
}


function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns , setGameTurns ]=useState([])
  // const [hasWinner , setHasWInner ]=useState(false)
  // const [activePlayer, setActivePlayer]= useState('X')
  const activePlayer = deriveActivePlayer(gameTurns)

const gameBoard = deriveGameBoard(gameTurns);
const winner = derivWinner(gameBoard, players);
const hasDraw = gameTurns.length === 9 && !winner
  function handleSelectSquare(rowIndex, colIndex,e) {

    // console.log(gameTurns);
    // setActivePlayer((curAvtivePlayer) => curAvtivePlayer=== 'X' ? 'O' : 'X') ;  


    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns)

      const updatedTurns = [
        {square : {row: rowIndex , col : colIndex}, player : currentPlayer },
        ...prevTurns,
        
      ];
        return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return{
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            initialName={PLAYERS.X} 
            symbol= "X" 
            isActive = {activePlayer ==='X'}
            onChangeName= {handlePlayerNameChange}
          />
          <Player 
            initialName={PLAYERS.O} 
            symbol= "O" 
            isActive = {activePlayer ==='O'}
            onChangeName= {handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare = {handleSelectSquare}
          board = {gameBoard}
        />
        
      </div>
      <Log turns={gameTurns}/>
    </main>
);

}

export default App