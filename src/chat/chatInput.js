import React from "react";
import { Button, Input } from "antd";

export default function ChatInput(props) {
  const [inputText, setInputText] = React.useState("");
  const handleChange = (e) => {
    setInputText(e.target.value);
  };
  const postText = async (text)=>{
    const user =  { model:  1, test:  text  };
    const  response = await fetch('http:192.168.1.1/test', {
      method: 'POST',
      body: JSON.stringify(user)
    })
    const json = await response.json()
    return json
  }
  const onSubmit = async() => {
    const randomeIndex= Math.floor(Math.random()*4 + 1)
    props.Roblox(randomeIndex);

    // const getData = await postText(inputText)
    // props.Roblox(getData);

    setInputText("")
  };


  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Input value={inputText} onChange={handleChange}></Input>
      <Button onClick={onSubmit}> Submit</Button>
    </div>
  );
}
