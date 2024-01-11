import Slot from './Slot'

function WinnerModal ({ winner, resetGame }) {
  if (winner === null) return

  const winnerText = winner === false ? 'Empate' : 'Ganó'

  return (
    <div className='winnerModal'>
      <section className='contentWin'>
        <h1>
          {winnerText}
        </h1>
        <section className='cellWin'>
          <Slot columnContent={winner} />
        </section>
        <button className='resetGame' onClick={resetGame}>Again</button>
      </section>
    </div>
  )
}

export default WinnerModal
