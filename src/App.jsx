import confetti from 'canvas-confetti'
import { useState } from 'react'
import { Square } from './components/Square'
import { TURN, WINNERS } from './const/const'

export const App = () => {
  const initialBoard = Array(9).fill('')
  const [turn, setTurn] = useState(TURN.x)
  const [board, setBoard] = useState(initialBoard)
  const [winner, setWinner] = useState(null)
  const checkWinner = (newBoard) => {
    for (const winner of WINNERS) {
      const [a, b, c] = winner
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        setWinner(newBoard[a])
        confetti()
      }
    }
  }
  const updateBoard = (index) => {
    if (board[index] !== '' || winner) return
    setTurn(turn === TURN.x ? TURN.o : TURN.x)
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    checkWinner(newBoard)
  }
  const restartGame = () => {
    setBoard(initialBoard)
    setWinner(null)
    setTurn(TURN.x)
  }
  return (
    <>
      <h1 className='pt-10'>Tic tac toe</h1>
      <div className="board">
        <div className="game">
          {
            board.map((e, i) => (
              <Square key={i} updateBoard={updateBoard} i={i}>
                {e}
              </Square>
            ))
          }
        </div>
      </div>
      <h1>Winner : {winner}</h1>
      <button onClick={restartGame}>Restart Game</button>
    </>
  )
}
