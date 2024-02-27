import React from "react";

import { Channel, useSnipedChannelsStore } from "@stores/SnipedChannelsStore";

import classes from "../styles.module.css";

type Props = {
  channel: Channel;
};

const channelHasCallsCount = false;

const ChannelListItem: React.FC<Props> = ({ channel }) => {
  const remove = useSnipedChannelsStore((state) => state.removeSnipedChannel);

  return (
    <li className={classes.channel}>
      <div className={classes.contentWrapper}>
        <div className={classes.avatar}>
          {channel.imageUrl ? (
            <img src={channel.imageUrl} alt={channel.title} />
          ) : (
            channel.title[0].toUpperCase()
          )}
        </div>
        <div className={classes.content}>
          <div className={classes.title}>{channel.title}</div>
          {channelHasCallsCount && (
            <div className={classes.callsCount}>calls</div>
          )}
        </div>
      </div>
      <button className={classes.removeButton} onClick={() => remove(channel)}>
        remove
      </button>
    </li>
  );
};

export default ChannelListItem;