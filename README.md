# nse-holiday-calendar

🇮🇳 **NSE Trading Holiday Calendar for JavaScript**

A lightweight, zero-dependency library to check NSE (National Stock Exchange) trading holidays and calculate next/previous trading days for the Indian stock market.

## ✨ Features

- ✅ **Zero dependencies** - Lightweight and fast
- 📅 **Complete holiday data** (2022-2026) 
- 🚀 **Framework agnostic** - Works with React, Node.js, Vue, etc.
- 📈 **Perfect for trading bots** and backtesting
- 🌐 **ES6 modules** with TypeScript support
- ⚡ **Weekend detection** included

## 📦 Installation

```bash
npm install nse-holiday-calendar
```

## 🚀 Quick Start

```javascript
import { isTradingDay, nextTradingDay, previousTradingDay } from "nse-holiday-calendar";

// Check if today is a trading day
console.log(isTradingDay(new Date())); // true/false

// Get next trading day after Republic Day
console.log(nextTradingDay("2024-01-26")); // 2024-01-29

// Get previous trading day
console.log(previousTradingDay("2024-01-29")); // 2024-01-25
```

## 📋 Usage Examples

### React Trading Dashboard

```javascript
import { isTradingDay, nextTradingDay } from "nse-holiday-calendar";

function TradingStatus() {
  const today = new Date();
  const isOpen = isTradingDay(today);
  
  return (
    <div>
      <h2>Market Status: {isOpen ? "🟢 Open" : "🔴 Closed"}</h2>
      {!isOpen && (
        <p>Next trading day: {nextTradingDay(today).toDateString()}</p>
      )}
    </div>
  );
}
```

### Node.js Trading Bot

```javascript
import { isTradingDay, nextTradingDay } from "nse-holiday-calendar";

// Only execute trades on trading days
function executeTrade(orderData) {
  if (!isTradingDay(new Date())) {
    console.log(`Market closed. Next trading day: ${nextTradingDay(new Date())}`);
    return;
  }
  
  // Execute your trading logic
  processOrder(orderData);
}
```

### Backtesting & Data Analysis

```javascript
import { isTradingDay } from "nse-holiday-calendar";

// Filter only trading day data
const tradingDayData = historicalData.filter(candle => 
  isTradingDay(new Date(candle.timestamp))
);

// Skip processing on holidays/weekends
function processCandle(candle) {
  if (!isTradingDay(candle.time)) return; // Skip holidays
  
  // Your backtesting logic here
  calculateIndicators(candle);
}
```

### Scheduling & Automation

```javascript
import { isTradingDay, nextTradingDay } from "nse-holiday-calendar";

// Schedule reports only on trading days
function scheduleReport() {
  const today = new Date();
  
  if (isTradingDay(today)) {
    generateDailyReport();
  } else {
    console.log(`Skipping report. Next trading day: ${nextTradingDay(today)}`);
  }
}
```

## 📚 API Reference

### `isTradingDay(date)`
Checks if a given date is a trading day (excludes weekends and NSE holidays).

**Parameters:**
- `date` (Date | string): Date to check

**Returns:** `boolean`

```javascript
isTradingDay(new Date());           // true/false
isTradingDay("2024-01-26");         // false (Republic Day)
isTradingDay("2024-01-27");         // false (Saturday)
isTradingDay("2024-01-29");         // true (Monday)
```

### `nextTradingDay(date)`
Returns the next available trading day after the given date.

**Parameters:**
- `date` (Date | string): Starting date

**Returns:** `Date`

```javascript
nextTradingDay("2024-01-26");       // Mon Jan 29 2024 (skips weekend)
nextTradingDay("2024-12-25");       // Thu Dec 26 2024
```

### `previousTradingDay(date)`
Returns the previous trading day before the given date.

**Parameters:**
- `date` (Date | string): Starting date

**Returns:** `Date`

```javascript
previousTradingDay("2024-01-29");   // Thu Jan 25 2024
previousTradingDay("2024-01-26");   // Wed Jan 24 2024
```

## 📅 Supported Years

Currently includes NSE holiday data for:
- **2022** - 13 holidays
- **2023** - 15 holidays  
- **2024** - 16 holidays
- **2025** - 14 holidays
- **2026** - 15 holidays

## 🏦 Included Holidays

Major NSE holidays covered:
- Republic Day, Independence Day
- Diwali, Holi, Dussehra
- Good Friday, Christmas
- Gandhi Jayanti, Ambedkar Jayanti
- Eid festivals, Guru Nanak Jayanti
- And more regional holidays

## 🤝 Contributing

Contributions welcome! Please feel free to submit issues and pull requests.

## 📄 License

MIT © [Sonu Kumar](https://github.com/sonufsd)

## 🔗 Links

- [GitHub Repository](https://github.com/sonufsd/nse-holiday-calendar)
- [npm Package](https://www.npmjs.com/package/nse-holiday-calendar)
- [Report Issues](https://github.com/sonufsd/nse-holiday-calendar/issues)