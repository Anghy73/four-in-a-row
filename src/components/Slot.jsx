function Slot ({ isOponent, columnContent }) {
  let classNameSlot = ''
  if (columnContent === '') {
    classNameSlot = 'empty'
  }
  if (columnContent === 'X') {
    classNameSlot = 'slot playerOne'
  }
  if (columnContent === 'O') {
    classNameSlot = 'slot playerTwo'
  }

  {
    return (
      <div className={classNameSlot} />
    )
  }
}

export default Slot
