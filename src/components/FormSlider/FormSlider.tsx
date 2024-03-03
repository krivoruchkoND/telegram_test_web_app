import React from "react";
import ReactSlider from "react-slider";
import "./styles.css";

type Props = {
  value: number;
  onChange: (value: number) => any;
};

const FormSlider: React.FC<Props> = ({ value, onChange }) => {
  const [sliderLength, setSliderLength] = React.useState(0);

  React.useEffect(() => {
    const slider = document.querySelector(".slider") as HTMLDivElement;
    setSliderLength(slider.offsetWidth);
  }, []);

  return (
    <div className="slider-container">
      <div className="thumb absolute" />
      <ReactSlider
        className="slider"
        thumbClassName="thumb"
        trackClassName="track"
        markClassName="mark"
        min={0}
        max={100}
        step={5}
        value={value}
        onChange={onChange}
        renderMark={(props: any) => {
          let percent = 0;
          const forth = sliderLength / 4;
          const left = Number(props.style?.left ?? 0);
          const right = sliderLength - left;

          if (right < forth * 4) percent = 25;
          if (right < forth * 3) percent = 50;
          if (right < forth * 2) percent = 75;
          if (right < forth) percent = 100;

          const isActive = percent <= value;

          return (
            <div
              {...props}
              className={`${props.className} ${isActive && "active"}`}
            >
              {percent}%
            </div>
          );
        }}
        marks={[25, 50, 75, 100]}
      />
    </div>
  );
};

export default FormSlider;
