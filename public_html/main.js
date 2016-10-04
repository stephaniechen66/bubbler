/* 
 * Final Project - Stephanie Chen
 */

"use strict";
var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");
window.addEventListener('resize', resizeCanvas,false);
canvas.addEventListener("mousedown", clickDown,false);
resizeCanvas();
dl.log = true; 
dl.setup(canvas);
var bubble;
var count = 30;
var audio = [];
var currAudio;
var focus;
var x1;
var y1;
var clicked;

for (var i = 0; i < 30; i++){
    var audioObj = document.getElementById(i);
    audio.push(audioObj);
};
    //adds audio objects into an array

function resizeCanvas() {
    canvas.height= window.innerHeight;
    canvas.width= window.innerWidth;
    dl.redraw();
    }
    //resizes canvas when window resizes and bubbles do not refresh
    
function clickDown(event){
    x1 = event.clientX - canvas.offsetLeft;
    y1 = event.clientY;
    focus = dl.getObjectContaining(x1,y1);
    if (focus !== null){
        focus.change();

        for (var n=0; n<30; n++){
            var object = dl.getObject(n);
            if (focus === object){
                var i = n;
            }
        }
        currAudio = audio[i];
        currAudio.currentTime = 0;
        if (clicked){
        currAudio.play();
    }
        if (!clicked){
        currAudio.pause();
        }
        //gets the position in the array of the bubble Object that has been clicked on, so it plays or pauses a unique audio file that is in the same position in its own array
        //clicked keeps track of whether the bubble has been clicked on or not so it acts appropriately
    }
}

(function (){

var Bubbles = function(x,y,radius,color,vx,vy){
    radius = getRandom(40,75);
    vx = getRandom(-3,3); 
    vy = getRandom(1,3);
    x = getRandom(0,canvas.width);
    y = getRandom(0,canvas.height);
    var r = (Math.random()*255).toFixed(0);
    var g = (Math.random()*255).toFixed(0);
    var b = (Math.random()*255).toFixed(0);
    color = 'rgba(' + r + ', ' +  g + ', ' + b + ', .3)';
    clicked = false;
    //defines a bubble with a constructor function using getRandom() and Math.random() functions
    
    this.draw = function(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x,y,radius,0,2*Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    };
    //draw function within the bubble object draws the bubble
    
    this.contains = function(inputX,inputY){
    var dist = Math.sqrt(Math.pow((x - inputX),2) + Math.pow((y - inputY),2));
    return (dist <= radius);
    };
    //contains functions returns boolean if x and y parameters are within the object
    
    this.change = function(){
        if (clicked){
            color = 'rgba(' + r + ', ' + g + ', ' + b + ', .3)';
            clicked = false;
        }
        else {
            color = 'rgba(' + r + ', ' + g + ', ' + b + ', 1)';
            clicked = true;
    }
        dl.redraw();
    };
    //changes opacity of the bubble depending on whether it is clicked or not
    
    this.moveTo = function(){
        if (x + radius > canvas.width){
            vx = -vx;
            x = canvas.width - radius;
        }
        if (x - radius < 0){
            vx = -vx;
            x = radius;
        }
        if (y + radius + radius > canvas.height){
            vy = -vy;
            y = canvas.height - radius - radius; // safari is weird
        }
        if (y - radius < 0){
            vy = -vy;
            y = radius;
        }
        x += vx;
        y += vy;
        dl.redraw();
    };
    //moveTo function moves the bubble object by vx and vy, which ultimately represents velocity 
   };

for (var n = 0; n < count; n++){
    bubble = new Bubbles();
    dl.addGraphicalObject(bubble);
    };
    //creates bubble objects and adds them into the DisplayList array
    
function moveBubbles(object){
    setInterval(function(){object.moveTo();},20);
};
    //executes the moveTo function every 20 milliseconds

for (var i = 0; i<count; i++){
    var curr = dl.getObject(i);
    moveBubbles(curr);
};
    //gets each object in the array and sends it to the moveBubbles function


})();

function getRandom(min, max){
    return Math.random() * (max - min) + min;
}
//getRandom function gets a random number within the specified range 




