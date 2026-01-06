import holidays from "./data/nse-holidays.json" with { type: "json" };

const isWeekend = (date) => {
  const day = date.getDay(); // 0 Sun, 6 Sat
  return day === 0 || day === 6;
};

const format = (date) =>
  date.toISOString().slice(0, 10);

export const isTradingDay = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const iso = format(d);

  if (isWeekend(d)) return false;
  if (holidays[year]?.some(holiday => holiday.date === iso)) return false;

  return true;
};

export const nextTradingDay = (date) => {
  const d = new Date(date);
  do {
    d.setDate(d.getDate() + 1);
  } while (!isTradingDay(d));
  return d;
};

export const previousTradingDay = (date) => {
  const d = new Date(date);
  do {
    d.setDate(d.getDate() - 1);
  } while (!isTradingDay(d));
  return d;
};