import React, { Component } from "react";
import reactDom from "react-dom";
import * as THREE from "three"
import OrbitControls from "three-orbitcontrols";
import * as LayoutHelper from "./Helper/LayoutHelper"
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import { C_t} from "./Helper/CharaterHelper"


class Character_test extends Component {


    componentDidMount() {
      C_t()
        //ADD Your 3D Models here
        this.renderScene();
        //start animation
        this.start();
    }
    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate);
        }
    };
    stop = () => {
        cancelAnimationFrame(this.frameId);
    };
    animate = () => {
        //Rotate Models
        if (this.cube) this.cube.rotation.y += 0.01;
        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate);
    };

    renderScene = () => {
        if (this.renderer) this.renderer.render(this.scene, this.camera);
    };

    render() {
        return (<div
            style={{ width: LayoutHelper.windowHelper().width, height: LayoutHelper.windowHelper().height - 100 }}
            ref={mount => { this.mount = mount }}
        ><div className="loading" id="js-loader">
        <div className="loader"></div></div>
  
        <div className="wrapper">
        <canvas id="c"></canvas>
        
        </div></div>)
    }
}
export default Character_test;