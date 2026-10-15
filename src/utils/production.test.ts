import { afterEach, describe, expect, it, vi } from "vitest";
import type { Business, OwnedBusiness, Upgrade } from "../types/game";
import { calcBonus, calcIncomePerSecond, getBusinessProduction, getExpectedBonusMultiplier, getPurchasedUpgrades, getUpgradeMultipliers } from "./production";


const testUpgrades: Upgrade[] = [
    {
        id: "double-production",
        name: "Double Production",
        description: "Doubles your revenue",
        type: "production-mult",
        baseCost: 10,
        prodMult: 2,
    },
    {
        id: "faster-cycles",
        name: "Faster Cycles",
        description: "50% cycle time",
        type: "cycle-time",
        baseCost: 20,
        cyclesMult: 0.5,
    },
    {
        id: "lucky-production",
        name: "Lucky Production",
        description: "25% chance to double revenue",
        type: "bonus-chance",
        baseCost: 30,
        bonusChance: 0.25,
        bonusMult: 2,
    }
]

const testBusiness: Business = {
    id: "test-farm",
    name: "Test Farm",
    description: "A farm for testing",
    category: "farms",
    baseCost: 10,
    unlockCost: 0,
    cycleTimeSeconds: 4,
    revenuePerCycle: 8,
    upgrades: testUpgrades,
}

function createOwnedBusiness(upgradeLevels: Record<string, number> = {}): OwnedBusiness {
    return {
        businessId: "test-farm",
        amt: 1,
        upgradeLevels,
        cycleProgressSeconds: 0
    }
}

afterEach(() => { vi.restoreAllMocks() })

describe("getPurchasedUpgrades", () => {
    it("returns no upgrades when none are purchased", () => {
        expect(getPurchasedUpgrades(testBusiness, createOwnedBusiness())).toEqual([])
    })

    it("returns the correct number of copies for each upgrade level", () => {
        const owned = createOwnedBusiness({
            "double-production": 2,
            "faster-cycles": 1
        })

        const result = getPurchasedUpgrades(testBusiness, owned)

        expect(result).toHaveLength(3)
        expect(result.filter(upgrade => upgrade.id === "double-production")).toHaveLength(2)
        expect(result.filter(upgrade => upgrade.id === "faster-cycles")).toHaveLength(1)
    })

    it("does not exceed an upgrade's max level", () => {
        const limitedBusiness: Business = {
            ...testBusiness, upgrades: [
                { ...testUpgrades[0], maxLevel: 2 }
            ]
        }

        const owned = createOwnedBusiness({ "double-production": 5 })

        expect(getPurchasedUpgrades(limitedBusiness, owned)).toHaveLength(2)
    })

    it("treats negative and fractional levels safely", () => {
        const owned = createOwnedBusiness({
            "double-production": -3,
            "faster-cycles": 2.8,
        })

        const result = getPurchasedUpgrades(testBusiness, owned)

        expect(result).toHaveLength(2)
        expect(result.every(upgrade => upgrade.id === "faster-cycles")).toBe(true)
    })
})
describe("getUpgradeMultipliers", () => {
    it("multiplies production and cycle time upgrades together", () => {
        const result = getUpgradeMultipliers([
            testUpgrades[0],
            testUpgrades[0],
            testUpgrades[1]
        ])

        expect(result.prodMult).toBe(4)
        expect(result.cyclesMult).toBe(0.5)
    })

    it("returns neutral multipliers when there are no upgrades", () => {
        expect(getUpgradeMultipliers([])).toEqual({
            prodMult: 1,
            cyclesMult: 1,
        })
    })
})

describe("bonus calculations", () => {
    it("applies a succesful payout", () => {
        vi.spyOn(Math, "random").mockReturnValue(0.1)

        expect(calcBonus(8, [testUpgrades[2]])).toBe(16)
    })

    it("calculates expected bonus multipliers", () => {
        expect(getExpectedBonusMultiplier([testUpgrades[2]])).toBe(1.25)
    })

    it("multiplies the values of independent bonus upgrades", () => {
        const secondBonus: Upgrade = {
            ...testUpgrades[2],
            id: "second-lucky-upgrade",
            bonusChance: 0.5,
            bonusMult: 3
        }

        expect(getExpectedBonusMultiplier([testUpgrades[2], secondBonus])).toBe(2.5)
    })
    it("keeps the base payout when the bonus roll fails", () => {
        vi.spyOn(Math, "random").mockReturnValue(0.9);

        expect(calcBonus(8, [testUpgrades[2]])).toBe(8);
    })
})

describe("income calculations", () => {
    it("calculates income per second", () => {
        expect(calcIncomePerSecond(4, 8)).toBe(2);
    });

    it("accounts for production and cycle time multipliers", () => {
        expect(calcIncomePerSecond(4, 8, 2, 0.5)).toBe(8);
    });

    it("returns zero for a negative cycle time", () => {
        expect(calcIncomePerSecond(0, 8)).toBe(0);
        expect(calcIncomePerSecond(-2, 8)).toBe(0);
    })

    it("combines upgrades into business production", () => {
        const owned = createOwnedBusiness({
            "double-production": 1,
            "faster-cycles": 1,
            "lucky-production": 1,
        });

        const result = getBusinessProduction(testBusiness, owned);

        expect(result.cycleTimeSeconds).toBe(2);
        expect(result.revenuePerCycle).toBe(16);
        expect(result.incomePerSecond).toBe(8);
        expect(result.expectedIncomePerSecond).toBe(10);
    });
});