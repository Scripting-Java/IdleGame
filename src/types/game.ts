export type BusinessCategory = 'farms' | 'workshops' | 'industry' | 'factories'

export type UpgradeType =
    'cycle-time'  //Reduces seconds per production cycle(e.g. 5 seconds -> 4 seconds)
    | 'production-mult' //Multiplies revenue(e.g. 20% higher = 1.2X)
    | 'bonus-chance' //Allows you to get 50% extra on one yield. between 0 to 1


export interface Business {
    id: string,
    name: string,
    description: string,
    category: BusinessCategory,

    baseCost: number,
    unlockCost: number,

    cycleTimeSeconds: number,
    revenuePerCycle: number,

    upgrades: Upgrade[]
}

export interface Upgrade {
    id: string,
    name: string,
    description: string,
    type: UpgradeType,
    baseCost: number,
    bonusChance?:number, //chance of getting the bonus multiplier
    cyclesMult?:number, //speed multiplier by making it faster, lower is better
    bonusMult?: number, //bonus chance multiplier
    prodMult?:number, //number of goods produced so 1.2 is 1.2x goods produced.
    maxLevel?: number
}

export interface OwnedBusiness {
    businessId: string,
    amt: number,
    upgradeLevels: Record<string, number>
}

export interface GameState {
    money: number,
    businesses: Record<string, OwnedBusiness>
}