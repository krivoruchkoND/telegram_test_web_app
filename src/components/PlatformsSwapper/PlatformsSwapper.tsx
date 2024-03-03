import React, { Dispatch, SetStateAction } from "react";

import Switch from "@components/Switch";

import classes from "./styles.module.css";
import Platform from "./components/Platform.tsx";

type Props = {
  isAutoPlatforms: boolean;
  setIsAutoPlatforms: Dispatch<SetStateAction<boolean>>;
  platforms: string[];
  setPlatforms: React.Dispatch<React.SetStateAction<string[]>>;
};

const PlatformsSwapper: React.FC<Props> = ({
  platforms,
  setPlatforms,
  isAutoPlatforms,
  setIsAutoPlatforms,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const toggleEditing = () => setIsEditing((isEditing) => !isEditing);

  const toggleAutoPlatforms = () => {
    if (isEditing) {
      setIsEditing(false);
    }

    setIsAutoPlatforms((isAutoPlatforms) => !isAutoPlatforms);
  };

  const handleClickUp = (index: number) => {
    return () => {
      setPlatforms((platforms) => {
        const newPlatforms = [...platforms];
        const temp = newPlatforms[index];
        newPlatforms[index] = newPlatforms[index - 1];
        newPlatforms[index - 1] = temp;
        return newPlatforms;
      });
    };
  };

  const handleClickDown = (index: number) => {
    return () => {
      setPlatforms((platforms) => {
        const newPlatforms = [...platforms];
        const temp = newPlatforms[index];
        newPlatforms[index] = newPlatforms[index + 1];
        newPlatforms[index + 1] = temp;
        return newPlatforms;
      });
    };
  };

  return (
    <div className={classes.swapper}>
      <div className={classes.header}>
        <div className={classes.header_left}>
          <label className={classes.label}>Swap platforms</label>

          <button
            className={classes.header_button}
            onClick={toggleEditing}
            disabled={isAutoPlatforms}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        <Switch
          id={""}
          label={""}
          subLabel={"Auto"}
          checked={isAutoPlatforms}
          onChange={toggleAutoPlatforms}
        />
      </div>

      <div className={classes.platforms}>
        {platforms.map((platform, index) => (
          <Platform
            key={platform}
            name={platform}
            isFirst={index === 0}
            isLast={index === platforms.length - 1}
            onClickUp={handleClickUp(index)}
            onClickDown={handleClickDown(index)}
            isEditing={isEditing}
          />
        ))}
      </div>

      <div className={classes.description}>Choosing a platform for swap</div>
    </div>
  );
};

export default PlatformsSwapper;
