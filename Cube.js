class Cube{
    constructor(){
        this.vertices = null;
        this.uvs = null;
        this.type = "cube";
        this.color = [1.0,1.0,1.0,1.0];
        this.matrix = new Matrix4();

        this.textureNum = 0;

        //lab 3
        this.vertexBuffer = gl.createBuffer();
        this.uvBuffer = gl.createBuffer();
        this.setUvs();
        this.setVertices();
    }
    //lab3
    setVertices() {
        // prettier-ignore
        this.vertices = new Float32Array([
          //FRONT
          -0.5,0.5,0.5, -0.5,-0.5,0.5, 0.5,-0.5,0.5,
          -0.5,0.5,0.5, 0.5,-0.5,0.5, 0.5,0.5,0.5,
          //LEFT
          -0.5,0.5,-0.5, -0.5,-0.5,-0.5, -0.5,-0.5,0.5,
          -0.5,0.5,-0.5, -0.5,-0.5,0.5, -0.5,0.5,0.5,
          //RIGHT
          0.5,0.5,0.5, 0.5,-0.5,0.5, 0.5,-0.5,-0.5,
          0.5,0.5,0.5, 0.5,-0.5,-0.5, 0.5,0.5,-0.5,
          //TOP
          -0.5,0.5,-0.5, -0.5,0.5,0.5, 0.5,0.5,0.5,
          -0.5,0.5,-0.5, 0.5,0.5,0.5, 0.5,0.5,-0.5,
          //BACK
          0.5,0.5,-0.5, 0.5,-0.5,-0.5, -0.5,0.5,-0.5,
          -0.5,0.5,-0.5, 0.5,-0.5,-0.5, -0.5,-0.5,-0.5,
          //BOTTOM
          -0.5,-0.5,0.5, -0.5,-0.5,-0.5, 0.5,-0.5,-0.5,
          -0.5,-0.5,0.5, 0.5,-0.5,-0.5, 0.5,-0.5,0.5
        ]);
      }
    //lab3 
    setUvs() {
        // prettier-ignore
        // TOP LEFT, BOTTOM LEFT, BOTTOM RIGHT, ???, ???, TOP RIGHT
        this.uvs = new Float32Array([
          // FRONT = TWO
          0.25, 0.5,   0.25, 0.25,  0.5, 0.25,   0.25, 0.5,   0.5, 0.25,   0.5, 0.5,
          // LEFT = FIVE
          0.5, 0.25,   0.5, 0,      0.75, 0,     0.5, 0.25,   0.75, 0,     0.75, 0.25,    
          // RIGHT = SIX
          0.5, 0.75,   0.5, 0.5,    0.75, 0.5,   0.5, 0.75,   0.75, 0.5,   0.75, 0.75,
          // TOP = ONE 
          0.25, 0.25,  0.25, 0.5,   0, 0.5,      0.25, 0.25,  0, 0.5,      0,0.25,
          // BACK = FOUR
          0.75, 0.5,   0.75, 0.25,  1, 0.5,     0.75, 0.5,   1, 0.25,     1, 0.5,         
          // BOTTOM = THREE
          0.5, 0.5,    0.5, 0.25,   0.75, 0.25,  0.5, 0.5,    0.75, 0.25,  0.75, 0.5
        ]);
      }

    render(){
        var rgba = this.color;

        gl.uniform1i(u_whichTexture, this.textureNum);
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        
        drawTriangle3DUVNormal([0.0, 0.0, 0.0,  1.0, 1.0, 0.0,  1.0, 0.0, 0.0], [0.0, 0.0,  1.0, 1.0,  1.0,0.0], [0.0,0.0,-1.0, 0.0,0.0,-1.0, 0.0,0.0,-1.0]);
        drawTriangle3DUVNormal([0.0, 0.0, 0.0,  0.0, 1.0, 0.0,  1.0, 1.0, 0.0], [0.0, 0.0,  0.0, 1.0,  1.0,1.0], [0.0,0.0,-1.0, 0.0,0.0,-1.0, 0.0,0.0,-1.0]);
        
        drawTriangle3DUVNormal([0.0, 1.0, 0.0,  0.0, 1.0, 1.0,  1.0, 1.0, 1.0], [0.0, 0.0,  0.0, 1.0,  1.0,1.0], [0.0,1.0,0.0,  0.0,1.0,0.0,  0.0,1.0,0.0]);
        drawTriangle3DUVNormal([0.0, 1.0, 0.0,  1.0, 1.0, 1.0,  1.0, 1.0, 0.0], [0.0, 0.0,  1.0, 1.0,  1.0,0.0], [0.0,1.0,0.0,  0.0,1.0,0.0,  0.0,1.0,0.0]);

        drawTriangle3DUVNormal([1.0, 0.0, 0.0,  1.0, 1.0, 0.0,  1.0, 1.0, 1.0], [0.0,0.0,   0.0,1.0,   1.0,1.0], [1.0,0.0,0.0,  1.0,0.0,0.0,  1.0,0.0,0.0]);
        drawTriangle3DUVNormal([1.0, 0.0, 0.0,  1.0, 0.0, 1.0,  1.0, 1.0, 1.0], [0.0,0.0,   1.0,1.0,   1.0,0.0], [1.0,0.0,0.0,  1.0,0.0,0.0,  1.0,0.0,0.0]);
        
        drawTriangle3DUVNormal([0.0, 0.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 1.0], [0.0,0.0,   0.0,1.0,   1.0,1.0], [-1.0,0.0,0.0, -1.0,0.0,0.0, -1.0,0.0,0.0]);
        drawTriangle3DUVNormal([0.0, 0.0, 0.0,  0.0, 0.0, 1.0,  0.0, 1.0, 1.0], [0.0,0.0,   1.0,1.0,   1.0,0.0], [-1.0,0.0,0.0, -1.0,0.0,0.0, -1.0,0.0,0.0]);
        
        drawTriangle3DUVNormal([0.0, 0.0, 0.0,  0.0, 0.0, 1.0,  1.0, 0.0, 1.0], [0.0,0.0,   0.0,1.0,   1.0,1.0], [0.0,-1.0,0.0,  0.0,-1.0,0.0, 0.0,-1.0,0.0] );
        drawTriangle3DUVNormal([0.0, 0.0, 0.0,  1.0, 0.0, 1.0,  1.0, 0.0, 0.0], [0.0,0.0,   1.0,1.0,   0.0,0.0], [0.0,-1.0,0.0,  0.0,-1.0,0.0, 0.0,-1.0,0.0] );

        drawTriangle3DUVNormal([0.0, 0.0, 1.0,  1.0, 1.0, 1.0,  1.0, 0.0, 1.0], [0.0,0.0,   0.0,1.0,   1.0,1.0], [0.0,0.0,1.0,   0.0,0.0,1.0,  0.0,0.0,1.0]);
        drawTriangle3DUVNormal([0.0, 0.0, 1.0,  0.0, 1.0, 1.0,  1.0, 1.0, 1.0], [0.0,0.0,   1.0,1.0,   1.0,0.0], [0.0,0.0,1.0,   0.0,0.0,1.0,  0.0,0.0,1.0]); 
   } 

   renderfast(){
        var rgba = this.color;

        // Pass the color of a point to u_FragColor variable
        gl.uniform1i(u_whichTexture, this.textureNum);
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Position);


        gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.uvs, gl.DYNAMIC_DRAW);
        gl.vertexAttribPointer(a_UV, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_UV);
        gl.drawArrays(gl.TRIANGLES, 0, this.uvs.length/3);



        /*
        var allverts = [];
        //front
        allverts = allverts.concat([0,0,0,  1, 1, 0,  1,0,0]);
        allverts = allverts.concat([0,0,0,  0, 1, 0,  1,1,0]);

        allverts = allverts.concat([0,1,0,  0,1,1,  1,1,1]);
        allverts = allverts.concat([0,1,0,  1,1,1,  1,1,0]);

        allverts = allverts.concat([0,1,1,1,1,1,1,0,1]);
        allverts = allverts.concat([0,1,1,1,0,1,0,0,1]);

        allverts = allverts.concat([1,1,1,1,1,0,1,0,0]);
        allverts = allverts.concat([1,1,1,1,0,0,1,0,1]);
        
        allverts = allverts.concat([0,0,1,1,0,1,1,0,0]);
        allverts = allverts.concat([0,0,1,1,0,0,0,0,0]);

        allverts = allverts.concat([1,1,1,0,1,1,0,1,0]);
        allverts = allverts.concat([1,1,1,0,1,0,1,1,0]);
        drawTriangle3D(allverts);
        */
    }
}