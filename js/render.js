function renderScene(gl, program, config) {
    // clear scene
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // update texture
    if (config.update_texture) {
        config.texture = downloadVolumeAsTexture(gl, config);
        config.update_texture = false;
    }
    if (config.update_tf) {
        config.tf_texture = downloadTransferFunctionTexture(gl, config);
        config.update_tf = false;

    }
    // set the modelView matrix
    // TODO: read about glmatrix library https://glmatrix.net/docs/
    const modelViewMatrix = mat4.create();
    mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0]);
    mat4.rotate(modelViewMatrix, modelViewMatrix, config.angle_x, [0, 1, 0]);
    mat4.rotate(modelViewMatrix, modelViewMatrix, config.angle_y, [1, 0, 0]);
    mat4.scale(modelViewMatrix, modelViewMatrix, [config.zoom, config.zoom, config.zoom]);

    let vol_dim = config.data[config.data_loaded].vol_dim;
    let longestAxis = Math.max(...vol_dim);
    let volume_scale = [vol_dim[0] / longestAxis, vol_dim[1] / longestAxis, vol_dim[2] / longestAxis];
    mat4.scale(modelViewMatrix, modelViewMatrix, volume_scale);

    // set inverse modelView matrix
    const invModelViewMatrix = mat4.create();
    mat4.invert(invModelViewMatrix, modelViewMatrix);

    // set uniforms
    gl.useProgram(config.program);
    
    gl.uniformMatrix4fv(
        gl.getUniformLocation(config.program, "uInvModelViewMatrix"),
        false,
        invModelViewMatrix
    );

    // customization uniforms
    // TODO: set up your own uniforms (e.g. step_size, enable_lighting, ...etc)

    // texture
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_3D, config.texture);
    gl.uniform1i(gl.getUniformLocation(config.program, "uVolume"), 0);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, config.tf_texture);
    gl.uniform1i(gl.getUniformLocation(config.program, "uTransferFunction"), 1);

    // draw
    gl.bindVertexArray(config.vao);
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
}


function downloadVolumeAsTexture(gl, config) {

    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_3D, texture);

    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    gl.texImage3D(
        gl.TEXTURE_3D,
        0,
        gl.R16F,
        config.data[config.data_loaded].vol_dim[0],
        config.data[config.data_loaded].vol_dim[1],
        config.data[config.data_loaded].vol_dim[2],
        0,
        gl.RED,
        gl.FLOAT,
        config.data[config.data_loaded].data_array
    );

    return texture;
}

function downloadTransferFunctionTexture(gl, config) {

    const tf_texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, tf_texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // TODO: set texImage2D. 
    // Hint: you might find this link helpful https://webgl2fundamentals.org/webgl/lessons/webgl-data-textures.html
    // TODO: why do you need to use 2D textures instead of 1D?

    return tf_texture;
}


export { renderScene };