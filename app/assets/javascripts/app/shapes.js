shapes = {};
shapes.createBall = function(world, x, y, rad, fixed) {
	var ballSd = new b2CircleDef();
	if (!fixed) ballSd.density = 1.0;
	ballSd.radius = rad || 2;
	ballSd.restitution = 0.2;
	var ballBd = new b2BodyDef();
	ballBd.AddShape(ballSd);
	ballBd.position.Set(x,y);
	return world.CreateBody(ballBd);
};
shapes.initWorld = function(world) {
	/*
	Create stuff at startup
	demos.top.createBall(world, 350, 100, 50, true);
	*/
};