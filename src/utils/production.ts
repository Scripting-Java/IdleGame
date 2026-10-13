import type { Upgrade } from "../types/game";

export function calcBonus(revenue: number, upgrades: Upgrade[]): number {
    const bonusUpgrades = upgrades.filter(upgrade => upgrade.type === 'bonus-chance')
    let bonusChance = 0
    let bonusMult = 1.5
    for (const upgrade of bonusUpgrades) {
        bonusChance += upgrade.bonusChance ?? 0
        bonusMult = Math.max(bonusMult, upgrade.bonusMult ?? 1)
    }

    bonusChance = Math.min(bonusChance, 1)

    return Math.random() < bonusChance
        ? revenue * bonusMult
        : revenue
}

export function calcIncomePerSecond(cycleTimeSeconds: number, revPerCycle: number, prodMult: number = 1, cycleTimeMult: number = 1): number {
    const actualCycleTime = cycleTimeSeconds * cycleTimeMult
    const actualRevenue = revPerCycle * prodMult

    if (actualCycleTime <= 0) return 0

    return actualRevenue / actualCycleTime
}
