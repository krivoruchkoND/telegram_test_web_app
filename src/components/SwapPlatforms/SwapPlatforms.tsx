import dragHandleIcon from "@assets/DragHandle.svg";
import Switch from "@components/Switch";

const platforms = [
  {
    id: 1,
    name: "Jupiter",
  },
  {
    id: 2,
    name: "Radyum",
  },
];

const SwapPlatforms = () => {
  return (
    <>
      <Switch
        id="platforms"
        label="Swap platforms"
        subLabel="Auto"
        checked={true}
        onChange={() => null}
      />
      {platforms.map(({ id, name }) => (
        <div key={id}>
          <div>
            <img src={dragHandleIcon} />
          </div>
          <div>{name}</div>
        </div>
      ))}
      <div>Choosing a platform for swap</div>
    </>
  );
};

export default SwapPlatforms;
