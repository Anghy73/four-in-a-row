import { useState } from 'react'
import Board from './components/Board'
import WinnerModal from './components/WinnerModal'
import Slot from './components/Slot'
import PlayPage from './components/PlayPage'

function App () {
  const [board, setBoard] = useState(
    [
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '']
    ]
  )

  const TURNS = {
    X: 'X',
    O: 'O'
  }

  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard([
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '']
    ])
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkLineHorizontal = (boardToCheck, row) => {
    let count = 0
    for (let i = 0; i < boardToCheck[row].length; i++) {
      if (boardToCheck[row][i] === turn && boardToCheck[row][i + 1] === turn && boardToCheck[row][i] === turn && boardToCheck[row][i + 2] === turn) {
        count += 1
      }
    }
    if (count >= 2) {
      return true
    }

    return false
  }

  const checkLineVertical = (boardToCheck, row, column) => {
    let count = 0

    try {
      for (let i = 0; i < boardToCheck[row].length; i++) {
        if (boardToCheck[i][column] === turn && boardToCheck[i + 1][column] === turn) {
          count += 1
        }
      }
    } catch (error) {
    }

    if (count >= 3) {
      return true
    }

    return false
  }

  const checkLineDiagonalNegative = (boardToCheck, row, column) => {
    let sum = 0
    let count = 0
    let initialNum = row - column

    if (initialNum === -1) {
      initialNum = 0
      sum = 1
    } else if (initialNum === -2) {
      initialNum = 0
      sum = 2
    } else {
      initialNum = 0
      sum = 3
    }

    try {
      for (let i = initialNum; i < boardToCheck[row].length; i++) {
        if (boardToCheck[i][sum] === turn && boardToCheck[i + 1][sum + 1] === turn) {
          count += 1
        }
        sum += 1
      }
    } catch (error) {
    }

    if (count >= 3) {
      return true
    }

    return false
  }

  const checkLineDiagonal = (boardToCheck, row, column) => {
    let sum = 0
    let count = 0
    const initialNum = row - column

    try {
      for (let i = initialNum; i < boardToCheck[row].length; i++) {
        if (boardToCheck[i][sum] === turn && boardToCheck[i + 1][sum + 1] === turn) {
          count += 1
        }
        sum += 1
      }
    } catch (error) {
    }

    if (count >= 3) {
      return true
    }

    return false
  }

  const checkLineReverseDiagonal = (boardToCheck, row, column) => {
    let count = 0
    const initialNum = row + column

    try {
      for (let i = 0; i < boardToCheck[row].length; i++) {
        if (boardToCheck[i][initialNum - i] === turn && boardToCheck[i + 1][initialNum - i - 1] === turn) {
          count += 1
        }
      }
    } catch (error) {
    }

    if (count >= 3) {
      return true
    }

    return false
  }

  const checkWinner = (boardToCheck, row, column) => {
    if (checkLineHorizontal(boardToCheck, row, column)) {
      setWinner(turn)
    }

    if (checkLineVertical(boardToCheck, row, column)) {
      setWinner(turn)
    }

    if (checkLineDiagonalNegative(boardToCheck, row, column)) {
      setWinner(turn)
    }
    if (checkLineDiagonal(boardToCheck, row, column)) {
      setWinner(turn)
    }
    if (checkLineReverseDiagonal(boardToCheck, row, column)) {
      setWinner(turn)
    }
  }

  const checkEndGame = (boardToCheck) => {
    let count = 0
    for (let i = 0; i < boardToCheck.length; i++) {
      if (boardToCheck[i].every((elem) => elem !== '')) {
        count += 1
      }
    }

    if (count >= 6) {
      return true
    }

    return false
  }

  const indexDown = (boardToCheck, column) => {
    let row = boardToCheck.findIndex((rowArr, index) => {
      // Find the first row that is occupied or at the bottom of the board
      return (rowArr[column] !== '' || (index === boardToCheck.length - 1))
    })
    // Only go up one row if the slot is NOT at the bottom
    if (row !== (boardToCheck.length - 1)) row -= 1
    if (boardToCheck[row][column] !== '') row -= 1

    boardToCheck[row][column] = turn
    setBoard(boardToCheck)
    checkWinner(boardToCheck, row, column)
  }

  const updateBoard = (row, column) => {
    const newBoard = [...board]
    if (newBoard[row][column] !== '') return
    indexDown(newBoard, column)

    if (checkEndGame(newBoard)) {
      setWinner(false)
    }

    setTurn((turn === TURNS.X) ? TURNS.O : TURNS.X)

    return null
  }

  return (
    <main className='game'>
      <PlayPage />
      <section className='currentTurn'>
        <span>Turn</span>
        <Slot columnContent={turn} />
      </section>
      <section className='board'>
        <Board board={board} updateBoard={updateBoard} />
      </section>
      <button className='resetGame' onClick={resetGame}>Reset Game </button>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
