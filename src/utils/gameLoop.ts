import type { Business, GameState } from "../types/game";
import { calcBonus, getBusinessProduction } from "./production";

export function advanceProduction(state: GameState, catalog: Business[], elapsedSeconds: number,): GameState {
    if (!Number.isFinite(elapsedSeconds) || elapsedSeconds <= 0)
        return state
    let moneyEarned = 0
    const updatedBusinesses = { ...state.businesses }

    for (const business of catalog) {
        const ownedBusiness = state.businesses[business.id]

        if (!ownedBusiness || ownedBusiness.amt <= 0)
            continue

        const production = getBusinessProduction(business, ownedBusiness)
        const cycleTime = production.cycleTimeSeconds

        if (!Number.isFinite(cycleTime) || cycleTime <= 0)
            continue

        const totalProgress = Math.max(0, ownedBusiness.cycleProgressSeconds ?? 0) + elapsedSeconds
        const completedCycles = Math.floor(totalProgress / cycleTime)

        updatedBusinesses[business.id] = { ...ownedBusiness, cycleProgressSeconds: totalProgress - completedCycles * cycleTime, }

        for (let cycle = 0; cycle < completedCycles; cycle++) {
            for (let copy = 0; copy < ownedBusiness.amt; copy++) {
                moneyEarned += calcBonus(
                    production.revenuePerCycle,
                    production.upgrades
                )
            }
        }
    }

    return {
        ...state,
        money: state.money + moneyEarned,
        businesses: updatedBusinesses
    }
}