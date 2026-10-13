# Time Forge — Business & Upgrade Catalog

> **These values are subject to change and aren't the final product. I will only be using these for references and might not even implement all of them.**  

## 1. Business Catalog

Income per second is calculated as:

`Base income/sec = Revenue per cycle / Cycle time`

These values represent base production before upgrades or random bonuses.

| Category | Business | Purchase Cost | Unlock Cost | Cycle Time | Revenue/Cycle | Base Income/Sec |
|---|---|---:|---:|---:|---:|---:|
| Farms | Wheat Farm | $20 | Free | 1s | $2 | $2.00 |
| Farms | Lettuce Farm | $50 | $40 | 2s | $6 | $3.00 |
| Farms | Milk Farm | $150 | $120 | 3s | $15 | $5.00 |
| Farms | Horse Farm | $500 | $400 | 5s | $40 | $8.00 |
| Workshops | Bakery | $1,500 | $1,200 | 4s | $75 | $18.75 |
| Workshops | Restaurant | $5,000 | $4,000 | 6s | $200 | $33.33 |
| Workshops | Watchmaker | $15,000 | $12,000 | 8s | $700 | $87.50 |
| Industry | Lumber Mill | $50,000 | $40,000 | 10s | $2,500 | $250.00 |
| Industry | Mine | $150,000 | $120,000 | 12s | $8,000 | $666.67 |
| Factories | Electronics Factory | $500,000 | $400,000 | 15s | $30,000 | $2,000.00 |
| Factories | Car Factory | $2,000,000 | $1,600,000 | 20s | $150,000 | $7,500.00 |
| Factories | Robotics Laboratory | $10,000,000 | $8,000,000 | 25s | $1,000,000 | $40,000.00 |

### Cost Rules

- **Unlock cost:** The one-time payment for unlocking a business.
- **Purchase cost:** The price paid for each unit of a business (e.g. the cost to buy each wheat farm).
- **Starting business:** Wheat Farm is unlocked from the beginning.
- These values will likely be adjusted after playtesting and some values might even be removed.

---

## 2. Upgrade Catalog

Each business has three upgrades. The upgrade applies for each unit of that business. For example, if you buy upgrade 1 for the wheat farm, you've effectively bought upgrade 1 for all wheat farms. These values might need further refinement though, so I'll find that after playtesting.

### Farms

#### Wheat Farm

- **Purchase cost:** $20
- **Unlock cost:** Free

| Upgrade | Cost | Effect |
|---|---:|---|
| Improved Seeds | $20 | Revenue per cycle ×1.2 |
| Better Irrigation | $30 | Cycle time ×0.9 |
| Tractors | $40 | 10% chance of earning ×1.5 revenue |

#### Lettuce Farm

- **Purchase cost:** $50
- **Unlock cost:** $40

| Upgrade | Cost | Effect |
|---|---:|---|
| More Dirt | $50 | Revenue per cycle ×1.2 |
| Fertilizer | $75 | Cycle time ×0.9 |
| More Farmers | $100 | 10% chance of earning ×1.5 revenue |

#### Milk Farm

- **Purchase cost:** $150
- **Unlock cost:** $120

| Upgrade | Cost | Effect |
|---|---:|---|
| More Cows | $150 | Revenue per cycle ×1.2 |
| More Grass | $225 | Cycle time ×0.9 |
| Dairy Tanks | $300 | 10% chance of earning ×1.5 revenue |

#### Horse Farm

- **Purchase cost:** $500
- **Unlock cost:** $400

| Upgrade | Cost | Effect |
|---|---:|---|
| Better Training | $500 | Revenue per cycle ×1.2 |
| Bigger Track | $750 | Cycle time ×0.9, Revenue per cycle of x1.25 |
| Kentucky Derby | $1,000 | 10% chance of earning ×2 revenue |

### Workshops

#### Bakery

- **Purchase cost:** $1,500
- **Unlock cost:** $1,200

| Upgrade | Cost | Effect |
|---|---:|---|
| Better Ovens | $1,500 | Revenue per cycle ×1.2 |
| Cookie Cutters | $2,250 | Cycle time ×0.9 |
| Faster Production | $3,000 | 10% chance of earning ×3 revenue |

#### Restaurant

- **Purchase cost:** $5,000
- **Unlock cost:** $4,000

