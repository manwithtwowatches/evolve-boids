/* board.js */
/* Provides the methods available to the agent to draw on the canvas */

function Board(theCanvas){
	this.canvas = theCanvas;
	this.drawPixels = 0;
};

/* Begin Observing Methods */

Board.prototype.GetSurroundingPixels = function(x, y, d){
	return this.canvas.getPixels(
			{
				x : x - d / 2,
	       		y : y - d / 2,
	       		width : d,
	       		height : d
			});
};

/* End Drawing Methods */

/* Begin Drawing Methods */

Board.prototype.GetAllPixels = function(){
	var ps = this.canvas.getPixels(
		{
			x : 0,
	       	y : 0,
	       	width : this.canvas[0].width,
	       	height : this.canvas[0].height
		});
	return ps;
};

Board.prototype.DrawPixels = function(x, y, width, height, pixelMatrices){
	// setPixels expects flat array of rgba
	var pixels = getFlatArray(pixelMatrices);
	return this.canvas.setPixelBlock(
	{
		x : x, y : y,
		width : width,
		height : height,
		pixels: pixels,
	});
};

Board.prototype.DrawCircle = function(colour, x, y, radius){
	this.canvas.drawArc({
		fillStyle: colour,
		x: x, y: y,
		radius: radius
	});
};

Board.prototype.DrawRect = function(colour, x, y, width, height, fromCenter){
	this.canvas.drawRect({
		fillStyle: colour,
		x: x, y: y,
		width: width,
		height: height,
		fromCenter: fromCenter
	});
};

Board.prototype.DrawEllipse = function(colour, x, y, width, height, fromCenter){
	this.canvas.drawArc({
		fillStyle: colour,
		x: x, y: y,
		width: width,
		height: height,
		fromCenter: fromCenter
	});
};

Board.prototype.Clear = function(canvasWidth, canvasHeight){
	this.canvas.drawRect({
		fillStyle: getHexColour(0,0,0),
		x: 0, y: 0,
		width: canvasWidth,
		height: canvasHeight
	});
};

/* End Drawing Methods */
