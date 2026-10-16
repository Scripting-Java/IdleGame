import type { Upgrade, Business, OwnedBusiness } from "../types/game";

export function getPurchasedUpgrades(business: Business, ownedBusiness: OwnedBusiness): Upgrade[] {
    return business.upgrades.flatMap(upgrade => {
        const ownedLevel = Math.max(0, Math.floor(ownedBusiness.upgradeLevels[upgrade.id] ?? 0))
        const level = upgrade.maxLevel === undefined ? ownedLevel : Math.min(ownedLevel, upgrade.maxLevel)
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
    let prodMult = 1
    let cyclesMult = 1
    let expectedBonusMult = 1
    let hasBonus = false

    const upgrades = business.upgrades.filter(upgrade => {
        const ownedLevel = Math.max(0, Math.floor(ownedBusiness.upgradeLevels[upgrade.id] ?? 0))
        const level = upgrade.maxLevel === undefined ? ownedLevel : Math.min(ownedLevel, upgrade.maxLevel)
        if (level <= 0) return false
        prodMult *= Math.pow(upgrade.prodMult ?? 1, level)
        cyclesMult *= Math.pow(upgrade.cyclesMult ?? 1, level)

        if (upgrade.bonusChance !== undefined && upgrade.bonusMult !== undefined) {
            hasBonus = true
            const chance = Math.max(0, Math.min(1, upgrade.bonusChance))
            const expectedPerLevel = 1 + chance * (upgrade.bonusMult - 1)
            expectedBonusMult *= Math.pow(expectedPerLevel, level)
        }

        return true
    })

    return {
        upgrades, hasBonus, expectedBonusMult, cycleTimeSeconds: business.cycleTimeSeconds * cyclesMult, revenuePerCycle: business.revenuePerCycle * prodMult,
        incomePerSecond: calcIncomePerSecond(
            business.cycleTimeSeconds,
            business.revenuePerCycle,
            prodMult,
            cyclesMult
        ),
        expectedIncomePerSecond: calcIncomePerSecond(business.cycleTimeSeconds,business.revenuePerCycle,prodMult * expectedBonusMult,cyclesMult
        )
    }
}


export function calcIncomePerSecond(cycleTimeSeconds: number, revPerCycle: number, prodMult: number = 1, cycleTimeMult: number = 1): number {
    const actualCycleTime = cycleTimeSeconds * cycleTimeMult
    const actualRevenue = revPerCycle * prodMult

    if (actualCycleTime <= 0) return 0

    return actualRevenue / actualCycleTime
}
