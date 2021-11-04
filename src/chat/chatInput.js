import React from "react";
import { Button, Input, notification, Progress } from "antd";
import { StopOutlined, SendOutlined } from "@ant-design/icons";

export default function ChatInput(props) {
  const [inputText, setInputText] = React.useState("");
  const [degree, setDegree] = React.useState(3);

  const openNotificationWithIcon = (type) => {
    const placement = props.model === 1 ? "topLeft" : "topRight";
    if (type === "error") {
      notification[type]({
        message: "Network Error",
        description: "Network connection error, please check",
        icon: <StopOutlined />,
        placement,
      });
    } else if (type === "success") {
      notification[type]({
        message: "Send",
        description: inputText,
        icon: <SendOutlined />,
        placement,
      });
    }
  };

  const openNotification = () => {
    notification.error({
      message: "Network Error",
      description: "Network connection error, please check",
      icon: <StopOutlined style={{ color: "#108ee9" }} />,
    });
  };

  const handleChange = (e) => {
    setInputText(e.target.value);
  };
  const postText = async (text) => {
    const body = `${text}`;
    await fetch(`http://54.151.249.241:8080/test/${props.model}`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body,
    })
      .then(function (response) {
        openNotificationWithIcon("success");
        return response.text();
      })
      .then(function (data) {
        setDegree(parseInt(data) + 1);
        props.Roblox(parseInt(data) + 1); // this will be a string
      })
      .catch((error) => {
        openNotificationWithIcon("error");
        console.log(error);
      });
  };
  const onSubmit = async () => {
    // const randomeIndex= Math.floor(Math.random()*4 + 1)
    // props.Roblox(randomeIndex);

    await postText(inputText);
    setInputText("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems:"center", zIndex: 1}}>
      <Input
        value={inputText}
        onChange={handleChange}
        style={{ width: "400px" }}
      ></Input>
      <Button onClick={onSubmit} disabled={inputText === ""}>
        Submit
      </Button>
      <Progress percent={degree / 5 * 100} steps={5} />
    </div>
  );
}
