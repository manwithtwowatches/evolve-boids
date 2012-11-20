/* utils.js */
/* Common functions for draw_bot */

/* Begin Colour Methods */

function getHexColour(r, g, b){
    var rhex = r.toString(16);
    var ghex = g.toString(16);
    var bhex = b.toString(16);

    if(rhex.length < 2){
        rhex = "0" + rhex;
    }
    if(ghex.length < 2){
        ghex = "0" + ghex;
    }
    if(bhex.length < 2){
        bhex = "0" + bhex;
    }
    return "#" + rhex + ghex + bhex;
};

/* End Colour Methods */

/* Begin General Methods */

function getRandomInt(range){
    var low = -range / 2, high = range / 2;
    var r = Math.random();
    var n = Math.floor(r * (high - low + 1)) + low;

    return n;
};

function getRandomIntRange(low, high){
    var r = Math.random();
    var n = Math.floor(r * (high - low + 1)) + low;

    return n;
};

function getRandomFloat(range){
    return Math.random() * range;
};

function get2dArray(x, y){
    var theArray = new Array(y);
    for(var i = 0; i < y; i++){
        theArray[i] = new Array(x)
    }

    return theArray;
};

/* End General Methods */

/* Begin Matrix Methods */

function sumMatrix(m){
    var sum = 0;
    var p = m.elements[0];
    var width = p.length;
    var height = m.elements.length;

    for(var i = 0; i < height; i++){
        for(var j = 0; j < width; j++){
            sum += m.elements[i][j];
        }
    }
    return sum;
};

function getFlatArray(pMs){
    var flatA = [];
    var i, j, width, height;

    var t = pMs.reds.elements[0];
    width = pMs.reds.elements.length;
    height = t.length;

    for(i = 0; i < height; i ++){
        for(j = 0; j < width; j ++){
            flatA[(i * width * 4) + (j * 4)] = pMs.reds.elements[i][j];
            flatA[(i * width * 4) + (j * 4) + 1] = pMs.greens.elements[i][j];
            flatA[(i * width * 4) + (j * 4) + 2] = pMs.blues.elements[i][j];
            flatA[(i * width * 4) + (j * 4) + 3] = pMs.alphas.elements[i][j];
        }
    }
    return flatA;
};

function getPixelMatrices(pixels){
    // Get arrays of separate RGB values
    var i, j, c = 0;
    var reds = [], greens = [], blues = [], alphas = [];

    for(i = 0; i < pixels.length; i += 4){
        reds[c] = pixels[i];
        greens[c] = pixels[i + 1];
        blues[c] = pixels[i + 2];
        alphas[c] = pixels[i + 3];

        c++;
    }

    // Get pixels into matrices
    var edge = Math.sqrt(pixels.length / 4);
    var pixR = get2dArray(edge, edge);
    var pixG = get2dArray(edge, edge);
    var pixB = get2dArray(edge, edge);
    var pixA = get2dArray(edge, edge);

    for(i = 0; i < edge; i++){
        for(j = 0; j < edge; j++){
            pixR[i][j] = reds[(i * edge) + j];
            pixG[i][j] = greens[(i * edge) + j];
            pixB[i][j] = blues[(i * edge) + j];
            pixA[i][j] = alphas[(i * edge) + j];
        }
    }
    return {
        reds: $M(pixR),
        greens: $M(pixG),
        blues: $M(pixB),
        alphas: $M(pixA)
        };
};

/* End Matrix Methods */

/* Begin Test Methods */

function getTestPixels(r, g, b, length){
    var p = [], i;
    for(i = 0; i < length * 4; i += 4){
        p[i] = r;
        p[i + 1] = g;
        p[i + 2] = b;
        p[i + 3] = 255;
    }
    return p;
};

/* End Test Methods */