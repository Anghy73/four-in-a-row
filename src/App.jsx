import Board from './components/Board'
import { useState } from 'react'
import WinnerModal from './components/WinnerModal'

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

  const [turn, setTurn] = useState('X')
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
    setTurn('X')
    setWinner(null)
  }

  const checkLineHorizontal = (boardToCheck, row, column) => {
    let count = 0
    for (let i = 0; i < boardToCheck[row].length; i++) {
      if (boardToCheck[row][i] === turn && boardToCheck[row][i + 1] === turn) {
        count += 1
      }
      // console.log(count)
      // console.log(boardToCheck[row][i])
    }
    if (count >= 3) {
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
        // console.log(count)
        // console.log(boardToCheck[i][column])
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
      console.log('si')
      initialNum = 0
      sum = 1
    } else if (initialNum === -2) {
      console.log('-2')
      initialNum = 0
      sum = 2
    } else {
      console.log('-3')
      initialNum = 0
      sum = 3
    }
    // console.log(row - column)
    // console.log(column)

    try {
      for (let i = initialNum; i < boardToCheck[row].length; i++) {
        if (boardToCheck[i][sum] === turn && boardToCheck[i + 1][sum + 1] === turn) {
          count += 1
        }
        console.log(i)
        console.log(boardToCheck[i][sum])
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
        // console.log(i)
        // console.log(boardToCheck[i][sum])
        sum += 1
      }
    } catch (error) {
    }

    if (count >= 3) {
      return true
    }

    return false
  }

  // const checkLineReverseDiagonal = (boardToCheck, row, column) => {
  //   let count = 0

  //   try {
  //     for (let i = 0; i < boardToCheck[row].length; i++) {
  //       if (boardToCheck[i][i] === turn && boardToCheck[i + 1][i + 1] === turn) {
  //         count += 1
  //       }
  //       // console.log(count)
  //       // console.log(boardToCheck[i][i])
  //     }
  //   } catch (error) {
  //   }

  //   if (count >= 3) {
  //     return true
  //   }

  //   return false
  // }

  const checkWinner = (boardToCheck, row, column) => {
    console.log(row, column)

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

  const updateBoard = (row, column, content) => {
    const newBoard = [...board]
    if (newBoard[row][column] !== '') return
    indexDown(newBoard, column)

    if (checkEndGame(newBoard)) {
      setWinner(false)
    }

    setTurn((turn === 'X') ? 'O' : 'X')

    return null
  }

  return (
    <main className='game'>
      <h1>4 in Raya</h1>
      <section className='board'>
        <Board board={board} updateBoard={updateBoard} />
      </section>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
