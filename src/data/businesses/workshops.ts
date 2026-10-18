import type { Business } from "../../types/game";

export const workshops: Business[] = [
    {
        id: "bakery",
        name: "Bakery",
        description: "Cookies, Scones, and other sweet things",
        category: "workshops",
        baseCost: 1500,
        unlockCost: 2200,
        cycleTimeSeconds: 4,
        revenuePerCycle: 75,
        upgrades: [
            {
                id: "better-ovens",
                name: "Better Ovens",
                description: "Perfectly crisp cookies. Increase revenue per cycle by 20%",
                type: "production-mult",
                baseCost: 1500,
                prodMult: 1.2,
                maxLevel:45
            },
            {
                id: "cookie-cutters",
                name: "Cookie Cutters",
                description: "A Perfect Circle! A+. Reduce cycle time by 12.5%",
                type: "production-mult",
                baseCost: 2250,
                cyclesMult: 0.875,
                maxLevel:45
            },
            {
                id: "true-confectionery",
                name: "True Confectionary",
                description: "Truly a chocolate empire. 15% chance to earn 3x revenue on a cycle.",
                type: "bonus-chance",
                baseCost: 3000,
                bonusChance: .15,
                bonusMult: 3,
                maxLevel:45
            },
        ],
    },
    {
        id: "restaurant",
        name: "Restaurant",
        description: "Serve hungry customers so they FORK over their money. Haha get it? Fork? No? Yeah didn't think so :(",
        category: "workshops",
        baseCost: 5000,
        unlockCost: 10000,
        cycleTimeSeconds: 6,
        revenuePerCycle: 200,
        upgrades: [
            {
                id: "pasta",
                name: "Pasta",
                description: "A true staple. Increase revenue by 16%, Increase your chance of getting 10% more money in a cycle by 40%",
                type: "production-mult",
                baseCost: 5000,
                prodMult: 1.16,
                bonusChance: 0.4,
                bonusMult: 1.1,
                maxLevel:50
            },
            {
                id: "pizza",
                name: "Pizza",
                description: "The most popular food? Reduce cycle time by 12.5%",
                type: "cycle-time",
                baseCost: 7500,
                cyclesMult: 0.875,
                maxLevel:50
            },
            {
                id: "gelato",
                name: "Gelato",
                description: "A sweet, premium dessert. 15% chance to 2.5x your revenue",
                type: "bonus-chance",
                baseCost: 8000,
                prodMult: 1.16,
                bonusChance: .15,
                bonusMult: 2.5,
                maxLevel:50
            }
        ]
    },
    {
        id: "clocksmith",
        name: "ClockSmith",
        description: "Craft very very expensive watches.",
        category: "workshops",
        baseCost: 15000,
        unlockCost: 22500,
        cycleTimeSeconds: 8,
        revenuePerCycle: 700,
        upgrades: [
            {
                id: "grandfather-clock",
                name: "Grandfather Clock",
                description: "A very antique timepiece. Perfect for collectors. Increase revenue by 30%",
                type: "production-mult",
                baseCost: 15000,
                prodMult: 1.3,
                maxLevel:55
            },
            {
                id: "precise-gears",
                name: "Precise Gears",
                description: "Down to the nanosecond. Increase cycle speed by 20% to double revenue per cycle.",
                type: "production-mult",
                baseCost: 30000,
                prodMult: 2,
                cyclesMult: 1.2,
                maxLevel:55
            },
            {
                id: "swiss-watch",
                name: "Swiss Watch",
                description: "Very shiny, Very fancy, Very expensive. 10% chance to earn 200%",
                type: "bonus-chance",
                baseCost: 45000,
                bonusChance: 0.1,
                bonusMult: 2,
                maxLevel:55
            },

        ]
    }
]