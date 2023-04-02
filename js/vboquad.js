function vboQuad(gl) {
    // data
    const positions = [
        -1., -1, 0.5,
        1., -1, 0.5,
        1., 1., 0.5,
        -1., 1., 0.5
    ];
    const indices = [
        0,1,2,0,2,3
    ];

    // vertex array buffer
    const vao = gl.createVertexArray();
	gl.bindVertexArray(vao);

    // vertex buffer object
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
	gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    const ebo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
    gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices),
        gl.STATIC_DRAW
    );

    return vao;
}



export { vboQuad };