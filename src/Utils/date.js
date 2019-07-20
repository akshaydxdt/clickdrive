export const getCurrentWeek = () => {
  let curr = new Date();
  let week = [];

  for (let i = 1; i <= 7; i++) {
    let first = curr.getDate() - curr.getDay() + i;
    let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
    week.push(day);
  }
  console.log("week", week);

  return week;
};

export const getDayName = num => {
  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[num];
};

export const getMonthText = num => {
  const arr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  return arr[num];
};
