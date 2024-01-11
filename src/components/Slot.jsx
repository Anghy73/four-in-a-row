function Slot ({ columnContent }) {
  let classNameSlot = ''

  switch (columnContent) {
    case '':
      classNameSlot = 'empty'
      break
    case 'X':
      classNameSlot = 'slot playerOne'
      break
    case 'O':
      classNameSlot = 'slot playerTwo'
      break
    default:
      break
  }

  return (
    <div className={classNameSlot} />
  )
}

export default Slot
