import type { GameState } from "../types/game";

export function createInitialState(): GameState{
    return{
        money: 20,
        businesses: {},
        unlockedBusinesses: ["wheat-farm"]
    }
}