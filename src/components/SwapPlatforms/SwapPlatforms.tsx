import { useAutobuySettingsStore } from "@stores/AutobuySettingsStore";
import dragHandleIcon from "@assets/DragHandle.svg";
import Switch from "@components/Switch";

const SwapPlatforms = () => {
  const swapPlatforms = useAutobuySettingsStore((state) => state.swapPlatforms);
  // const changeSwapPlatformsOrder = useAutobuySettingsStore(
  //   (state) => state.changeSwapPlatformsOrder,
  // );

  return (
    <>
      <Switch
        id="platforms"
        label="Swap platforms"
        subLabel="Auto"
        checked={true}
        onChange={() => null}
      />
      {swapPlatforms.map(({ id, title }) => (
        <div key={id}>
          <div>
            <img src={dragHandleIcon} />
          </div>
          <div>{title}</div>
        </div>
      ))}
      <div>Choosing a platform for swap</div>
    </>
  );
};

export default SwapPlatforms;
