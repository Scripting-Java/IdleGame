
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
import horseFarmLogo from "./assets/Logos/HorseFarm.png"
import lettuceFarmLogo from "./assets/Logos/LettuceFarmLogo.png"
import milkFarmLogo from "./assets/Logos/MilkFarm.png"
import mineLogo from "./assets/Logos/Mine.png"
import restaurantLogo from "./assets/Logos/Restaurant.png"
import robotFactoryLogo from "./assets/Logos/RoboticsFactory.png"
import clockMakerLogo from "./assets/Logos/Watchmaker.png"
import wheatFarmLogo from "./assets/Logos/WheatFarm.png"
import lumberMillLogo from "./assets/Logos/LumberMill.png"
import TopMenuBar from './components/TopMenuBar'
import { getIncomePerSec } from './utils/income'
import BusinessCard from './components/BusinessCard'

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
  const incPerSec = getIncomePerSec(game,businesses)
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
    "wheat-farm": wheatFarmLogo,
    "lumber-mill": lumberMillLogo 
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
      <TopMenuBar money={game.money} incomePerSec={incPerSec}></TopMenuBar>
      <h2>Businesses</h2>
      {businesses.map(business => {
        const owned = game.businesses[business.id]
        const cost = getBusinessCost(business.baseCost, owned?.amt ?? 0, business.category)
        const unlocked = game.unlockedBusinesses.includes(business.id)
        const maxAffordable = getMaxAffordableAmount(game.money, owned?.amt ?? 0, business.category, business)

        return(
          <BusinessCard
          key={business.id}
          business={business}
          owned={owned}
          logo={businessLogs[business.id]}
          unlocked={unlocked}
          cost={cost}
          maxAfford={unlocked? maxAffordable:0}
          onUnlock={()=>handleUnlock(business)}
          onPurchase={()=>handlePurchase(business)}
          onMaxPurchase={()=> {
            setGame(prev => {
              const quant = getMaxAffordableAmount(prev.money, prev.businesses[business.id]?.amt ?? 0, business.category, business)
              let next=prev
              for(let i =0; i<quant;i++){
                next=purchaseBusiness(next,business)
              }
              return next
            })
          }
        )
      })}
    </section>
  )
}

export default App
