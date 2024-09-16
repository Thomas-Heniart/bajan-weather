import { BarbadosParish } from "../../../shared-kernel/business-logic/models/barbadosParishes";

type ParishCenter = {
  name: BarbadosParish;
  latitude: number;
  longitude: number;
};

export const parishesCenters: Array<ParishCenter> = [
  {
    name: "Christ Church",
    latitude: 13.0753,
    longitude: -59.5335,
  },
  {
    name: "St. Andrew",
    latitude: 13.25,
    longitude: -59.5667,
  },
  {
    name: "St. George",
    latitude: 13.1333,
    longitude: -59.5667,
  },
  {
    name: "St. James",
    latitude: 13.1667,
    longitude: -59.6167,
  },
  {
    name: "St. John",
    latitude: 13.1667,
    longitude: -59.4833,
  },
  {
    name: "St. Joseph",
    latitude: 13.2167,
    longitude: -59.55,
  },
  {
    name: "St. Lucy",
    latitude: 13.3167,
    longitude: -59.6167,
  },
  {
    name: "St. Michael",
    latitude: 13.1,
    longitude: -59.6167,
  },
  {
    name: "St. Peter",
    latitude: 13.25,
    longitude: -59.6167,
  },
  {
    name: "St. Philip",
    latitude: 13.1,
    longitude: -59.45,
  },
  {
    name: "St. Thomas",
    latitude: 13.1833,
    longitude: -59.5667,
  },
];
