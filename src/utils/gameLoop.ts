import type { Business, GameState } from "../types/game";
import { getBusinessProduction } from "./production";

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

        const hasBonus = production.hasBonus
        const prod = completedCycles * ownedBusiness.amt
        if (!hasBonus) moneyEarned += prod * production.revenuePerCycle
        else moneyEarned += prod * production.revenuePerCycle * production.expectedBonusMult
    }
    if (
        !Number.isFinite(moneyEarned) ||
        !Number.isFinite(state.money + moneyEarned)
    ) {
        console.error("Invalid production values", {
            money: state.money,
            moneyEarned,
            businesses: state.businesses,
        });
    }
    return {
        ...state,
        money: state.money + moneyEarned,
        businesses: updatedBusinesses
    }
}