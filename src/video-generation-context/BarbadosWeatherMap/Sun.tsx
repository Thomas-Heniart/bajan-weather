import { interpolate } from "remotion";
import sun from "./sun.png";
import { Img, useCurrentFrame } from "remotion";
import React from "react";

type Props = { top: string; left: string };

export const Sun = ({ top, left }: Props) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <Img
      style={{
        position: "absolute",
        top,
        left,
        opacity,
      }}
      src={sun}
    />
  );
};