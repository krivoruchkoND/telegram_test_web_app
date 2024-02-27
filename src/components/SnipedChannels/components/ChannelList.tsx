import { useSnipedChannelsStore } from "@stores/SnipedChannelsStore";

import ChannelListItem from "./ChannelListItem";
import classes from "../styles.module.css";

const ChannelList = () => {
  const channels = useSnipedChannelsStore((state) => state.channels);

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

export default ChannelList;
