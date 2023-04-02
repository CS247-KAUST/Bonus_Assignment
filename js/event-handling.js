function onKeyUp(event, config) {
    event.preventDefault();
    switch (event.key) {
        case "=":
            config.zoom += config.deltaZoom;
            break;
        case "-":
            config.zoom -= config.deltaZoom;
            break;
        case "1":
            config.data_loaded = 0;
            config.update_texture = true;
            break;
        case "2":
            config.data_loaded = 1;
            config.update_texture = true;
            break;
        // TODO: setup user inputs (e.g. tf, step_size, toggles/flags .. etc)      
    }
}

function onMouseMove(event, config) {
    if (event.buttons == 1) {
        event.preventDefault();
        var delta_x, delta_y;

        if (config.start_of_mouse_drag) {
            delta_x = event.clientX - config.start_of_mouse_drag.clientX;
            delta_y = -(event.clientY - config.start_of_mouse_drag.clientY);

            config.angle_x += delta_x * config.deltaRotation;
            config.angle_y += delta_y * config.deltaRotation;
        }
        config.start_of_mouse_drag = event;
    }
}

function onMouseUp(event, config) {
    event.preventDefault();
    config.start_of_mouse_drag = null;
}


export { onKeyUp, onMouseMove, onMouseUp };

