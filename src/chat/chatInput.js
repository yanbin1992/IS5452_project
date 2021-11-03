import React from "react";
import { Button, Input } from "antd";
import axios from "axios";

export default function ChatInput(props) {
  const [inputText, setInputText] = React.useState("");
  const [degree, setDegree] = React.useState(3);
  const handleChange = (e) => {
    setInputText(e.target.value);
  };
  const postText = async (text) => {
    const body = `1,${text}`;
    await fetch("http://18.141.147.2:8080/test", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      // mode: "no-cors",
      body,
    })
      .then(function (response) {
        return response.text();
      })
      .then(function (data) {
        setDegree(parseInt(data) + 1);
        props.Roblox(parseInt(data) + 1); // this will be a string
      });
  };
  const onSubmit = async () => {
    // const randomeIndex= Math.floor(Math.random()*4 + 1)
    // props.Roblox(randomeIndex);

    await postText(inputText);
    setInputText("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Input
        value={inputText}
        onChange={handleChange}
        style={{ width: "400px" }}
      ></Input>
      <Button onClick={onSubmit} disabled={inputText === ""}>
        Submit
      </Button>
      <div>{degree - 1}</div>
    </div>
  );
}
