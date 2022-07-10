export const monthsList = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
];

//* 1부터 31까지
export const daysList = Array.from(Array(31), (_, i) => String(i + 1));

//* 2020년부터 1900년까지
export const yearsList = Array.from(Array(121), (_, i) => String(2022 - i));
