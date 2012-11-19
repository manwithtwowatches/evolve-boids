/* agent.js */

function Agent(x, y, board, agent){
	this.x = x;
	this.y = y;
	this.width = 20;
	this.height = 20;
	this.board = board;
	this.agent = agent;

	// Gene Variables
	this.moveGene = 20; //TODO: Extend this
}
/* Begin Properties*/

Agent.prototype.CentrePoint = function(){
	var a = {
		x : (this.x + this.width / 2),
		y : (this.y + this.height / 2)
	};
	
	return a;
}

/* End Properties*/

/* Begin Movement Methods */

Agent.prototype.Move = function(){

	sp = this.board.GetSurroundingPixels(this.x, this.y, 20);
	dirs = getDirectionDesires([0, 0.5, -0.5], sp);
	
	this.x = getNextXCoord(this.x, 20, dirs[1]);
	this.y = getNextYCoord(this.y, 20, dirs[0]); 

	this.RenderSelf();
}

function getDirectionDesires(rgbLikes, pixels){
	/* pixels is assumed to be a square with agent in the middle */
	var c = 0, i, j;

	var pMats = getPixelMatrices(pixels);

	var rTop = 0, gTop = 0, bTop = 0,
	    rBot = 0, gBot = 0, bBot = 0,
	    rLe = 0, gLe = 0, bLe = 0,
	    rRi = 0, gRi = 0, bRi = 0;
	var count = pixels.length / 4;
	var edge = Math.sqrt(count);
	
	rTop = sumMatrix(pMats.reds.minor(1, 1, edge / 2, edge)) / count / 2;
	gTop = sumMatrix(pMats.greens.minor(1, 1, edge / 2, edge)) / count / 2;
	bTop = sumMatrix(pMats.blues.minor(1, 1, edge / 2, edge)) / count / 2;
	
	rBot = sumMatrix(pMats.reds.minor(edge / 2, 1, edge / 2, edge)) / count / 2;
	gBot = sumMatrix(pMats.greens.minor(edge / 2, 1, edge / 2, edge)) / count / 2;
	bBot = sumMatrix(pMats.blues.minor(edge / 2, 1, edge / 2, edge)) / count / 2;
	
	rLe = sumMatrix(pMats.reds.minor(1, 1, edge, edge / 2)) / count / 2;
	gLe = sumMatrix(pMats.greens.minor(1, 1, edge, edge / 2)) / count / 2;
	bLe = sumMatrix(pMats.blues.minor(1, 1, edge, edge / 2)) / count / 2;

	rRi = sumMatrix(pMats.reds.minor(1, edge / 2, edge, edge / 2)) / count / 2;
	gRi = sumMatrix(pMats.greens.minor(1, edge / 2, edge, edge / 2)) / count / 2;
	bRi = sumMatrix(pMats.blues.minor(1, edge / 2, edge, edge / 2)) / count / 2;
	
	// -0.5 > rgbLikes < 0.5
	var vMov = (((rBot - rTop) / 255) * rgbLikes[0])
		+ (((gBot - gTop) / 255) * rgbLikes[1])
		+ (((bBot - bTop) / 255) * rgbLikes[2])
	
	var hMov = (((rRi - rLe) / 255) * rgbLikes[0])
		+ (((gRi - gLe) / 255) * rgbLikes[1])
		+ (((bRi - bLe) / 255) * rgbLikes[2])
	
	return [vMov, hMov];
}

function getNextXCoord(x, power, hWeight){
	/* Possible distance is dictated by the strength of the movement gene */
	
	hWeight *= getRandomFloat(1); // Weight is subjected to random importance
	var offset = (power / 2) * hWeight; //offset possible up to half the power
	var m = getRandomInt(power);
	return x + m + offset;
}

function getNextYCoord(y, power, vWeight){
	/* Possible distance is dictated by the strength of the movement gene */
	
	vWeight *= getRandomFloat(1); // Weight is subjected to random importance
	var offset = (power / 2) * vWeight; //offset possible up to half the power
	var m = getRandomInt(power);
	return y + m + offset;
}

/* End Movement Methods*/

/* Begin Drawing Methods */

Agent.prototype.Draw = function(){
	var sp = this.board.GetSurroundingPixels(this.x, this.y, 20);
	var pMats = getPixelMatrices(sp);
	//var tPix = getTestPixels(0, 255, 0, 400);
	//var pMats = getPixelMatrices(tPix);
	
	var edge = pMats.reds.elements.length;
	
	board.DrawPixels(this.x, this.y, edge, edge, pMats);
	//board.DrawCircle(selectColour(), this.x, this.y, 25);
}

function selectColour(){
	//TODO
	return 'white';
}

/* End Drawing Methods*/

/* Begin Rendering Methods */

Agent.prototype.RenderSelf = function(){
	// Get coords of top left of agent

	this.agent.css({
		left: (this.x - this.width / 2) + "px",
		top: (this.y - this.height / 2) + "px"
	});
}

/* End Rendering Methods */



