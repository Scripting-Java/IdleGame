
import { useState, useEffect } from 'react'
import './App.css'
import { businesses } from './data/businesses'
import { advanceProduction } from './utils/gameLoop'
import { createInitialState } from './utils/initialState'
import { formatCost, formatQuants } from './utils/formatters'
import { purchaseBusiness, getBusinessCost, getMaxAffordableAmount, getMaxUpgrades, getUpgradeCost, purchaseUpgrade } from './utils/purchases'
import bakeryLogo from "./assets/Logos/Bakery.png"
import carFactoryLogo from "./assets/Logos/CarFactory.png"
import electronicsFactoryLogo from "./assets/Logos/ElectronicsFactory.png"
import horseFarmLogo from "./assets/Logos/HorseFarm.svg"
import lettuceFarmLogo from "./assets/Logos/LettuceFarmLogo.svg"
import milkFarmLogo from "./assets/Logos/MilkFarm.png"
import mineLogo from "./assets/Logos/Mine.svg"
import restaurantLogo from "./assets/Logos/Restaurant.svg"
import robotFactoryLogo from "./assets/Logos/RoboticsFactory.png"
import clockMakerLogo from "./assets/Logos/Watchmaker.png"
import wheatFarmLogo from "./assets/Logos/WheatFarm.svg"

function App() {

  const [game, setGame] = useState(createInitialState)
  const handlePurchase = (business: typeof businesses[number]) => {
    setGame(previousGame => purchaseBusiness(previousGame, business))
  }
  const handleUnlock = (business: typeof businesses[number]) => {
    setGame(previousGame => {
      if (previousGame.unlockedBusinesses.includes(business.id))
        return previousGame
      if (previousGame.money < business.unlockCost)
        return previousGame
      return {
        ...previousGame,
        money: previousGame.money - business.unlockCost,
        unlockedBusinesses: [...previousGame.unlockedBusinesses, business.id]
      }
    }
    )
  }
  const businessLogs: Record<string, string> ={
    "bakery": bakeryLogo,
    "car-factory": carFactoryLogo,
    "electronics-factory": electronicsFactoryLogo,
    "horse-farm": horseFarmLogo,
    "lettuce-farm": lettuceFarmLogo,
    "milk-farm": milkFarmLogo,
    "mine": mineLogo,
    "restaurant": restaurantLogo,
    "robotics-laboratory": robotFactoryLogo,
    "clocksmith": clockMakerLogo,
    "wheat-farm": wheatFarmLogo
  }
  useEffect(() => {
    let previousTime = performance.now()

    const timer = window.setInterval(() => {
      const currentTime = performance.now()
      const elapsedSeconds = (currentTime - previousTime) / 1000

      previousTime = currentTime
      setGame(previousGame => advanceProduction(previousGame, businesses, elapsedSeconds))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <section>
      <h1>Time Forge</h1>
      <p>Become the richest industrialist of all time.</p>
      <p>Money: {formatCost(game.money)}</p>
      <h2>Businesses</h2>
      {businesses.map(business => {
        const owned = game.businesses[business.id]
        const cost = getBusinessCost(business.baseCost, owned?.amt ?? 0, business.category)
        const unlocked = game.unlockedBusinesses.includes(business.id)
        const maxAffordable = getMaxAffordableAmount(game.money, owned?.amt ?? 0, business.category, business)

        return (
          <div key={business.id}>
            <img src={businessLogs[business.id]} className='businessLogos'></img>
            <h3>{business.name}</h3>
            <p>{business.description}</p>
            <p>Owned: {formatQuants(owned?.amt ?? 0)}</p>
            <p>Cost: {formatCost(cost)}</p>
            <p>{!unlocked && `Unlock Cost: ${formatCost(business.unlockCost)}`}</p>

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
              disabled={!unlocked || maxAffordable === 0 || maxAffordable === 1}
              hidden={!unlocked || maxAffordable === 0 || maxAffordable === 1}

            >
              Buy Max ({maxAffordable})
            </button>

            {unlocked && owned && owned.amt > 0 && (
              <div>
                <h4>Upgrades</h4>
                {business.upgrades.map(upgrade => {
                  const level = owned.upgradeLevels[upgrade.id] ?? 0
                  const cost = getUpgradeCost(upgrade, business.category, level)
                  const maxed = upgrade.maxLevel !== undefined && level >= upgrade.maxLevel
                  const maxUpgrades = getMaxUpgrades(game.money, upgrade, business.category, level)

                  return (
                    <div key={upgrade.id}>
                      <h5>{upgrade.name}</h5>
                      <p>{upgrade.description}</p>
                      <p>Level: {level} {upgrade.maxLevel !== undefined && ` / ${upgrade.maxLevel}`}</p>
                      <p>Cost: {formatCost(cost)}</p>
                      <button disabled={maxed || game.money < cost} onClick={() => { setGame(prevGame => purchaseUpgrade(prevGame, business, upgrade.id)) }}>
                        {maxed ? 'Already At Max Level' : 'Buy Upgrade'}
                      </button>
                      <button disabled={maxUpgrades === 0 || maxUpgrades === 1}
                        hidden={maxUpgrades === 0 || maxUpgrades === 1}
                        onClick={() => {
                          setGame(prevGame => {
                            let game = prevGame 
                            for (let i = 0; i < maxUpgrades; i++) {
                              game = purchaseUpgrade(game, business, upgrade.id)
                            }
                            return game
                          }) 
                        }}>Buy Max ({maxUpgrades})</button>
                    </div>)
                })}
              </div>)}
          </div>)
      })}
    </section>
  )
}

export default App
