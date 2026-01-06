import { isTradingDay, nextTradingDay, previousTradingDay } from './src/index.js';

console.log('🧪 Testing NSE Holiday Calendar Package\n');

// Test 1: Check if Republic Day 2024 is a holiday
console.log('📅 Test 1: Republic Day 2024 (Holiday)');
const republicDay = '2024-01-26';
console.log(`isTradingDay("${republicDay}"):`, isTradingDay(republicDay));
console.log('Expected: false ✅\n');

// Test 2: Check if a regular weekday is a trading day
console.log('📅 Test 2: Regular Weekday (Jan 25, 2024)');
const regularDay = '2024-01-25';
console.log(`isTradingDay("${regularDay}"):`, isTradingDay(regularDay));
console.log('Expected: true ✅\n');

// Test 3: Check weekend detection
console.log('📅 Test 3: Weekend (Saturday Jan 27, 2024)');
const weekend = '2024-01-27';
console.log(`isTradingDay("${weekend}"):`, isTradingDay(weekend));
console.log('Expected: false ✅\n');

// Test 4: Next trading day after Republic Day
console.log('📅 Test 4: Next trading day after Republic Day');
const nextDay = nextTradingDay(republicDay);
console.log(`nextTradingDay("${republicDay}"):`, nextDay.toISOString().split('T')[0]);
console.log('Expected: 2024-01-29 (Monday) ✅\n');

// Test 5: Previous trading day before Republic Day
console.log('📅 Test 5: Previous trading day before Republic Day');
const prevDay = previousTradingDay(republicDay);
console.log(`previousTradingDay("${republicDay}"):`, prevDay.toISOString().split('T')[0]);
console.log('Expected: 2024-01-25 (Thursday) ✅\n');

// Test 6: Test with Date objects
console.log('📅 Test 6: Using Date objects');
const dateObj = new Date('2024-12-25'); // Christmas
console.log(`isTradingDay(new Date('2024-12-25')):`, isTradingDay(dateObj));
console.log('Expected: false (Christmas) ✅\n');

// Test 7: Multiple years test
console.log('📅 Test 7: Multiple years test');
console.log(`2022 Republic Day: isTradingDay("2022-01-26"):`, isTradingDay('2022-01-26'));
console.log(`2023 Republic Day: isTradingDay("2023-01-26"):`, isTradingDay('2023-01-26'));
console.log(`2025 Christmas: isTradingDay("2025-12-25"):`, isTradingDay('2025-12-25'));
console.log('Expected: all false ✅\n');

// Test 8: Edge case - Next trading day from Friday
console.log('📅 Test 8: Next trading day from Friday (skips weekend)');
const friday = '2024-01-19'; // Friday
const nextFromFriday = nextTradingDay(friday);
console.log(`nextTradingDay("${friday}"):`, nextFromFriday.toISOString().split('T')[0]);
console.log('Expected: 2024-01-22 (Monday) ✅\n');

console.log('🎉 All tests completed! Check results above.');
console.log('✅ Package is working correctly if all expected values match!');