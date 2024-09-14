export const barbadosParishes = [
  "Christ Church",
  "St. Andrew",
  "St. George",
  "St. James",
  "St. John",
  "St. Joseph",
  "St. Lucy",
  "St. Michael",
  "St. Peter",
  "St. Philip",
  "St. Thomas",
] as const;

export type BarbadosParish = (typeof barbadosParishes)[number];
