/**
 * Created by Philipp Wahle on 20.01.2015.
 */

var dragH = document.querySelector('#draggable-h');
var dragV = document.querySelector('#draggable-v');

var dragPosX = 0;
var dragPosY = 0;

// position auf der navigation
/*
  left-top      right-top
  left-bottom   right-bottom
 */
var currentPosition = {
    orientationX : "left",
    orientationY : "top"
};

var lastPosition =  {
    orientationX : "right",
    orientationY : "bottom"
};

$(window).load(function() {
    getDragPosition();
    $('#draggable-h').css("left", dragPosX);
    $("#draggable-v").css("top", dragPosY);
    console.log(dragPosX +  " " + dragPosY);
});

function getDragPosition() {
    dragPosX = $('.main').width()/2 - $('#draggable-h').width()/2;
    dragPosY = $('.main').height()/2 - $('#draggable-v').height()/2;
}
var draggieV = new Draggabilly(dragV, {
    axis: 'y',
    containment: '.main'
});

var draggieH = new Draggabilly(dragH, {
    axis: 'x',
    containment: '.main'
});

function onDragMoveH(instance, event, pointer) {
    dragPosX = instance.position.x + $('#draggable-h').width()/2;
    var centerWidth = $(".main").width()/2;
    saveLastPosition();
    currentPosition.orientationX = centerWidth<dragPosX? "left" : "right";
    updateNavigation();
    setSectionPos();
}

function onDragMoveV(instance, event, pointer) {
    dragPosY = instance.position.y +  $('#draggable-v').height()/2;
    var centerHeight = $(".main").height()/2;
    saveLastPosition();
    currentPosition.orientationY = centerHeight<dragPosY? "top" : "bottom";
    updateNavigation();
    setSectionPos();
}

function setSectionPos() {
    var per = getPercentage();
    var first = "inset(0% " + per.verticalInverted + "% " + per.horizontalInverted + "%  0% )";
    var second = "inset(0% 0% " + per.horizontalInverted + "% " + per.vertical + "% )";
    var third = "inset(" + per.horizontal + "% " +  per.verticalInverted + "% 0%  0% )";
    var fourth = "inset(" + per.horizontal + "% 0% 0% " +  per.vertical + "%)";
    $(".first").css("-webkit-clip-path", first);
    $(".second").css("-webkit-clip-path", second);
    $(".third").css("-webkit-clip-path", third);
    $(".fourth").css("-webkit-clip-path", fourth);
}

function getPercentage() {
    var widthPos = dragPosX /  $(".main").width() * 100;
    var heightPos = dragPosY /  $(".main").height() * 100;
    return {
        vertical: widthPos,
        verticalInverted: 100-widthPos,
        horizontal: heightPos,
        horizontalInverted: 100-heightPos
    };
}

// bind event listener
draggieV.on('dragMove', onDragMoveV);
draggieH.on('dragMove', onDragMoveH);

// add css position to navigation

function updateNavigation(){
    removePositionToNavigation();
    addPositionToNavigation();
 //   animateSlider();
}

function addPositionToNavigation(){
    if(currentPosition.orientationX == "left" && currentPosition.orientationY == "top")
        $(".one").addClass("activeSlide");
    if(currentPosition.orientationX == "right" && currentPosition.orientationY == "top")
        $(".two").addClass("activeSlide");
    if(currentPosition.orientationX == "left" && currentPosition.orientationY == "bottom")
        $(".three").addClass("activeSlide");
    if(currentPosition.orientationX == "right" && currentPosition.orientationY == "bottom")
        $(".four").addClass("activeSlide");
}

function removePositionToNavigation(){
    if(lastPosition.orientationX === "left" && lastPosition.orientationY === "top")
        $(".one").removeClass("activeSlide");
    if(lastPosition.orientationX === "right" && lastPosition.orientationY == "top")
        $(".two").removeClass("activeSlide");
    if(lastPosition.orientationX == "left" && lastPosition.orientationY == "bottom")
        $(".three").removeClass("activeSlide");
    if(lastPosition.orientationX == "right" && lastPosition.orientationY == "bottom")
        $(".four").removeClass("activeSlide");
}

function animateSlider() {
    if(currentPosition.orientationX == "left")
    {

    }
    if(currentPosition.orientationX == "right"){

    }
}

function saveLastPosition(){
    if(lastPosition.orientationX != currentPosition.orientationX)
    lastPosition.orientationX = currentPosition.orientationX;
    if(lastPosition.orientationY != currentPosition.orientationY)
    lastPosition.orientationY = currentPosition.orientationY;
}

function debugPosition(){
    console.log("curPos X: " + currentPosition.orientationX);
    console.log("curPos Y: " + currentPosition.orientationY);
    console.log("oldPos X: " + lastPosition.orientationX);
    console.log("oldPos Y: " + lastPosition.orientationY);
}