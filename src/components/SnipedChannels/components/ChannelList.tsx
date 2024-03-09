import { observer } from "mobx-react-lite";

import useRootStore from "@hooks/useRootStore";

import ChannelListItem from "./ChannelListItem";
import classes from "../styles.module.css";

const ChannelList = () => {
  const {
    snipedChannelsStore: { channels },
  } = useRootStore();

  if (channels.length === 0) {
    return null;
  }

  return (
    <ul className={classes.channelList}>
      {channels.map((channel) => (
        <ChannelListItem key={channel.id} channel={channel} />
      ))}
    </ul>
  );
};

export default observer(ChannelList);
