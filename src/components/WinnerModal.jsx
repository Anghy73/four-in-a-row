function WinnerModal ({ winner, resetGame }) {
  if (winner === null) return

  const winnerText = winner === false ? 'Empate' : 'Ganó'

  return (
    <div className='winner-modal'>
      <h1>
        {winnerText}
      </h1>
      <h2>{winner}</h2>
      <button onClick={resetGame}>Again</button>
    </div>
  )
}

export default WinnerModal
