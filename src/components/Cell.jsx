function Cell ({ children, updateBoard, columnContent, x, y }) {
  const handleClick = () => {
    updateBoard(x, y)
  }
  return (
    <div className='cell' onClick={handleClick} x={x} y={y}>
      {columnContent}
    </div>
  )
}

export default Cell
