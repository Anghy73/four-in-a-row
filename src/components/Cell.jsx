import Slot from './Slot'

function Cell ({ children, updateBoard, columnContent, x, y }) {
  const handleClick = () => {
    updateBoard(x, y, columnContent)
  }
  return (
    <div className='cell' onClick={handleClick} x={x} y={y}>
      {columnContent}
      <Slot columnContent={columnContent} />
    </div>
  )
}

export default Cell
