import React, { Component } from "react";
import reactDom from "react-dom";
import * as THREE from "three"
import OrbitControls from "three-orbitcontrols";
import * as LayoutHelper from "./Helper/LayoutHelper"
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'


class Character extends Component {
    init() {
        let scene,
            renderer,
            camera,
            model,                              // Our character
            neck,                               // Reference to the neck bone in the skeleton
            waist,                               // Reference to the waist bone in the skeleton
            possibleAnims,                      // Animations found in our file
            mixer,                              // THREE.js animations mixer
            idle,                               // Idle, the default state our character returns to
            clock = new THREE.Clock(),          // Used for anims, which run to a clock instead of frame rate 
            currentlyAnimating = false,         // Used to check whether characters neck is being used in another anim
            raycaster = new THREE.Raycaster()
    }

    componentDidMount() {
        this.init()
        var backgroundColor = "#120d01"
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(backgroundColor)
        this.scene.fog = new THREE.Fog(backgroundColor, 60, 10)
        //Add Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor("#263238");
        this.renderer.setSize(width, height);
        this.renderer.shadowMap.enabled = true;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.mount.appendChild(this.renderer.domElement);
        //add Camera
        this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
        this.camera.position.x = 0;
        this.camera.position.y = -3;
        this.camera.position.z = 30;
        //Camera Controls
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        //LIGHTS
        var lights = [];
        lights[0] = new THREE.PointLight(0x304ffe, 1, 0);
        lights[1] = new THREE.PointLight(0xffffff, 1, 0);
        lights[2] = new THREE.PointLight(0xffffff, 1, 0);
        lights[0].position.set(0, 200, 0);
        lights[1].position.set(100, 200, 100);
        lights[2].position.set(-100, -200, -100);
        this.scene.add(lights[0]);
        this.scene.add(lights[1]);
        this.scene.add(lights[2]);

        let d = 8.25;
        let dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
        dirLight.position.set(-8, 12, 8);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
        dirLight.shadow.camera.near = 0.1;
        dirLight.shadow.camera.far = 1500;
        dirLight.shadow.camera.left = d * -1;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = d * -1;
        // Add directional Light to scene
        this.scene.add(dirLight);

        // Floor
        let floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
        let floorMaterial = new THREE.MeshPhongMaterial({
            color: 0xeeeeee,
            shininess: 0,
        });

        let floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -0.5 * Math.PI; // This is 90 degrees by the way
        floor.receiveShadow = true;
        floor.position.y = -11;
        this.scene.add(floor);

        const MODEL_PATH = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/stacy_lightweight.glb';
        var loader = new GLTFLoader();
        loader.load(
            MODEL_PATH,
            function (gltf) {
                // A lot is going to happen here
            },
            undefined, // We don't need this function
            function (error) {
                console.error(error);
            }
        );
        this.model = gltf.scene;
        let fileAnimations = this.gltf.animations;
        this.scene.add(this.model);

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
        />)
    }
}
export default Character;