#version 300 es
// TODO: set precision for float

layout(location = 0) in vec3 aVertexPosition;

uniform mat4 uInvModelViewMatrix;

out vec3 eye;
out vec3 ray_dir;

void main() {
    vec3 pixel = aVertexPosition;
    eye = (uInvModelViewMatrix * vec4(pixel, 1)).xyz;
    ray_dir = (uInvModelViewMatrix * vec4(0, 0, -1, 1)).xyz;

    gl_Position = vec4(pixel, 1);
}