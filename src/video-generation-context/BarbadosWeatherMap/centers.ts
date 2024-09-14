import { BarbadosParish } from "../../shared-context/business-logic/models/barbadosParishes";

type Center = {
  name: BarbadosParish;
  left: string;
  top: string;
};

export const centers: Array<Center> = [
  { name: "St. Lucy", top: "480px", left: "180px" },
  { name: "St. Peter", top: "650px", left: "180px" },
  { name: "St. James", top: "850px", left: "170px" },
  { name: "St. Michael", top: "1240px", left: "250px" },
  { name: "Christ Church", top: "1370px", left: "540px" },
  { name: "St. Philip", top: "1200px", left: "780px" },
  { name: "St. John", top: "1000px", left: "640px" },
  { name: "St. George", top: "1150px", left: "460px" },
  { name: "St. Thomas", top: "950px", left: "300px" },
  { name: "St. Joseph", top: "880px", left: "470px" },
  { name: "St. Andrew", top: "710px", left: "340px" },
];
