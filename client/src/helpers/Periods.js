const CURRENT_YEAR = new Date().getFullYear();
const YEARS = [CURRENT_YEAR - 1, CURRENT_YEAR, CURRENT_YEAR + 1];
const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const PERIODS = [];

YEARS.forEach((year) => {
  MONTHS.forEach((month) => {
    const period = `${year}-${month.toString().padStart(2, '0')}`;
    PERIODS.push(period);
  });
});

export { PERIODS };
