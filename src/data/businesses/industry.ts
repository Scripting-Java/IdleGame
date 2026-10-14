import type { Business } from "../../types/game";

export const industry: Business[] = [
    {
        id: "lumber-mill",
        name: "Lumber Mill",
        description: "Firewood, pencils, and Ikea tables. Wow it's everywhere.",
        category: "industry",
        baseCost: 50000,
        unlockCost: 100000,
        cycleTimeSeconds: 10,
        revenuePerCycle: 2500,
        upgrades: [
            {
                id: "bigger-axes",
                name: "Bigger Axes",
                description: "Chop Chop Chop. Increase cycle speed by 20%",
                type: "cycle-time",
                baseCost: 50000,
                cyclesMult: 0.8,
            },
            {
                id: "bigger-trucks",
                name: "Bigger Trucks",
                description: "A full fleet at your service. Increase cycle speed by 20%",
                type: "cycle-time",
                baseCost: 150000,
                cyclesMult: 0.8,
            },
            {
                id: "hardwood-forest",
                name: "Hardwood Forest",
                description: "The highest quality. Sells for 15% higher",
                type: "production-mult",
                baseCost: 250000,
                prodMult: 1.15,
            },
            {
                id: "resin-tree",
                name: "Resin Tree",
                description: "What a rare find! 10% chance to 5x your revenue",
                type: "production-mult",
                baseCost: 500000,
                bonusChance: .1,
                bonusMult: 5
            },
        ]
    },
    {
        id: "mine",
        name: "The Mines",
        description: "Dig deep to fill your deep pockets",
        category: "industry",
        baseCost: 1000000,
        unlockCost: 1500000,
        cycleTimeSeconds: 12,
        revenuePerCycle: 8000,
        upgrades: [
            {
                id: "minecarts",
                name: "Minecarts",
                description: "Transport your ores 8% faster",
                type: "cycle-time",
                baseCost: 1000000,
                cyclesMult: 1.08,
            },
            {
                id: "better-pickaxes",
                name: "Better Pickaxes",
                description: "This isn't minecraft, but if it was... 30% more revenue",
                type: "production-mult",
                baseCost: 1200000,
                prodMult: 1.3,
            },
            {
                id: "dynamite",
                name: "Dynamite",
                description: "Blow it all up! Except the valuable stuff*. 2% less revenue for a chance to 10x your revenue on a cycle",
                type: "bonus-chance",
                baseCost: 1500000,
                prodMult: 0.98,
                bonusChance: 0.15,
                bonusMult: 10,
            },
            {
                id: "oil",
                name: "Oil",
                description: "Black gold. Better to keep the dynamite away though. Increases revenue by 100%",
                type: "production-mult",
                baseCost: 2200000,
                prodMult: 2,
            },
            {
                id: "diamonds",
                name: "Diamonds",
                description: "Shiny, blue, rare. 10% chance to 10x your revenue",
                type: "bonus-chance",
                baseCost: 2500000,
                bonusChance: .1,
                bonusMult: 10,
            },
        ]
    }
]