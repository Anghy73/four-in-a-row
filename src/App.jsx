import Board from './components/Board'
// import Cell from './components/Cell'
import { useState } from 'react'

function App () {
  const [board, setBoard] = useState(
    [
      ['a', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', 'a', 'a', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', 'a', '', 'a', '']
    ]
  )

  const [turn, setTurn] = useState('X')

  const updateBoard = (row, column) => {
    const newBoard = [...board]
    if (newBoard[row][column] !== '') return
    newBoard[row][column] = turn
    setBoard(newBoard)
    // setBoard(prev => {
    //   const newBoard = [...prev]
    //   newBoard[row][column] = turn
    //   return newBoard
    // })

    setTurn((turn === 'X') ? 'O' : 'X')

    // return null
  }

  return (
    <main className='game'>
      <h1>4 in Raya</h1>
      <section className='board'>
        <Board board={board} updateBoard={updateBoard} />
      </section>
    </main>
  )
}

export default App
