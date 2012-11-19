/* utils.js */
/* Common functions for draw_bot */

/* Begin Blip Methods */

function generateDesires(gene){
    /*
        * h - home
        * n - random
        * c - cohesion
        * a - alignment
        * v - avoidance
        * m - max avoidance distance
        * s - sight
        * r - colour red
        * g - colour green
        * b - colour blue
        *
        * gene:
        * [d11, d21, p1, w1,
        *  d12, d22, p2, w2,
        *  ...]
        *
        *  eg.
        *  ['h', 'n', 0.04, 10,
        *   'c', 'a', 2.6,  3,
        *   ...]
        */

    // Always set home desire to 1 to normalise values
    var desires = {
        h: 1,
        n: null,
        c: null,
        a: null,
        v: null,
        m: null,
        s: null,
        r: null,
        g: null,
        b: null
    };

    var featureArray = getGeneAsArray(gene);
    while(!desiresSet(desires)){
        var feature = selectFeature(featureArray);
        setDesire(desires, feature);
    }

    return desires;
}

function setDesire(desires, feature){
    if(desires[feature.desire1] != null){
        if(desires[feature.desire2] != null){
            // Both set, nothing to do
        } else{
            // Set feature 2
            desires[feature.desire2] =
                desires[feature.desire1] * feature.proportion;
        }
    } else{
        if(desires[feature.desire2] != null){
            // Set feature 1
            desires[feature.desire1] =
                desires[feature.desire2] / feature.proportion;
        } else{
            // Neither set, nothing to do
        }
    }

    return desires;
}

function desiresSet(desires){
    for(var key in desires){
        if(desires[key] == null){
            return false;
        }
    }
    
    return true;
}

function getGeneAsArray(gene){
    
    var featureArray = [];
    for(i = 0; i < gene.size(); i = i + 4){
        featureArray[i / 4] =
        {
            "desire1": gene[i],
            "desire2": gene[i + 1],
            "proportion": gene[i + 2],
            "weight": gene[i + 3]
        }
    }

    return featureArray;
}

function selectFeature(featureArray){
    //TODO: Needs to take weights into account

    return featureArray[getRandomIntRange(0, featureArray.size() - 1)];
}

/* Return rgb values in the range [0, 1] maintaining proportion */
function normaliseColours(desires){
    var r = desires.r, g = desires.g, b = desires.b;
    var tot = r + b + g;

    return {
        r: r / tot,
        g: g / tot,
        b: b / tot
    }
}

/* End Blip Methods */

/* Begin General Methods */

function getRandomInt(range){
    var low = -range / 2, high = range / 2;
    var r = Math.random();
    var n = Math.floor(r * (high - low + 1)) + low;
	
    return n;
}

function getRandomIntRange(low, high){
    var r = Math.random();
    var n = Math.floor(r * (high - low + 1)) + low;
	
    return n;
}

function getRandomFloat(range){
    return Math.random() * range;
}

function get2dArray(x, y){
    var theArray = new Array(y);
    for(var i = 0; i < y; i++){
        theArray[i] = new Array(x)
    }
	
    return theArray;
}

/* End General Methods */

/* Begin Vector Methods */

function eucDistance(point1, point2){
    return Math.sqrt((point2.x - point1.x) * (point2.x - point1.x)
        + (point2.y - point1.y) * (point2.y - point1.y));
}

function averageVector(vectors){
    var xTot = 0, yTot = 0;
	
    for(var i = 0; i < vectors.length; i++){
        xTot += vectors[i].x;
        yTot += vectors[i].y;
    }
	
    return new b2Vec2(xTot / vectors.length, yTot / vectors.length);
}

/* End Vector Methods */

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
}

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
}

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
}

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
}

/* End Test Methods */