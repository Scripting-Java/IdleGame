import type { Business, OwnedBusiness } from "../types/game";
import { formatCost, formatQuants } from "../utils/formatters";

interface BusinessCard {
    business: Business,
    owned: OwnedBusiness | undefined,
    logo: string,
    unlocked: boolean,
    canUnlock: boolean,
    cost: number,
    maxAfford: number,
    onUnlock: () => void,
    onPurchase: () => void,
    onMaxPurchase: () => void,
    onUpgrade: (upID: string) => void,
    onMaxUp: (upId: string) => void,
    getUpInfo: (upID: string) => { lvl: number, cost: number, maxed: boolean, maxAfford: number }
}
function BusinessCard({ business, owned, logo, unlocked, canUnlock, cost, maxAfford, onUnlock, onPurchase, onMaxPurchase, onUpgrade, onMaxUp, getUpInfo }: BusinessCard) {
    const amountOwned = owned?.amt ?? 0
    return (
        <div className={`busCard type-${business.category.toLocaleLowerCase()}`}>
            <img src={logo} className="businessLogos" />
            <h3>{business.name}</h3>
            <div className="busInfo">
                <p>{business.description}</p>
                <p>Tier: {business.category.substring(0, 1).toLocaleUpperCase() + business.category.substring(1, business.category.length)}</p>
                <p>Owned: {formatQuants(amountOwned)}</p>
                <p>Cost: {formatCost(cost)}</p>
                {!unlocked && (
                    <>
                        <p>Unlock Cost: {formatCost(business.unlockCost)}</p>
                        <button onClick={onUnlock} hidden={!canUnlock}>Unlock {business.name}</button>
                    </>
                )}
                {unlocked && (
                    <>
                        <button onClick={onPurchase}>Buy</button>
                        {maxAfford >= 2 && (
                            <button onClick={onMaxPurchase}>Buy Max: ({maxAfford})</button>
                        )}
                    </>
                )}
                {unlocked && amountOwned > 0 && (
                    <details>
                        <summary>Upgrades</summary>
                        {business.upgrades.map(upgrade => {
                            const info = getUpInfo(upgrade.id)

                            return (
                                <details key={upgrade.id} className="upCard">
                                    <summary>{upgrade.name}</summary>
                                    <p>{upgrade.description}</p>
                                    <p>Level: {info.lvl} / {upgrade.maxLevel}</p>
                                    <p>Cost: {formatCost(info.cost)}</p>
                                    <button disabled={info.maxed} onClick={() => onUpgrade(upgrade.id)}>
                                        {info.maxed ? 'Already At Max Level' : 'Buy Upgrade'}
                                    </button>
                                    {info.maxAfford >= 2 && (
                                        <button onClick={() => onMaxUp(upgrade.id)}>Buy Max: ({info.maxAfford})</button>
                                    )}
                                </details>
                            )
                        })}
                    </details>
                )}
            </div>
        </div>
    )
}
export default BusinessCard