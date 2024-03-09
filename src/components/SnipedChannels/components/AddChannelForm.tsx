import React from "react";
import { observer } from "mobx-react-lite";

import useRootStore from "@hooks/useRootStore";

import classes from "../styles.module.css";

const AddChannelForm = () => {
  const {
    snipedChannelsStore: { channelLink, setChannelLink, addSnipedChannel },
  } = useRootStore();

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
      addSnipedChannel(formObject.channelLink);
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

export default observer(AddChannelForm);
