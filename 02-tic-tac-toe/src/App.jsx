import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square"
import Board from "./components/Board"
import { Turn } from "./components/Turn"
import { Winner } from "./components/Winner"
import { TURNS } from "./constants"
import { checkWinner, checkEndGame } from "./logic/board"

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState( () => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X? TURNS.O : TURNS.X
    setTurn(newTurn)
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    const newWinner = checkWinner(newBoard)
    // se usa newBoard porque el useState es asincrono. 
    //quedaría el valor viejo del tablero para el check winner.
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  } 

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  return (
    <main className="board">
    <h1>Tic Tac Toe</h1>
    <button onClick={resetGame}>Resetear el juego</button>
    <Board 
    board={board}
    updateBoard={updateBoard}/>
    <Turn turn={turn}/>
    <Winner winner={winner}
    resetGame={resetGame}/>
    </main>
  )
}

export default App
