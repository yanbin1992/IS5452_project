import React from "react";
import { Button, Input } from "antd";

export default function ChatInput(props) {
  const [inputText, setInputText] = React.useState("");
  const handleChange = (e) => {
    setInputText(e.target.value);
  };
  const onSubmit = () => {
    const randomeIndex= Math.floor(Math.random()*4 + 1)
    props.Roblox(randomeIndex);
    setInputText("")
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Input value={inputText} onChange={handleChange}></Input>
      <Button onClick={onSubmit}> Submit</Button>
    </div>
  );
}
