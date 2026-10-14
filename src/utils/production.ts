import type { Upgrade, Business, OwnedBusiness } from "../types/game";

export function getPurchasedUpgrades(business: Business, ownedBusiness: OwnedBusiness): Upgrade[] {
    return business.upgrades.flatMap(upgrade => {
        const ownedLevel = Math.max(0,Math.floor(ownedBusiness.upgradeLevels[upgrade.id]??0))
        const level = upgrade.maxLevel === undefined ? ownedLevel:Math.min(ownedLevel,upgrade.maxLevel)
        return Array.from({ length: level }, () => upgrade)
    })
}


export function calcBonus(revenue: number, upgrades: Upgrade[]): number {
    const bonusUpgrades = upgrades.filter(upgrade =>
        upgrade.bonusChance !== undefined &&
        upgrade.bonusMult !== undefined
    )

    let payout = revenue

    for (const upgrade of bonusUpgrades) {
        const chance = Math.max(0, Math.min(1, upgrade.bonusChance!))

        if (Math.random() < chance) {
            payout *= upgrade.bonusMult!
        }
    }

    return payout
}

export function getUpgradeMultipliers(upgrades: Upgrade[]): { prodMult: number, cyclesMult: number } {
    return upgrades.reduce((multipliers, upgrade) => ({
        prodMult: multipliers.prodMult * (upgrade.prodMult ?? 1),
        cyclesMult: multipliers.cyclesMult * (upgrade.cyclesMult ?? 1)
    }),
        { prodMult: 1, cyclesMult: 1 }
    )
}

export function getExpectedBonusMultiplier(upgrades: Upgrade[]): number {
    return upgrades.reduce((multiplier, upgrade) => {
        if (upgrade.bonusChance === undefined || upgrade.bonusMult === undefined)
            return multiplier
        const chance = Math.max(0, Math.min(1, upgrade.bonusChance))
        return multiplier * (1 + chance * (upgrade.bonusMult - 1))
    }, 1)
}

export function getBusinessProduction(business: Business, ownedBusiness: OwnedBusiness) {
    const upgrades = getPurchasedUpgrades(business, ownedBusiness)
    const multipliers = getUpgradeMultipliers(upgrades)
    const expectedBonusMult = getExpectedBonusMultiplier(upgrades)

    return {
        upgrades,
        cycleTimeSeconds: business.cycleTimeSeconds * multipliers.cyclesMult,
        revenuePerCycle: business.revenuePerCycle * multipliers.prodMult,
        incomePerSecond: calcIncomePerSecond(
            business.cycleTimeSeconds,
            business.revenuePerCycle,
            multipliers.prodMult,
            multipliers.cyclesMult
        ),
        expectedIncomePerSecond: calcIncomePerSecond(
            business.cycleTimeSeconds,
            business.revenuePerCycle,
            multipliers.prodMult * expectedBonusMult,
            multipliers.cyclesMult
        )
    }
}

export function calcIncomePerSecond(cycleTimeSeconds: number, revPerCycle: number, prodMult: number = 1, cycleTimeMult: number = 1): number {
    const actualCycleTime = cycleTimeSeconds * cycleTimeMult
    const actualRevenue = revPerCycle * prodMult

    if (actualCycleTime <= 0) return 0

    return actualRevenue / actualCycleTime
}
