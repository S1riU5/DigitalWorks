var dragH = document.querySelector('#draggable-h');
var dragV = document.querySelector('#draggable-V');

var draggiePos = 0;
var draggerSize = 30;
var draggieV = new Draggabilly(dragV, {
    axis : 'y',
    containment: '.main'
});

var draggieH = new Draggabilly(dragH, {
    axis : 'x',
    containment: '.main'
});



$(document).ready(function() {
    //loadImages();
    var ww = $(window).width();
    var pos = ($(window).width() / 2 - draggerSize/2) / ww * 100 ;
    console.log("Redy pos " +pos);
    $(".draggie-vertical").css("left",pos+"%");
  //  initValue = getPercentage();
   // animateBulletOnReady();
});

$(window).resize(function() {
    //console.log("#name width " + draggiePos);

    var sectionPos = getPercentage();
    console.log("resize width: " +  $(window).width() );
    //console.log("percentage " + (initValue-sectionPos) );
    setSectionPos(100-sectionPos, sectionPos)
});


function animateBulletOnReady() {
    $(".draggie").animate({
        left: "80%"
    }, 1000).animate({
        left: "20%"
    }, 1000).animate({
            left: "50%"
    }, 700)
}

function getPercentage() {
    return draggiePos /  $(window).width() * 100;
}


function setBullet() {
    var pos = $(window).width() / 2 - draggerSize/2;
    $(".draggie").css("left",pos+"%");
}

function trackPos() {
    var pos = (instance.position.x + draggerSize/2) / windowWidth * 100
}

function onDragMove( instance, event, pointer ) {
    draggiePos = (instance.position.x + draggerSize/2);
    var sliderpos =  getPercentage();

    //sliderpos = sliderpos < .5 ? 0.5 : sliderpos;
   // sliderpos = sliderpos > 99.5 ? 99.5 : sliderpos;

    setSectionPos(100-sliderpos, sliderpos)
    //console.log("imgSlider " +  imagesSection + " , nameSlider: " + namesSection);
}

function setSectionPos(nameSec, imgSec) {
    $("#names").css("-webkit-clip-path", "inset(0 " + nameSec +"% 0 0)");
    $("#names").css("clip-path", "inset(0 " + nameSec +"% 0 0)");
    $("#images").css("-webkit-clip-path", "inset(0 0 0 "  + imgSec +"%)");
    $("#images").css("clip-path", "inset(0 0 0 "  + imgSec +"%)");
}

// bind event listener
draggie.on( 'dragMove', onDragMove );
