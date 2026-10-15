import type { Business, GameState, BusinessCategory } from "../types/game";

export function getTierScaling(tier: BusinessCategory): number {
    if (tier === "farms")
        return 1
    if (tier === "workshops")
        return 1.05
    if (tier === "industry")
        return 1.1
    if (tier === "factories")
        return 1.2
    return 1
}
export function getCostScaling(businessAmt: number): number {
    if (businessAmt <= 10)
        return businessAmt / 4
    if (businessAmt > 10 && businessAmt <= 25)
        return Math.min(businessAmt / 3, 8)
    if (businessAmt > 25 && businessAmt <= 50)
        return Math.max(Math.min(12, businessAmt / 4), 8)
    if (businessAmt > 50 && businessAmt <= 100)
        return Math.max(Math.min(businessAmt / 5, 18), 12)
    return 24
}

export function getBusinessCost(baseCost: number, ownedAmount: number, tier: BusinessCategory): number {
    const rawCost = baseCost * (getCostScaling(ownedAmount) + 1) * getTierScaling(tier)
    return Math.ceil(rawCost - Number.EPSILON*rawCost)
}

export function purchaseBusiness(state: GameState, business: Business): GameState {
    const ownedBusiness = state.businesses[business.id]

    const cost = getBusinessCost(business.baseCost, ownedBusiness?.amt ?? 0, business.category)
    if (!state.unlockedBusinesses.includes(business.id)) return state
    if (state.money < cost) return state
    return {
        ...state, money: state.money - cost, businesses: {
            ...state.businesses, [business.id]: ownedBusiness
                ? { ...ownedBusiness, amt: ownedBusiness.amt + 1 } : {
                    businessId: business.id,
                    amt: 1,
                    upgradeLevels: {},
                    cycleProgressSeconds: 0
                }
        }
    }
}

export function getBulkBusinessCost(ownedAmount: number, quantity: number, tier: BusinessCategory, business: Business): number {
    let totalCost: number = 0
    let ownedRightNow: number = ownedAmount
    for (let i: number = 1; i <= quantity; i++) {
        totalCost += getBusinessCost(business.baseCost, ownedRightNow, tier)
        ownedRightNow++
    }
    return totalCost
}

export function getMaxAffordableAmount(money: number, ownedAmount: number, tier: BusinessCategory, business: Business): number {
    let quantity = 0
    while (getBulkBusinessCost(ownedAmount, quantity + 1, tier, business) <= money)
        quantity++
    return quantity
}