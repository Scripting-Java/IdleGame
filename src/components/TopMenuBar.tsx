import { formatCost } from "../utils/formatters";

interface TopBarProps { money: number, incomePerSec: number }

function TopMenuBar({ money, incomePerSec }: TopBarProps) {
    return (
        <header className="topBar">
            <div className="gameLogo">
                <h1>Time Forge</h1>
                <p>Become the richest of all time.</p>
                {/*<img></img> For the logo later, remove upon adding*/}
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