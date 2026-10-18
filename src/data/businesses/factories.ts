
import type { Business } from "../../types/game";

export const factories: Business[] = [
    {
        id: "electronics-factory",
        name: "Electronics Factory",
        description: "Wires, circuits, and other SHOCKING things",
        category: "factories",
        baseCost: 5000000,
        unlockCost: 10000000,
        cycleTimeSeconds: 15,
        revenuePerCycle: 50000,
        upgrades: [
            {
                id: "circuit-boards",
                name: "Circuit Boards",
                description: "Your computer has one. Increase revenue by 30%.",
                type: "production-mult",
                baseCost: 12000000,
                prodMult: 1.3,
                maxLevel:80
            },
            {
                id: "transistors",
                name: "Transistors",
                description: "Smaller components, faster production. Reduce cycle time by 15%.",
                type: "cycle-time",
                baseCost: 7500000,
                cyclesMult: 0.85,
                maxLevel:80
            },
            {
                id: "ram",
                name: "RAM",
                description: "The prices these days ... Increases revenue by 675%. I'll change this if the ram prices ever go down...",
                type: "production-mult",
                baseCost: 10000000,
                prodMult: 6.75,
                maxLevel:80
            },
            {
                id: "ai-chips",
                name: "AI Chips",
                description: "The most useful commodity? A 80% chance to earn 6x revenue on a cycle.",
                type: "bonus-chance",
                baseCost: 15000000,
                bonusChance: 0.8,
                bonusMult: 6,
                maxLevel:80
            },
        ],
    },
    {
        id: "car-factory",
        name: "Car Factory",
        description: "Build cars to drive up those earnings.",
        category: "factories",
        baseCost: 20000000,
        unlockCost: 40000000,
        cycleTimeSeconds: 20,
        revenuePerCycle: 150000,
        upgrades: [
            {
                id: "four-wheel-drive",
                name: "4-Wheel Drive",
                description: "It has 4 wheels? Increase revenue by 30%.",
                type: "production-mult",
                baseCost: 20000000,
                prodMult: 1.3,
                maxLevel:90
            },
            {
                id: "bigger-assembly-line",
                name: "Bigger Assembly Line",
                description: "Better assembly line. Reduce cycle duration by 15%.",
                type: "cycle-time",
                baseCost: 30000000,
                cyclesMult: 0.85,
                maxLevel:90
            },
            {
                id: "sport-mode",
                name: "Sport Mode",
                description: "They're fast so they earn money faster. Increase revenue by 75%.",
                type: "production-mult",
                baseCost: 40000000,
                prodMult: 1.75,
                maxLevel:90
            },
            {
                id: "luxury-interiors",
                name: "Luxury Interiors",
                description: "Very fancy interiors. A 50% chance to earn 10x revenue on a cycle.",
                type: "bonus-chance",
                baseCost: 60000000,
                bonusChance: 0.5,
                bonusMult: 10,
                maxLevel:90
            },
            {
                id: "electric-vehicles",
                name: "Electric Vehicles",
                description: "The future of transportation? You should hope so. 30% extra revenue.",
                type: "production-mult",
                baseCost: 100000000,
                prodMult: 1.3,
                maxLevel:90
            },
        ],
    },
    {
        id: "robotics-laboratory",
        name: "Robotics Laboratory",
        description: "Very very complicated. Makes good money.",
        category: "factories",
        baseCost: 1000000000,
        unlockCost: 2000000000,
        cycleTimeSeconds: 25,
        revenuePerCycle: 1000000,
        upgrades: [
            {
                id: "robot-vacuum",
                name: "Robot Vacuum",
                description: "Everything has to start somewhere. Increase revenue by 50%.",
                type: "production-mult",
                baseCost: 1200000000,
                prodMult: 1.5,
                maxLevel:100
            },
            {
                id: "advanced-machining",
                name: "Advanced Machining",
                description: "Precision speeds up things. Reduce cycle duration by 15%.",
                type: "cycle-time",
                baseCost: 1500000000,
                cyclesMult: 0.85,
                maxLevel:100
            },
            {
                id: "humanoid-robots",
                name: "Humanoid Robots",
                description: "Is this the future? Makes money either way. Triple revenue.",
                type: "production-mult",
                baseCost: 2000000000,
                prodMult: 3,
                maxLevel:100
            },
            {
                id: "autonomous-systems",
                name: "Autonomous Systems",
                description: "These things earn money for you. A 10% chance to earn 6x revenue on a cycle. 4x your revenue.",
                type: "bonus-chance",
                baseCost: 3000000000,
                bonusChance: 0.1,
                bonusMult: 6,
                prodMult: 4,
                maxLevel:100
            },
        ],
    },
];
