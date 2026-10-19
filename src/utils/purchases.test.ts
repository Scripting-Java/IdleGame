import { describe,expect,it} from "vitest";
import type { Business,GameState } from "../types/game";
import { getUpgradeCost,purchaseUpgrade } from "./purchases";


const testUpgrade = {
    id: "better-crops",
    name: "Better Crops",
    description: "Doubles a cycle's revenue",
    type: "production-mult" as const,
    baseCost: 10,
    prodMult: 2
}

const testBusiness: Business = {
    id: "test-farm",
    name: "Test Farm",
    description: "The farm tests the purchases or something like that...",
    category: "farms",
    baseCost: 10,
    unlockCost: 0,
    cycleTimeSeconds: 2,
    revenuePerCycle: 5,
    upgrades: [testUpgrade]
}

function createTempState(money=100, amt = 1): GameState{
    return{
        money, businesses: {
            "test-farm":{businessId: "test-farm", amt, upgradeLevels: {}, cycleProgressSeconds: 0,}
        }, unlockedBusinesses: ["test-farm"]
    }
}

describe("getUpgradeCost", () => {
    it("calculates upgrade cost from the tier of the business and the number of levels it had before", () => {
        expect(getUpgradeCost(testUpgrade, "farms", 0)).toBe(1)
        expect(getUpgradeCost(testUpgrade, "farms", 10)).toBe(10)
    })
})

describe("purchaseUpgrade", () => {
    it("upgrades - increases upgrade level for money", () => {
        const result = purchaseUpgrade(createTempState(100), testBusiness, "better-crops")
        expect(result.money).toBe(99)
        expect(result.businesses["test-farm"].upgradeLevels["better-crops"]).toBe(1)
    })
})


it("upgrades only one level", () => {
    const state = createTempState()
    state.businesses["test-farm"].upgradeLevels["better-crops"] = 1
    const result = purchaseUpgrade(state, testBusiness, "better-crops")
    expect(result.money).toBeCloseTo(100-Math.pow(10,.1))
    expect(result.businesses["test-farm"].upgradeLevels["better-crops"]).toBe(2)
})

it("rejects upgrades when player doesn't have enough money", () =>{
    const state = createTempState(.5)
    expect(purchaseUpgrade(state, testBusiness, "better-crops")).toBe(state)
    expect(state.money).toBe(.5)
})

it("rejects upgrades for businesses the player doesn't own", ()=>{
    const state = createTempState(100,0)
    expect(purchaseUpgrade(state,testBusiness,"better-crops")).toBe(state)
})

it("rejects wrong upgrade IDs", () => {
    const state = createTempState()
    expect(purchaseUpgrade(state, testBusiness, "missing-upgrade")).toBe(state)
})

it("can't upgrade over max level", () => {
    const maxLv1Business: Business = {...testBusiness, upgrades: [{...testUpgrade, maxLevel: 1}]}
    const state = createTempState()
    state.businesses["test-farm"].upgradeLevels["better-crops"] = 1
    expect(purchaseUpgrade(state,maxLv1Business, "better-crops")).toBe(state)
})

it("allows you to keep upgrading if there is no maxLevel", () => {
    const state = createTempState()
    state.businesses["test-farm"].upgradeLevels["better-crops"]=5
    const result = purchaseUpgrade(state,testBusiness,"better-crops")
    expect(result.money).toBeCloseTo(100-Math.pow(10,1.5))
    expect(result.businesses["test-farm"].upgradeLevels["better-crops"]).toBe(6)
})

it("doesn't overwrite the gamestate info", () => {
    const state = createTempState()
    const prevOwnedBusiness = state.businesses["test-farm"]
    const prevLevels = prevOwnedBusiness.upgradeLevels
    const result = purchaseUpgrade(state, testBusiness, "better-crops")

    expect(state.money).toBe(100)
    expect(prevLevels["better-crops"]).toBeUndefined()
    expect(result).not.toBe(state)
    expect(result.businesses["test-farm"]).not.toBe(prevOwnedBusiness)
    expect(result.businesses["test-farm"].upgradeLevels).not.toBe(prevLevels)
})

