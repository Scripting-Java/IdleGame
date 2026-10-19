import money from "../assets/background/money.png"

const bills = Array.from({ length: 14 }, (_, i) => i);

function Background() {
  return (
    <div className="background" aria-hidden="true">
      <div className="rainMoney">
        {bills.map((bill) => (
          <img src={money} className="money" key={bill} style=
          {{
              left: `${(bill * 29 + 5) % 100}%`,
              animationDelay: `${-(bill * 1.7) % 12}s`,
              animationDuration: `${7 + (bill % 5) * 1.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Background;