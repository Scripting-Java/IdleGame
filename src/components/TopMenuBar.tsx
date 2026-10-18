import { formatCost } from "../utils/formatters";
import TimeForgeLogo from "../assets/Logos/TimeForgeLogo.png"

interface TopBarProps { money: number, incomePerSec: number }

function TopMenuBar({ money, incomePerSec }: TopBarProps) {
    return (
        <header className="topBar">
            <img src={TimeForgeLogo}/>
            <div className="gameLogo">
                <h1>Time Forge</h1>
                <p>Time is Money. Become the richest.</p>
            </div>

            <div className="stats">
                <div>
                    <h2>Money: <b> {formatCost(money)}</b> </h2>
                </div>
                <div>
                    <h2>Income Per Second:  <b>{formatCost(incomePerSec)}</b></h2>
                </div>
            </div>
        </header>
    )
}

export default TopMenuBar