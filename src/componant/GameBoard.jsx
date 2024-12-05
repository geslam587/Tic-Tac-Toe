
// const initialGameBord = [
//     [null,null,null],
//     [null,null,null],
//     [null,null,null]
// ]
function GameBoard({onSelectSquare , board }) {

  // let gameBoard = initialGameBord;
  // for ( const turn of turns ){
  //   const {square , player }= turn ;
  //   const {row , col }= square;
  //   // console.log(turns);
  //   // console.log(square);

  //   gameBoard[row][col]= player;

  //   }


   // const[ gameBoard , setGameBoard ]=useState(initialGameBord)
  // function handleSelectSquare (rowIndex, colIndex){
    
  //   // setGameBoard ((prevGameBoard)=>{
  //   //   console.log(prevGameBoard);
  //   //   prevGameBoard[rowIndex][colIndex] = 'X'
  //   //   return [...prevGameBoard];
  //   // });
  //   setGameBoard ((prevGameBoard)=>{

  //     const updatedBoard = [...prevGameBoard.map(innerArry=>[...innerArry])];
  //     updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //     return updatedBoard;
  //   });

  //   onSelectSquare();
  // }

  return (
    <ol id='game-board'>
      {board.map((row ,rowIndex)=>(
      <li key={rowIndex}>
        <ol>
            {row.map((playerSymbol, colIndex)=>(
                <li key={colIndex}>
                    <button onClick={()=>onSelectSquare(rowIndex,colIndex)} disabled={playerSymbol !== null}>
                      {playerSymbol}
                    </button>
                </li>
            ))}
        </ol>
      </li>))}
    </ol>
  )
}

export default GameBoard
