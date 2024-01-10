import Cell from './Cell'

function Board ({ board, updateBoard }) {
  return (
    <>
      {
        board.map((row, i) => {
          return row.map((column, j) => <Cell key={j} updateBoard={updateBoard} columnContent={column} x={i} y={j} />)
        })
      }
    </>
  )
}

export default Board
