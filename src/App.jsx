import { useState } from 'react'
import confetti from 'canvas-confetti'

export const App = () => {
  const TURN = {
    x: '❌',
    o: '⭕️',
  }
  const WINNERS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  const initialBoard = Array(9).fill('')
  const [turn, setTurn] = useState(TURN.x)
  const [board, setBoard] = useState(initialBoard)
  const [winner, setWinner] = useState(null)
  const checkWinner = (newBoard) => {
    for (const winner of WINNERS) {
      const [a, b, c] = winner
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
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
      <h1>Tic tac toe</h1>
      <div className="board">
        <div className="game">
          {board.map((e, i) => (
            <div key={i} className="square" onClick={() => updateBoard(i)}>
              {e}
            </div>
          ))}
        </div>
      </div>
      <h1>Winner : {winner}</h1>
      <button onClick={restartGame}>Restart Game</button>
    </>
  )
}
