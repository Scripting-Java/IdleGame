import { useState, useEffect } from 'react'
import './App.css'
import { businesses } from './data/businesses'
import { advanceProduction } from './utils/gameLoop'
import { createInitialState } from './utils/initialState'
import { purchaseBusiness, getBusinessCost, getMaxAffordableAmount } from './utils/purchases'


function App() {

  const [game, setGame] = useState(createInitialState)
  const handlePurchase = (business: typeof businesses[number]) => {
    setGame(previousGame => purchaseBusiness(previousGame, business))
  }
  const handleUnlock = (business: typeof businesses[number]) => {
    setGame(previousGame => {
      if (previousGame.unlockedBusinesses.includes(business.id))
        return previousGame

      return {
        ...previousGame, unlockedBusinesses: [...previousGame.unlockedBusinesses, business.id]
      }
    }
    )
  }
  useEffect(() => {
    let previousTime = performance.now()

    const timer = window.setInterval(() => {
      const currentTime = performance.now()
      const elapsedSeconds = (currentTime - previousTime) / 1000

      previousTime = currentTime
      setGame(previousGame => advanceProduction(previousGame, businesses, elapsedSeconds))
    }, 250)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <section>
      <h1>Time Forge</h1>
      <p>Become the richest industrialist of all time.</p>
      <p>Money: ${game.money.toFixed(2)}</p>
      <h2>Businesses</h2>
      {businesses.map(business => {
        const owned = game.businesses[business.id]
        const cost = getBusinessCost(business.baseCost, owned?.amt ?? 0, business.category)
        console.log(business.name, {
          baseCost: business.baseCost,
          ownedAmount: owned?.amt ?? 0,
          tier: business.category,
          cost
        })
        const unlocked = game.unlockedBusinesses.includes(business.id)
        const maxAffordable = getMaxAffordableAmount(game.money, owned?.amt ?? 0, business.category, business)

        return (
          <div key={business.id}>
            <h3>{business.name}</h3>
            <p>{business.description}</p>
            <p>Owned: {owned?.amt ?? 0}</p>
            <p>Cost: ${cost.toFixed(2)}</p>
            <p>{!unlocked && `Unlock Cost: $${business.unlockCost}`}</p>

            {!unlocked && game.money >= business.unlockCost && (
              <button onClick={() => handleUnlock(business)}>
                Unlock {business.name}
              </button>
            )}

            {unlocked && (
              <button
                onClick={() => handlePurchase(business)}
                disabled={game.money < cost}
              >
                Buy
              </button>
            )}
            <button
              onClick={() => {
                setGame(previousGame => {
                  const quantity = getMaxAffordableAmount(
                    previousGame.money,
                    previousGame.businesses[business.id]?.amt ?? 0,
                    business.category,
                    business
                  )

                  let nextGame = previousGame

                  for (let i = 0; i < quantity; i++) {
                    nextGame = purchaseBusiness(nextGame, business)
                  }

                  return nextGame
                })
              }}
              disabled={!unlocked || maxAffordable === 0}
            >
              Buy Max ({maxAffordable})
            </button>
          </div>
        )
      })}
    </section>
  )
}

export default App
