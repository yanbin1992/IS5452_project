import React, { Component } from "react";
import * as LayoutHelper from "./Helper/LayoutHelper";
import { Stacy } from "./Helper/stacyCharaterHelper";
import { Roblox } from "./Helper/robloxCharaterHelper";
import { Roblox2 } from "./Helper/robloxCharaterHelper2";
import { Female } from "./Helper/femaleCharaterHelper";
import ChatInput from "./chat/chatInput";
import { Button, Input } from "antd";

export default class CharacterRun extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLoad: true,
      robloxShow1: true,
      stacyShow: false,
    };
  }

  componentDidMount() {
    if (this.state.initLoad) {
      this.setState({ ...this.state, initLoad: false });
    }
  }

  render() {
    if (this.state.initLoad === false) {
      Roblox(3);
      if (this.state.stacyShow === true) {
        Stacy(5);
      } else {
        Female(3);
      }
    }

    const handleChangeModel = () => {
      console.log("changeModel");
      this.setState({ ...this.state, stacyShow: !this.state.stacyShow });
    };

    return (
      <div
        style={{
          display: "flex",
          justifyContent:
            LayoutHelper.windowHelper().width >
            LayoutHelper.windowHelper().height
              ? "space-around"
              : "center",
        }}
        ref={(mount) => {
          this.mount = mount;
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <Button onClick={() => Roblox(1)}>Test_1</Button>
              <Button onClick={() => Roblox(2)}>Test_2</Button>
              <Button onClick={() => Roblox(3)}>Test_3</Button>
              <Button onClick={() => Roblox(4)}>Test_4</Button>
              <Button onClick={() => Roblox(5)}>Test_5</Button>
            </div>
            <ChatInput Roblox={Roblox} model={1} style={{ width: "300px" }} />
          </div>
          <canvas
            id="d"
            style={{
              position: "absolute",
              top: "50px",
              left: 0,
              width:
                LayoutHelper.windowHelper().width >
                LayoutHelper.windowHelper().height
                  ? LayoutHelper.windowHelper().width / 2
                  : LayoutHelper.windowHelper().width,
              height: LayoutHelper.windowHelper().height - 100,
              zIndex: -1,
            }}
          ></canvas>
        </div>
        {/* <Button onClick={handleChangeModel} style={{ height: "40px" }}>
          {this.state.stacyShow ? "Compare to Roblox2" : "Compare to Stacy"}
        </Button> */}

        <div className="container">
          {this.state.stacyShow ? (
            <Button onClick={() => Stacy(5)}>Test</Button>
          ) : (
            <div
              style={{
                display:
                  LayoutHelper.windowHelper().width >
                  LayoutHelper.windowHelper().height
                    ? "flex"
                    : "none",

                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <div>
                <Button onClick={() => Roblox2(1)}>Test_1</Button>
                <Button onClick={() => Roblox2(2)}>Test_2</Button>
                <Button onClick={() => Roblox2(3)}>Test_3</Button>
                <Button onClick={() => Roblox2(4)}>Test_4</Button>
                <Button onClick={() => Roblox2(5)}>Test_5</Button>
              </div> */}
              <div>
                <Button onClick={() => Female(1)}>Test_1</Button>
                <Button onClick={() => Female(2)}>Test_2</Button>
                <Button onClick={() => Female(3)}>Test_3</Button>
                <Button onClick={() => Female(4)}>Test_4</Button>
                <Button onClick={() => Female(5)}>Test_5</Button>
              </div>
              <ChatInput Roblox={Female} model={2} style={{ width: "300px" }} />
            </div>
          )}
          <canvas
            id="c"
            style={{
              position: "absolute",
              top: "50px",
              right: 0,
              width:
                LayoutHelper.windowHelper().width >
                LayoutHelper.windowHelper().height
                  ? LayoutHelper.windowHelper().width / 2
                  : 0,
              height: LayoutHelper.windowHelper().height - 100,
              zIndex: -1,
            }}
          ></canvas>
        </div>
      </div>
    );
  }
}
