import AddChannelForm from "./components/AddChannelForm";
import ChannelList from "./components/ChannelList";

import classes from "./styles.module.css";

const SnipedChannels = () => {
  return (
    <div className={classes.snipeChannels}>
      <div className={classes.title}>Sniped channels (max 5)</div>
      <AddChannelForm />
      <ChannelList />
    </div>
  );
};

export default SnipedChannels;
