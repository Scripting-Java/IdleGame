import type { Business, GameState } from "../types/game";
import { getBusinessProduction } from "./production";

export function getIncomePerSec(state:GameState, tempBusinesses:Business[]):number{
    let income = 0
    for(const business of tempBusinesses){
        const owned = state.businesses[business.id]
        if(!owned||owned.amt<=0) continue
        const prod = getBusinessProduction(business,owned)
        const cycTime = prod.cycleTimeSeconds
        if(!Number.isFinite(cycTime)||cycTime<=0) continue
        let bonMult = 1
        if(prod.expectedBonusMult != null)
            bonMult = prod.expectedBonusMult
        income+=(owned.amt*prod.revenuePerCycle*bonMult)/cycTime
    }
    return income
}