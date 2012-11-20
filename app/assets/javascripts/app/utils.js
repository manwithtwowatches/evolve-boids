/* utils.js */
/* Common functions for draw_bot */

/* Begin Blip Methods */

function generateDesires(chromosomes){
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

    //var featureArray = getGeneAsArray(gene);
    while(!desiresSet(desires)){
        var feature = selectFeature(chromosomes);
        setDesire(desires, feature);
    }

    return desires;
};

function setDesire(desires, feature){
    if(desires[feature.d1] != null){
        if(desires[feature.d2] != null){
            // Both set, nothing to do
        } else{
            // Set feature 2
            desires[feature.d2] =
                desires[feature.d1] * feature.proportion;
        }
    } else{
        if(desires[feature.d2] != null){
            // Set feature 1
            desires[feature.d1] =
                desires[feature.d2] / feature.proportion;
        } else{
            // Neither set, nothing to do
        }
    }

    return desires;
};

function desiresSet(desires){
    for(var key in desires){
        if(desires[key] == null){
            return false;
        }
    }
    return true;
};

function selectFeature(chromosomes){
    //TODO: Needs to take weights into account

    return chromosomes[getRandomIntRange(0, chromosomes.size() - 1)];
};

/* Return rgb values in the range [0, 1] maintaining proportion */
function normaliseColours(desires){
    var r = desires.r, g = desires.g, b = desires.b;
    var tot = r + b + g;

    return {
        r: r / tot,
        g: g / tot,
        b: b / tot
    }
};

/* End Blip Methods */

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

/* Begin Vector Methods */

function eucDistance(point1, point2){
    return Math.sqrt((point2.x - point1.x) * (point2.x - point1.x)
        + (point2.y - point1.y) * (point2.y - point1.y));
};

function averageVector(vectors){
    var xTot = 0, yTot = 0;
    for(var i = 0; i < vectors.length; i++){
        xTot += vectors[i].x;
        yTot += vectors[i].y;
    }
    return new b2Vec2(xTot / vectors.length, yTot / vectors.length);
};

/* End Vector Methods */

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