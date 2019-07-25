export const generateYears = (currentYears, setYears) => {
  var currentYear = new Date().getFullYear(),
    years = [],
    startYear;
  console.log("current", currentYears);
  if (currentYears.length > 0) {
    currentYear = currentYears[currentYears.length - 1];
    years = currentYears;
  }
  startYear = currentYear - 18;
  while (startYear < currentYear) {
    years.push(startYear++);
  }
  console.log("years", years);

  ssetYears(years);
};
