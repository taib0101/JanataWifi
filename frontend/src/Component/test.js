const dates = [
  "2020-08-10",
  "2020-08-09",
  "2020-08-06",
  "2020-08-05",
  "2020-08-04",
  "2020-08-03",
  "2020-07-30",
  "2020-07-29",
  "2020-07-28",
  "2020-07-27"
];

// Sort in ascending order (earliest to latest)
const sortedDatesAscending = dates.slice().sort(); // Use slice() to create a copy
for(let value of sortedDatesAscending) {
  console.log(value);
}