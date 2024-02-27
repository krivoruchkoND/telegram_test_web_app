import React from "react";

import { useSnipedChannelsStore } from "@stores/SnipedChannelsStore";

import classes from "../styles.module.css";

const AddChannelForm = () => {
  const channelLink = useSnipedChannelsStore((state) => state.channelLink);
  const setChannelLink = useSnipedChannelsStore(
    (state) => state.setChannelLink,
  );
  const addChannel = useSnipedChannelsStore((state) => state.addSnipedChannel);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChannelLink(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const formObject = Object.fromEntries(data.entries());

    if (
      "channelLink" in formObject &&
      typeof formObject.channelLink === "string"
    ) {
      addChannel(formObject.channelLink);
      setChannelLink("");
    }
  };

  return (
    <form className={classes.addChannel} onSubmit={(e) => handleSubmit(e)}>
      <input
        className={classes.input}
        name="channelLink"
        value={channelLink ?? ""}
        onChange={handleInput}
        placeholder="Paste link tg channel here"
      />
      <button className={classes.button}>
        <div className={classes.text}>Add channel</div>
      </button>
    </form>
  );
};

export default AddChannelForm;
