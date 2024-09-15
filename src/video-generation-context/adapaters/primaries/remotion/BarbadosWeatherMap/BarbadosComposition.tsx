import styled from "styled-components";
import { AbsoluteFill, Img, Sequence } from "remotion";
import barbados from "./barbados.svg";
import { WeatherConditionImg } from "./WeatherConditionImg";
import React from "react";
import { BarbadosParish } from "../../../../../shared-context/business-logic/models/barbadosParishes";
import { WeatherCondition } from "../../../../../weather-context/business-logic/models/weather";
import { centers } from "./centers";

type Props = {
  parishesWeather: {
    parish: BarbadosParish;
    condition: WeatherCondition;
  }[];
};

export const BarbadosComposition = (props: Props) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#4A6473",
      }}
    >
      <BackgroundImage src={barbados} />
      <Sequence>
        {props.parishesWeather.map(({ parish, condition }) => {
          const { top, left } = centers.find(
            (center) => center.parish === parish,
          )!;
          return (
            <WeatherConditionImg condition={condition} top={top} left={left} />
          );
        })}
      </Sequence>
    </AbsoluteFill>
  );
};

const BackgroundImage = styled(Img)`
  height: 100%;
  width: 100%;
`;
