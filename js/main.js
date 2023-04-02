import { initShaderProgram } from "./glsl-program.js";
import { vboCube } from "./vbocube.js";
import { renderScene } from "./render.js";
import { onKeyUp, onMouseMove, onMouseUp } from "./event-handling.js";
// TODO: read about ES6
// Hint: https://www.w3schools.com/js/js_es6.asp

let config = {
    // model rotation and zoom
    angle_x: 0.0,
    angle_y: 0.0,
    deltaRotation: 0.01,
    zoom: 0.8,
    deltaZoom: 0.1,
    start_of_mouse_drag: null,

    // texture
    data_loaded: 0,
    update_texture: true,
    tf_id: 0,
    update_tf: true,
    tf: [
        [
            0.0, 0.0, 0.0, 0.0,
            1.0, 1.0, 1.0, 1.0
        ],
        [
            0.0, 0.0, 0.0, 0.0,
            1.0, 1.0, 1.0, 0.0,
            1.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0
        ],
        [
            0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0,
            0.15, 0.66, 1.0, 0.0,
            0.2, 0.66, 1.0, 0.35,
            0.25, 0.66, 1.0, 0.0,
            1.0, 1.0, 1.0, 0.0,
            1.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0
        ],
        [
            0.0, 0.0, 0.0, 0.0,
            1.0, 0.66, 0.66, 0.0,
            1.0, 0.66, 0.66, 0.35,
            1.0, 0.66, 0.5, 0.0,
            0.0, 0.0, 0.0, 0.0,
            1.0, 1.0, 1.0, 0.0,
            1.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0
        ],
        [
            0.0, 0.0, 0.0, 0.0,
            0.0, 0.5, 0.5, 0.0,
            0.0, 0.5, 0.5, 0.01,
            0.0, 0.5, 0.5, 0.0,
            0.5, 0.5, 0.0, 0.0,
            0.5, 0.5, 0.0, 0.2,
            0.5, 0.5, 0.0, 0.5,
            0.5, 0.5, 0.0, 0.2,
            0.5, 0.5, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0,
            1.0, 0.0, 1.0, 0.0,
            1.0, 0.0, 1.0, 0.8
        ]
    ],

    // TODO: set up your own customization variables
}

main();


async function main() {
    // TODO: read about webgl2
    // Hint: https://webgl2fundamentals.org/

    // canvas and gl context
    const canvas = document.querySelector("#glcanvas");
    const gl = canvas.getContext("webgl2");

    if (gl === null) {
        alert(
            "Unable to initialize WebGL. Your browser or machine may not support it."
        );
        return;
    }

    // TODO: set event listeners (callbacks)


    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // data
    config.data = [];
    config.data.push(await getData('/data/lobster.dat'));
    config.data.push(await getData('/data/skewed_head.dat'));

    // GLSL program
    const vsSource = await getShaders('/shaders/vertex.glsl');
    const fsSource = await getShaders('/shaders/fragment.glsl');
    config.program = initShaderProgram(gl, vsSource, fsSource);

    // VBO
    config.vao = vboCube(gl);

    // rendering scene
    function render() {
        renderScene(gl, config);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}


async function getShaders(path) {
    // TODO: load shaders
    // Hint: read about promises and fetch
}

async function getData(path) {
    // TOOD: read about arrays, typed arrays and their functions (e.g. map, slice, ...etc)
    // TODO: read about fetch, async and promises
    return fetch(path)
        .then(res => res.blob())
        .then(data => data.arrayBuffer())
        .then(buffer => new Uint16Array(buffer))
        .then(array => {
            return {
                vol_dim: Array.from(array.slice(0, 3)),
                data_array: new Float32Array(Array.from(array.slice(3).map(x => x << 4)).map(x => x / 65535.0))
            };
        });
}

// TODO: user interactions via DOM manipulation (e.g. input forms)