var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +      // Adding a vertex4 attribute in webGL 
    'void main(){\n' +                    // creating the function for the Vertex Shader
    '   gl_Position = a_Position;\n' +    // Assigning the position of the shader
    '}\n';                                // Ending the function

var FSHADER_SOURCE =
    'void main(){\n' +                                // creating the function for the Fragment Shader
    '   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // Setting the Fragment Shader color to red with alpha of 1
    '}\n';                                            // Ending the function

function main() {
    var canvas = document.getElementById('webgl');    // Grabbing the canvas element from the HTML file

    var gl = getWebGLContext(canvas);                 // Rendering the canvas
    if (!gl) {                                        // error log for canvas initialization
        console.log('unable to get rendering context for web gl');  // the error message
        return;                                                     // exits the program
    }                                                               // Curly brace

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {         // Initializing shaders with an inline function
        console.log('unable to load shaders');                      // Error log message
        return;                                                     // exits the program
    }                                                               // Curly brace

    // initializing the vertex buffers, error log message, exit the program
    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('failed to set the position');
        return;
    }

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, n);

}

function initVertexBuffers(gl) {
    var vertices = new Float32Array([
        0, 0.5, -0.5, -0.5, 0.5, -0.5
    ]);

    var n = 3;

    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('unable to create buffer object');
        return;

    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('failed to get source location');
        return;
    }

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(a_Position);

    return n;
}