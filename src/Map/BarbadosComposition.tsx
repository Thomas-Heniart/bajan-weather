import styled from "styled-components";
import { AbsoluteFill, Img, Sequence } from "remotion";
import barbados from "./barbados.svg";
import { Sun } from "./Sun";
import { centers } from "./centers";

export const BarbadosComposition = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#4A6473",
      }}
    >
      <BackgroundImage src={barbados} />
      <Sequence>
        {centers.map(({ top, left }) => (
          <Sun top={top} left={left} />
        ))}
      </Sequence>
    </AbsoluteFill>
  );
};

const BackgroundImage = styled(Img)`
  height: 100%;
  width: 100%;
`;
