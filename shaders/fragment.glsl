#version 300 es
// TODO: set precision for float and samplers

in vec3 eye;
in vec3 ray_dir;

uniform sampler3D uVolume;
uniform sampler2D uTransferFunction;

// TODO: load other custom uniforms

out vec4 dest;

vec2 intersectBox(vec3 eye, vec3 ray_dir) {
    // cube dim
    vec3 boxmin = vec3(-1.0);
    vec3 boxmax = vec3(1.0);

    // compute intersection of ray with all six bbox planes
    vec3 invR = 1.0 / ray_dir;
    vec3 tbot = invR * (boxmin - eye);
    vec3 ttop = invR * (boxmax - eye);

    // re-order intersections to find smallest and largest on each axis
    vec3 tmin = min(ttop, tbot);
    vec3 tmax = max(ttop, tbot);

    // find the largest tmin and the smallest tmax
    float largest_tmin = max(max(tmin.x, tmin.y), max(tmin.x, tmin.z));
    float smallest_tmax = min(min(tmax.x, tmax.y), min(tmax.x, tmax.z));

    float tnear = largest_tmin;
    float tfar = smallest_tmax;

    return vec2(tnear, tfar);
}

void main() {
    // initialize color and opacity rgba
    dest = vec4(0);
    vec4 src; 
    

    // compute bounding box
    // this is another method of computing the ray, instead of the frontface and backface textures
    vec2 intersect = intersectBox(eye, ray_dir);

    float tnear = intersect.x;
    float tfar = intersect.y;

    if(tfar < tnear) {
        return;
    }

    tnear = max(tnear, -1.0);

    // entry position + ray direction
    vec3 position = eye + ray_dir * tfar;

    // TODO: volume rendering loop
    // Hint: to advance the position: position = position - ray_dir * step_size;
}
