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

    // Start main loop
    step();
};

function populateWorld(board, desires){

    for(var i = 0; i < popSize; i++){
        var tBall = shapes.createBall(theWorld, getRandomIntRange(0, canvasWidth), getRandomIntRange(0, canvasHeight));
        var blip = new Blip(tBall, board, desires);
        blips[i] = blip;
    }
};

function applyForces(force, pos){
    for(var i = 0; i < blips.length; i++){
        var blip = blips[i];
        blip.applyForceFrom(pos);
    }
};

function blipsMove(){
    for(var i = 0; i < blips.length; i++){
        var tBlip = blips[i];
        tBlip.move(getSurroundingBlips(tBlip, blips));
    }
};

function blipsDraw(){
    for(var i = 0; i < blips.length; i++){
        var tBlip = blips[i];
        tBlip.draw();
    }
};

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
};

/* Main loop */
function step(cnt) {
    var stepping = false;
    var timeStep = 1.0/30;
    var iteration = 1;

    // Drawing...
    blipsMove();
    blipsDraw();

    theWorld.Step(timeStep, iteration);
    if(!reset){
        setTimeout('step(' + (cnt || 0) + ')', 10);
    }
};

function clearBoard(){
    board.Clear(canvasWidth * 2, canvasHeight * 2);
};

function resetWorld(){
    clearBoard();
    getGene();
};

function getGene(){
    // Make ajax call to api
    jQuery.ajax({
        url: "/genes.json"
    }).done(function(data){
        console.log("Got gene");
        useGene(data);
    });
};

function useGene(gene){
    // Generate desires from the gene
    var desires = generateDesires(gene.chromosomes);

    // Show them in the view
    showGeneratedDesires(desires);

    // Setup the world with the generated blip desires
    setupWorld(board, desires);
};

function showGeneratedDesires(desires){
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
});
