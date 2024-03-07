import React from "react";
import RCSlider from "rc-slider";
import "rc-slider/assets/index.css";

import { lerp, invlerp } from "@utils/interpolate";

import classes from "./styles.module.css";

type Props = {
  value: number;
  max: number;
  onChange: (value: number) => void;
};

const colors = {
  green: "#25A750",
  gray: "#191919",
};

const handleStyle: React.CSSProperties = {
  height: 20,
  width: 20,
  marginTop: -8,
  backgroundColor: "white",
  border: `3px solid ${colors.green}`,
  borderRadius: 20,
  opacity: 1,
};

const trackStyle: React.CSSProperties = {
  height: 2,
  backgroundColor: colors.green,
};

const railStyle: React.CSSProperties = {
  height: 2,
  backgroundColor: colors.gray,
};

const markStyle: React.CSSProperties = {
  userSelect: "none",
  marginTop: -20,
  fontFamily: "Inter",
  fontSize: 14,
  fontWeight: 600,
};

const marks = {
  0: { style: { ...markStyle, marginLeft: 2 }, label: "0%" },
  25: { style: markStyle, label: "25%" },
  50: { style: markStyle, label: "50%" },
  75: { style: markStyle, label: "75%" },
  100: { style: { ...markStyle, marginLeft: -8 }, label: "100%" },
};

const Slider: React.FC<Props> = ({ value, max, onChange }) => {
  const handleChange = (v: number | number[]) => {
    if (typeof v === "number") {
      onChange(lerp(0, max, v / 100));
    }
  };

  return (
    <div className={classes.slider}>
      <RCSlider
        value={invlerp(0, max, value) * 100}
        styles={{
          handle: handleStyle,
          track: trackStyle,
          rail: railStyle,
        }}
        min={0}
        max={100}
        marks={marks}
        step={0.00001}
        onChange={handleChange}
        defaultValue={0}
      />
    </div>
  );
};

export default Slider;
