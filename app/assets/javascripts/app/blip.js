/* blip.js */

function Blip(body, board, desires){
    this.body = body;
    this.board = board;
    this.desires = desires;
    this.state = {
        drawR: getRandomIntRange(0, 255),
        drawG: getRandomIntRange(0, 255),
        drawB: getRandomIntRange(0, 255)
    };

    this.modifyColours = function(){
        var ncd = normaliseColours(this.desires);

        this.state.drawR = this.modifyColour(this.state.drawR, ncd.r);
        this.state.drawG = this.modifyColour(this.state.drawG, ncd.g);
        this.state.drawB = this.modifyColour(this.state.drawB, ncd.b);
    };

    this.modifyColour = function(colour, desire){
        var urgency = 1 - (Math.abs(colour - 128) / 128);

        var weight = Math.floor(((desire * 2) - 0.5) * urgency);

        var modColour = colour + getRandomIntRange(-4, 4) + weight;
        if(modColour < 0 || modColour > 255){
            return colour;
        }
        return  modColour;
    };

    this.getCohesionVector = function(sBlips){
        var positions = [];

        if(sBlips.length > 0){
            for(var i = 0; i < sBlips.length; i++){
                var tc = sBlips[i].getCenterPosition();
                positions[i] = new b2Vec2(tc.x, tc.y);
            }

            // Get average position of surrounding blips
            var sCenter = averageVector(positions);

            var toCenter = new b2Vec2(sCenter.x - this.getCenterPosition().x, sCenter.y - this.getCenterPosition().y);
            var distance = eucDistance(sCenter, this.getCenterPosition());

            // Weight it...
            toCenter.Normalize();
            toCenter.Multiply(this.desires.c);
            toCenter.Multiply((distance / this.desires.s) * 50);

            return toCenter;
        }

        return null;
    };

    this.getAlignmentVector = function(sBlips){
        var velocities = [], averageVelocity;

        if(sBlips.length > 0){
            for(var i = 0; i < sBlips.length; i++){
                var tc = sBlips[i].getVelocity();
                velocities[i] = new b2Vec2(tc.x, tc.y);
            }

            averageVelocity = averageVector(velocities);
            averageVelocity.Normalize();
            averageVelocity.Multiply(this.desires.a);

            return averageVelocity;
        }

        return null;
    };

    this.getAvoidanceVector = function(sBlips){
        var closePositions = [], sCenter, toCenter;
        var i = 0, cb = 0;

        if(sBlips.length > 0){
            // Get close blips
            for(i = 0; i < sBlips.length; i++){
                var tc = sBlips[i].getCenterPosition();

                if(eucDistance(this.getCenterPosition(), tc) < this.desires.m){
                    closePositions[cb] = new b2Vec2(tc.x, tc.y);
                    cb++;
                }
            }

            if(closePositions.length > 0){
                // Get average position of close blips
                sCenter = averageVector(closePositions);

                var blipCenter = this.getCenterPosition();
                toCenter = new b2Vec2(sCenter.x - blipCenter.x, sCenter.y - blipCenter.y);

                // Weight it...
                toCenter.Normalize();
                toCenter.Multiply(this.desires.v);

                // Go away from this point
                toCenter = toCenter.Negative();

                return toCenter;
            }

        }

        return null;
    };

    this.getHomeVector = function(home){
        var blipCenter = this.getCenterPosition();
        toHome = new b2Vec2(home.x - blipCenter.x, home.y - blipCenter.y);
        var distance = eucDistance(home, blipCenter);

        // Weight it...
        toHome.Normalize();
        toHome.Multiply(this.desires.h);
        toHome.Multiply((distance * distance / 100) * this.desires.h);

        return toHome;
    };

    this.getFearVector = function(fObjects, fear){
    //Todo
    };

}

/* Begin Public Movement Methods */

Blip.prototype.applyForceFrom = function(fromPoint){
    // This is only really to allow testing manually with mouse
    var cPos = this.body.getCenterPosition();
    var distance = eucDistance(cPos, fromPoint);

    var reach = this.desires.s;

    if(distance < reach){
        var xCom = cPos.x - fromPoint.x, yCom = cPos.y - fromPoint.y;
        var weight = 1 - (distance / reach);
        var force = new b2Vec2(weight * xCom * 500000,
            weight * yCom * 500000);

        this.body.WakeUp();
        this.body.ApplyForce(force, fromPoint);

        return 1;
    }
    return 0;
}

Blip.prototype.move = function(otherBlips){
    var vs = [];

    // Random Movement
    var rForce = new b2Vec2(getRandomInt(2), getRandomInt(2));
    rForce.Normalize()
    rForce.Multiply(this.desires.n);

    // Cohesion
    var cohesion = this.getCohesionVector(otherBlips);

    // Alignment
    var alignment = this.getAlignmentVector(otherBlips);

    // Avoidance
    var avoidance = this.getAvoidanceVector(otherBlips);

    // Home
    var homePoint = new b2Vec2(400, 400); //TODO: get this from somewhere
    var home = this.getHomeVector(homePoint)

    this.body.WakeUp();


    if(cohesion != null){
        vs = [];
        vs[0] = rForce;
        vs[1] = cohesion;
        rForce = averageVector(vs);
    }

    if(alignment != null){
        vs = [];
        vs[0] = rForce;
        vs[1] = alignment;
        rForce = averageVector(vs);
    }

    if(avoidance != null){
        vs = [];
        vs[0] = rForce;
        vs[1] = avoidance;
        rForce = averageVector(vs);
    }

    if(home != null){
        vs = [];
        vs[0] = rForce;
        vs[1] = home;
        rForce = averageVector(vs);
    }

    this.body.ApplyForce(rForce, this.body.GetCenterPosition());

    return 0;
}

Blip.prototype.getCenterPosition = function(){
    return this.body.GetCenterPosition();
}

Blip.prototype.getVelocity = function(){
    return this.body.GetLinearVelocity();
}

/* End Public Movement Methods */

/* Begin Public Drawing Methods */

Blip.prototype.draw = function(){
    //TODO: Modify pixels
    var cPos = this.body.GetCenterPosition();

    this.modifyColours();
    var colour = getHexColour(this.state.drawR, this.state.drawG, this.state.drawB);
    board.DrawCircle(colour, cPos.x, cPos.y, 5);
}

/* End Public Drawing Methods */