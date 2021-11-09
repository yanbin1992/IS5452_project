import React from "react";
import { Button, Input, notification, Progress, Spin } from "antd";
import { StopOutlined, SendOutlined } from "@ant-design/icons";

export default function ChatInput(props) {
  const [inputText, setInputText] = React.useState("");
  const [degree, setDegree] = React.useState(3);
  const [isLoading, setIsLoading] = React.useState(false);

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
    const apiURL = process.env.REACT_APP_BASE_URL
    await fetch(`${apiURL}/test/${props.model}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then(function (response) {
        openNotificationWithIcon("success");
        setIsLoading(false);
        return response.text();
      })
      .then(function (data) {
        setDegree(parseInt(data) + 1);
        props.Roblox(parseInt(data) + 1); // this will be a string
      })
      .catch((error) => {
        setIsLoading(false);
        openNotificationWithIcon("error");
        console.log(error);
      });
  };
  const onSubmit = async () => {
    // const randomeIndex= Math.floor(Math.random()*4 + 1)
    // props.Roblox(randomeIndex);
    setIsLoading(true);
    await postText(inputText);
    setInputText("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 1
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          zIndex: 1,
          margin:"5px 0"
        }}
      >
        <Input
          value={inputText}
          onChange={handleChange}
          style={{ width: "350px" }}
          disabled={isLoading}
        ></Input>
        <Button onClick={onSubmit} disabled={inputText === "" || isLoading}>
          {isLoading ? <Spin /> : "Submit"}
        </Button>
      </div>
      <Progress percent={((degree - 1) / 4) * 100} steps={4} />
    </div>
  );
}
