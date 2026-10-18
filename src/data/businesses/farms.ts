import type { Business } from "../../types/game";

export const farms: Business[] = [
    {
        id: 'wheat-farm',
        name: 'Wheat Farm',
        description: "Grow wheat to sell",
        category: "farms",
        baseCost: 20,
        unlockCost: 0,
        cycleTimeSeconds: 1,
        revenuePerCycle: 2,
        upgrades: [
            {
                id: "improved-seeds",
                name: "Better Seeds",
                description: "Increase your production multiplier by 20%",
                type: "production-mult",
                baseCost: 20,
                prodMult: 1.2,
                maxLevel: 10
            },
            {
                id: 'improved-irrigation',
                name: "Improved Irrigation",
                description: "Reduce time per production cycle by 10%",
                type: "cycle-time",
                baseCost: 30,
                cyclesMult: 0.9,
                maxLevel: 10
            },
            {
                id: 'tractors',
                name: "Tractors",
                description: "Tractors unearth better soil. (10% chance to earn 1.5x revenue on a cycle)",
                type: "bonus-chance",
                baseCost: 40,
                bonusChance: .1,
                bonusMult: 1.5,
                maxLevel:10
            }
        ]
    },
    {
        id: "lettuce-farm",
        name: "Lettuce Farm",
        description: "Lettuce is healthy, sells well, and is green like money",
        category: "farms",
        baseCost: 1000,
        unlockCost: 800,
        cycleTimeSeconds: 2,
        revenuePerCycle: 6,
        upgrades: [
            {
                id: "more-dirt",
                name: "More Dirt",
                description: "Sell more lettuce at once, increases your revenue per cycle by 20%",
                type: "production-mult",
                baseCost: 50,
                prodMult: 1.2,
                maxLevel:20
            },
            {
                id: "fertilizer",
                name: "Fertilizer",
                description: "Fertilizer makes your lettuce grow 10% faster!",
                type: "cycle-time",
                baseCost: 75,
                cyclesMult:0.9,
                maxLevel:20
            },
            {
                id: "more-farmers",
                name: "More Farmers",
                description: "Farmer John, Jill, and Jack came to help (15% chance to 1.5x your revenue for 1 cycle)",
                type: "bonus-chance",
                baseCost: 100,
                bonusChance: .15,
                bonusMult: 1.5,
                maxLevel:20
            }
        ]
    },
    {
        id: "milk-farm",
        name: "Milk Farm",
        description: "Vitamin D is good for you, better for your wallet.",
        category: "farms",
        baseCost: 10000,
        unlockCost: 7500,
        cycleTimeSeconds: 3,
        revenuePerCycle: 15,
        upgrades: [
            {
                id: "more-cows",
                name: "More Cows",
                description: "More Cows = More Milk. Simple maths (20% more money per cycle)",
                type: "production-mult",
                baseCost: 150,
                prodMult: 1.2,
                maxLevel:30
            },
            {
                id: "more-grass",
                name: "More Grass",
                description: "More grass = More milk (13.5% faster)",
                type: "cycle-time",
                baseCost: 225,
                cyclesMult:0.875,
                maxLevel:30
            },
            {
                id: "dairy-tanks",
                name: "Dairy Tanks",
                description: "Store your milk longer, sell higher. (15% chance to 1.5x your revenue for a cycle)",
                type: "bonus-chance",
                baseCost: 300,
                bonusChance: .15,
                bonusMult: 1.5,
                maxLevel:30
            }
        ]
    },
    {
        id: "horse-farm",
        name: "Horse Stables",
        description: "Look at them race! Off to the Derby they go.",
        category: "farms",
        baseCost: 75000,
        unlockCost: 40000,
        cycleTimeSeconds: 5,
        revenuePerCycle: 40,
        upgrades: [
            {
                id: "better-training",
                name: "Better Training",
                description: "Better training makes them a lot faster. And a lot more likely to win.(22.5% more money per cycle)",
                type: "production-mult",
                baseCost: 500,
                prodMult: 1.225,
                maxLevel:40
            },
            {
                id: "bigger-track",
                name: "Bigger Track",
                description: "A real racetrack! (10% slower, 25% more money)",
                type: "cycle-time",
                baseCost: 750,
                cyclesMult:1.1,
                prodMult: 1.25,
                maxLevel:40
            },
            {
                id: "kentucky-derby",
                name: "Kentucky Derby",
                description: "Really in the big leagues now! (10% chance to 2x your revenue for a cycle)",
                type: "bonus-chance",
                baseCost: 1000,
                bonusChance: .1,
                bonusMult: 2,
                maxLevel:40
            }
        ]
    },
]