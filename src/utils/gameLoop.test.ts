import {describe, expect, it, vi, afterEach, test} from "vitest"
import type { Business, GameState } from "../types/game"
import { advanceProduction } from "./gameLoop"


const testBusiness: Business = {
    id:"test-farm",
    name: "Test Farm",
    description: "Farm for testing production",
    category: "farms",
    baseCost:10,
    unlockCost:0,
    cycleTimeSeconds:2,
    revenuePerCycle: 5,
    upgrades:[]
}

function createState(amt: number, cycleProgressSeconds = 0): GameState{
    return{
        money:0,
        businesses:{
            "test-farm":{
                businessId:"test-farm",
                amt,
                upgradeLevels:{},
                cycleProgressSeconds
            }
        }
    }
}

afterEach(()=>{
    vi.restoreAllMocks()
})

describe("advanceProduction",()=>{
    it("earns nothing before a production cycle completes",() => {
        const result = advanceProduction(createState(1), [testBusiness],1)

        expect(result.money).toBe(0)
        expect(result.businesses["test-farm"].cycleProgressSeconds).toBe(1)
    })

    it("pays revenue when a cycle completes",() => {
        const result = advanceProduction(createState(1), [testBusiness], 2)

        expect(result.money).toBe(5)
        expect(result.businesses["test-farm"].cycleProgressSeconds).toBe(0)
})
   it("preserves leftover progress after completing cycles", () => {
        const result = advanceProduction(createState(1), [testBusiness], 5);

        expect(result.money).toBe(10);
        expect(result.businesses["test-farm"].cycleProgressSeconds).toBe(1);
    });

    it("produces revenue for every owned copy", () => {
        const result = advanceProduction(createState(3), [testBusiness], 2);

        expect(result.money).toBe(15);
    });

    it("does not mutate the original state", () => {
        const state = createState(1);
        const result = advanceProduction(state, [testBusiness], 2);

        expect(state.money).toBe(0);
        expect(state.businesses["test-farm"].cycleProgressSeconds).toBe(0);
        expect(result).not.toBe(state);
        expect(result.businesses).not.toBe(state.businesses);
    });

    it("does not advance production for unowned businesses", () => {
        const result = advanceProduction(createState(0), [testBusiness], 5);

        expect(result.money).toBe(0);
        expect(result.businesses["test-farm"].cycleProgressSeconds).toBe(0);
    });

    it("applies production upgrades to cycle revenue", () => {
        const upgradedBusiness: Business = {
            ...testBusiness,
            upgrades: [
                {
                    id: "better-crops",
                    name: "Better Crops",
                    description: "Doubles revenue.",
                    type: "production-mult",
                    baseCost: 10,
                    prodMult: 2,
                },
            ],
        };

        const state = createState(1);
        state.businesses["test-farm"].upgradeLevels = {
            "better-crops": 1,
        };

        const result = advanceProduction(state, [upgradedBusiness], 2);

        expect(result.money).toBe(10);
    });

    it("rolls bonus upgrades independently for each owned copy", () => {
        const bonusBusiness: Business = {
            ...testBusiness,
            upgrades: [
                {
                    id: "lucky-crops",
                    name: "Lucky Crops",
                    description: "Pays double on a successful roll.",
                    type: "bonus-chance",
                    baseCost: 10,
                    bonusChance: 0.5,
                    bonusMult: 2,
                },
            ],
        };

        const state = createState(2);
        state.businesses["test-farm"].upgradeLevels = {
            "lucky-crops": 1,
        };

        vi.spyOn(Math, "random")
            .mockReturnValueOnce(0.1)
            .mockReturnValueOnce(0.9);

        const result = advanceProduction(state, [bonusBusiness], 2);

        expect(result.money).toBe(15);
    });

    it("returns the original state for invalid elapsed time", () => {
        const state = createState(1);

        expect(advanceProduction(state, [testBusiness], 0)).toBe(state);
        expect(advanceProduction(state, [testBusiness], -1)).toBe(state);
        expect(advanceProduction(state, [testBusiness], Number.NaN)).toBe(state);
    });
})