| Upgrade | Cost | Effect |
|---|---:|---|
| Pasta | $5,000 | Revenue per cycle ×1.2 |
| Pizza | $7,500 | Cycle time ×0.9 |
| Gelato | $10,000 | 10% chance of earning ×3 revenue |

#### Watchmaker

- **Purchase cost:** $15,000
- **Unlock cost:** $12,000

| Upgrade | Cost | Effect |
|---|---:|---|
| Grandfather Clocks | $15,000 | Revenue per cycle ×1.2 |
| More Gears | $22,500 | Cycle time ×0.9 |
| Swiss Watch | $30,000 | 10% chance of earning ×3 revenue |

## Industry

### Lumber Mill

- **Purchase cost:** $50,000
- **Unlock cost:** $40,000

| Upgrade | Cost | Effect |
|---|---:|---|
| Bigger Axes | $50,000 | Revenue per cycle ×1.2 |
| Bigger Trucks | $75,000 | Cycle time ×0.9 |
| Chainsaws | $100,000 | 10% chance of earning ×4.5 revenue |

### Mine

- **Purchase cost:** $150,000
- **Unlock cost:** $120,000

| Upgrade | Cost | Effect |
|---|---:|---|
| Minecarts | $150,000 | Revenue per cycle ×1.2 |
| Better Pickaxes | $225,000 | Cycle time ×0.9 |
| Dynamite | $300,000 | 10% chance of earning ×4.5 revenue |

---

## Factories

### Electronics Factory

- **Purchase cost:** $500,000
- **Unlock cost:** $400,000

| Upgrade | Cost | Effect |
|---|---:|---|
| Circuit Boards | $500,000 | Revenue per cycle ×1.2 |
| Transistors | $750,000 | Cycle time ×0.9 |
| RAM | $1,000,000 | 10% chance of earning ×6 revenue |

### Car Factory

- **Purchase cost:** $2,000,000
- **Unlock cost:** $1,600,000

| Upgrade | Cost | Effect |
|---|---:|---|
| 4-Wheel Drive | $2,000,000 | Revenue per cycle ×1.2 |
| Bigger Suspension | $3,000,000 | Cycle time ×0.9 |
| Sport Mode | $4,000,000 | 10% chance of earning ×6 revenue |

### Robotics Laboratory

- **Purchase cost:** $10,000,000
- **Unlock cost:** $8,000,000

| Upgrade | Cost | Effect |
|---|---:|---|
| Robot Vacuum | $10,000,000 | Revenue per cycle ×1.2 |
| Advanced Machining | $15,000,000 | Cycle time ×0.9 |
| Humanoid Robots | $20,000,000 | 10% chance of earning ×6 revenue |

---

## 3. Economy and Upgrade Rules

### Production

- Base income per second is revenue per cycle divided by cycle time.
- Production multipliers increase revenue per cycle.
- Cycle-time multipliers change how long production takes. A multiplier below `1` makes production faster; a multiplier above `1` makes it slower.
- Each owned copy of a business contributes to total production.

### Upgrade Behavior

- Each business has three planned upgrades.
- Upgrades are intended to be purchased once per business type.
- Purchased upgrades affect every owned copy of that business, including copies acquired afterward.
- Upgrade effects are permanent within the current game progression unless a future mechanic changes this rule.

### Bonus Upgrades

- Bonus upgrades have a probability of triggering on a production cycle.
- When a bonus triggers, the cycle pays the configured bonus multiplier times normal revenue.
- When no bonus triggers, the cycle pays normal revenue.
- Bonus chance and bonus payout multiplier are separate values.

### Planned Bonus Multipliers by Tier

| Tier | Category | Planned Bonus Multiplier |
|---|---|---:|
| 1 | Farms | 1.5× |
| 2 | Workshops | 3× |
| 3 | Industry | 4.5× |
| 4 | Factories | 6× |

These multipliers are the planned tier progression. Individual upgrades may use different values as balance testing continues.

### Upgrade Cost Scaling

| Upgrade Slot | Cost |
|---|---:|
| First upgrade | 1× business purchase cost |
| Second upgrade | 1.5× business purchase cost |
| Third upgrade | 2× business purchase cost |

The catalog currently uses these ratios as a guideline. Individual prices may differ when the design or balance calls for it.

---

## 4. Balance Notes and Future Testing

**All prices, values, and effects are placeholders.**
