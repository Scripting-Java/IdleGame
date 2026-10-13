# Time Forge

**Become the richest industrialist of all time.**

## Project Summary:
Time Forge is a cozy-ish industrial idle game built with React and TypeScript. You Start with small farms and workshops unfortunately earning little money. However, as you grow, you can reinvest your earnings into businesses and upgrades, and gradually expand into massive industrial operations and advanced factories.

Goal: **Earn money, reinvest it, unlock new businesses, and keep growing.**

## How To Play:
1. **Earn money** — Owned businesses automatically generate money over time.
2. **Buy businesses** — Spend your earned money to purchase additional businesses and increase total income.
3. **Purchase upgrades** — Improve individual businesses to increase their production.
4. **Unlock new business tiers** — Progress through farms, workshops, industry, and factories.
5. **Repeat** — Reinvest earnings and become the richest person alive.

6. **Idle Earnings** — Your earnings keep growing even when you're not playing and are calculated when you rejoin.  

## Business Categories

### 1. Farms

Farms are the starting tier and are focused on basic resource production.

### Businesses:
- **Wheat Farm** — Bread is very tasty.
- **Lettuce Farm** — More expensive, sells for more, and is green like money.
- **Milk Farm** — Look! It's a cow!
- **Horse Farm** — Straight to the derby.

### 2. Workshops

Production, processing, and services.

### Businesses:
- **Bakery** — Cookies, cakes, and more!
- **Restaurant** — Very fancy Italian.
- **Watchmaker** — Watches are shiny and fancy.

### 3. Industry

Bigger goods, bigger profits.

### Businesses:
- **Lumber Mill** — Lots and lots of wood.
- **Mine** — Coal, iron, and maybe DIAMONDS???

### 4. Factories

Whoa, that's a lot of robots.

### Businesses:
- **Electronics Factory** — Batteries!
- **Car Factory** — Wheels and steering wheels.
- **Robotics Lab** — Beep. Boop. 

More businesses will be added later as time allows.

## Businesses and Production

Every business has a consistent set of properties:

- **Name** — The business's display name.
- **Base cost** — The initial purchase price.
- **Base income** — The money generated per second.
- **Owned count** — The number of businesses the player owns.
- **Upgrade levels** — The levels of upgrades purchased for that business.
- **Unlock requirements** — The conditions required to make the business available. This will usually be cash or upgrading the previous factory to the fullest. Other game mechanics will potentially be added in the future.


### Example

These values are illustrative, not final balance settings.

| Business | Purchase Cost | Income per Second |
|---|---:|---:|
| Lumber Mill | $20 | $5/s |
| Second Lumber Mill | $20 | $5/s |

If the player owns one Lumber Mill, it generates $5 per second. After four seconds, the player earns $20 and can purchase another mill, doubling production to $10 per second.

### Central progression loop:
More business = More money = More expansion.

## Upgrades

Every business has its own set of repeatable upgrades. The first version will ideally ship with 3 for each business.

Examples include:

- **Wheat Farm:** Improved Seeds, Better Irrigation, Tractors.
- **Lettuce Farm:** More dirt, Fertilizer, More farmers.
- **Milk Farm:** More cows, More grass, Dairy tanks.
- **Horse Farm:**  Better training, Bigger track, Kentucky Derby Treatment.
- **Bakery:** Better Ovens, Cookie cutters, Faster Production.
- **Restaurant:** Pasta, Pizza, Gelato.
- **Watchmaker:** Grandfather Clocks, More gears, Swiss Watch.
- **Lumber Mill:** Bigger Axes, Bigger trucks, Chainsaws.
- **Mine:** Minecarts, Better Pickaxes, Dynamite.
- **Electronics Factory:** Circuit Boards, Transistors, RAM.
- **Car Factory:** 4-wheel drive, Bigger suspension, sport mode.
- **Robotics Laboratory:** Robot vacuum, Advanced machining, Humanoid Robots.

These are starting examples, not a fixed list.

Each upgrade has:
- A purchase cost.
- A production bonus.
- A current level.
- A cost-scaling rule.

Upgrades become more expensive as their levels increase. Businesses and upgrades use reusable systems so new content can be added through interfaces and classes instead of requiring custom logic for every item.

## Progression is based on unlocking increasingly powerful businesses.


## Saving and Offline Progress

Time Forge runs entirely in the browser.

- Automatically save game progress using `localStorage`.
- Restore saved progress when the game is reopened.
- Track elapsed time while the game is closed.
- Calculate offline earnings when the player returns.

Progress is stored per browser and device. 

## User Interface

The user interface will use a cozy industrial theme.

The initial layout will be simple and have:
- Current money balance.
- Total income per second.
- Menu for:
    - Business cards showing cost, ownership, and production.
    - Individual business upgrades.
    - Clear purchase buttons and progress indicators.
- Next business to be purchased(immediate goal)


## Technology Stack

- **React** — User interface.
- **TypeScript** — Application logic and type safety.
- **Vite** — Development server and production builds.
- **CSS** — Styling and responsive layouts.
- **localStorage** — Local save data.
- **GitHub Pages** — Static website hosting.

*All game calculations and progression run on the client*.


## Future Ideas

- More businesses.
- More upgrades with visual design for the upgrades.
- Achievements.
- Prestige or reset mechanics.
- Statistics and lifetime earnings.
- "World 2" - Some new frontier? Maybe Space?


