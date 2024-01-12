import { useState } from 'react'

function PlayPage () {
  const [activePage, setActivePage] = useState(true)

  const classNamePlay = `playPage ${activePage ? 'active' : ''}
    `

  const [colorOne, setColorOne] = useState('#ff2f89')
  const [colorTwo, setColorTwo] = useState('#00ff77')

  const changeColor = (elem) => {
    const input = elem.target.id
    const newColor = elem.target.value

    if (input === 'colorOne') {
      document.documentElement.style.setProperty('--player-one', colorOne)
      setColorOne(newColor)
    }

    if (input === 'colorTwo') {
      document.documentElement.style.setProperty('--player-two', colorTwo)
      setColorTwo(newColor)
    }
  }

  const handleClassPlay = () => {
    setActivePage(!activePage)
    console.log(activePage)
  }

  return (
    <div className={classNamePlay}>
      <h2>Custom Your Players</h2>
      <section className='players'>
        <div className='playerContent'>
          <div className='player playerOne'>
            <input id='colorOne' type='color' value={colorOne} onChange={changeColor} />
          </div>
          <span>Player One</span>
        </div>
        <div className='playerContent'>
          <div className='player playerTwo'>
            <input id='colorTwo' type='color' value={colorTwo} onChange={changeColor} />
          </div>
          <span>Player Two</span>
        </div>
      </section>
      <button className='playButton' onClick={handleClassPlay}>Play</button>
    </div>
  )
}

export default PlayPage
