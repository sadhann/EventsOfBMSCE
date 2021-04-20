import React from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

function CongoAnimation() {
  const { width, height } = useWindowSize();
  return <Confetti width={width - 100} height={height * 10} gravity={0.2} />;
}

export default CongoAnimation;
