var initId = 0;
var theWorld;
var ctx;
var canvasWidth, canvasHeight, canvasTop, canvasLeft;
var blips = [], popSize = 20;
var board;
var pMats;
var reset = false;

function setupWorld(board, desires) {
    theWorld = createWorld();
    populateWorld(board, desires);
}

function populateWorld(board, desires){

    for(var i = 0; i < popSize; i++){
        var tBall = shapes.createBall(theWorld, getRandomIntRange(0, canvasWidth), getRandomIntRange(0, canvasHeight));
        var blip = new Blip(tBall, board, desires);
        blips[i] = blip;
    }
}

function applyForces(force, pos){
    for(var i = 0; i < blips.length; i++){
        var blip = blips[i];
        blip.applyForceFrom(pos);
    }
}

function blipsMove(){
    for(var i = 0; i < blips.length; i++){
        var tBlip = blips[i];
        tBlip.move(getSurroundingBlips(tBlip, blips));
    }
}

function blipsDraw(){
    for(var i = 0; i < blips.length; i++){
        var tBlip = blips[i];
        tBlip.draw();
    }
}

function getSurroundingBlips(blip, oBlips){
    var maxDistance = blip.desires.s;
    var sBlips = [], d = 0, c = 0;

    for(var i = 0; i < oBlips.length; i++){
        d = eucDistance(blip.getCenterPosition(), oBlips[i].getCenterPosition());
        if(d <= maxDistance && d != 0){
            sBlips[c] = oBlips[i];
            c++;
        }
    }

    return sBlips;
}

/* Main loop */
function step(cnt) {
    var stepping = false;
    var timeStep = 1.0/30;
    var iteration = 1;

    // Drawing...
    blipsMove();
    blipsDraw();

    // Movement only...
    //drawWorld(theWorld, ctx);

    theWorld.Step(timeStep, iteration);

    //board.DrawRect('#FF0000', 100, 100, 100, 100, 0);

    if(!reset){
        setTimeout('step(' + (cnt || 0) + ')', 10);
    }
}

function clearBoard(){
    board.Clear(canvasWidth * 2, canvasHeight * 2);
}

function resetWorld(){
    clearBoard();

    // Create test gene
    // This is where we'd get a gene from the server, for now we'll just generate one

    // Min set of proportions to populate all desires
    var testGeneMin = ['h', 'n', 200, 1,
        'n', 'c', 1, 1,
        'c', 'a', 0.25, 1,
        'a', 'v', 40, 1,
        'v', 'm', 0.01, 1,
        'm', 's', 3, 1,
        's', 'r', 5, 1,
        'r', 'g', 5, 1,
        'g', 'b', 5, 1];

    // A gene with a full list of pairings
    var testGeneFull = ['h', 'n', 2000, 1,
        'h', 'c', 2000, 1,
        'h', 'a', 2000, 1,
        'h', 'v', 2000, 1,
        'h', 'm', 2000, 1,
        'h', 's', 2000, 1,
        'n', 'c', 10, 1,
        'n', 'a', 10, 1,
        'n', 'v', 10, 1,
        'n', 'm', 10, 1,
        'n', 's', 10, 1,
        'c', 'a', 2.5, 1,
        'c', 'v', 2.5, 1,
        'c', 'm', 2.5, 1,
        'c', 's', 2.5, 1,
        'a', 'v', 400, 1,
        'a', 'm', 400, 1,
        'a', 's', 400, 1,
        'v', 'm', 0.1, 1,
        'v', 's', 0.1, 1,
        'm', 's', 30, 1,
        's', 'r', 5, 1,
        'r', 'g', 1, 1,
        'g', 'b', 1, 1];

    // TODO: Make this method
    // gene = getRandomGene()

    // Generate desires from the gene
    var desires = generateDesires(testGeneFull);

    // Show the generated desires on the page
    jQuery('#v_home').val(desires['h']);
    jQuery('#v_random').val(desires['n']);
    jQuery('#v_cohesion').val(desires['c']);
    jQuery('#v_alignment').val(desires['a']);
    jQuery('#v_avoidance').val(desires['v']);
    jQuery('#v_maxAvoidanceDistance').val(desires['m']);
    jQuery('#v_sight').val(desires['s']);
    jQuery('#v_red').val(desires['r']);
    jQuery('#v_green').val(desires['g']);
    jQuery('#v_blue').val(desires['b']);

    // Setup the world with the generated blip desires
    setupWorld(board, desires);
}

/* OnLoad event */
Event.observe(window, 'load', function() {
    ctx = $('canvas').getContext('2d');
    var canvasElm = $('canvas');
    canvasWidth = parseInt(canvasElm.width);
    canvasHeight = parseInt(canvasElm.height);
    canvasTop = parseInt(canvasElm.style.top);
    canvasLeft = parseInt(canvasElm.style.left);
    board = new Board(J('#canvas'));

    resetWorld();

    // Events
    jQuery('#btn_good').click(function(){
        resetWorld();
    });

    jQuery('#btn_bad').click(function(){
        resetWorld();
    });

    // Start main loop
    step();
});
