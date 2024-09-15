import { BarbadosParish } from "../../../../../shared-context/business-logic/models/barbadosParishes";

type Center = {
  parish: BarbadosParish;
  left: string;
  top: string;
};

export const centers: Array<Center> = [
  { parish: "St. Lucy", top: "480px", left: "180px" },
  { parish: "St. Peter", top: "650px", left: "180px" },
  { parish: "St. James", top: "850px", left: "170px" },
  { parish: "St. Michael", top: "1240px", left: "250px" },
  { parish: "Christ Church", top: "1370px", left: "540px" },
  { parish: "St. Philip", top: "1200px", left: "780px" },
  { parish: "St. John", top: "1000px", left: "640px" },
  { parish: "St. George", top: "1150px", left: "460px" },
  { parish: "St. Thomas", top: "950px", left: "300px" },
  { parish: "St. Joseph", top: "880px", left: "470px" },
  { parish: "St. Andrew", top: "710px", left: "340px" },
];
