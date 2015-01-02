var elem = document.querySelector('#draggable');
//var imagesSection = 50;
//var namesSection = 50;
var draggiePos;
var draggerSize = 30;
var draggie = new Draggabilly(elem, {
    axis : 'x',
    containment: '.main'
});


$(document).ready(function() {
    var ww = $(window).width();
    var pos = ($(window).width() / 2 - draggerSize/2) / ww * 100 ;
    console.log("Redy pos " +pos);
    $(".draggie").css("left",pos+"%");
  //  animateButlletOnReady();
});

$(window).resize(function() {
    console.log("#name width " + draggiePos);
    var sectionPos = getPercentage();
    setSectionPos(100-sectionPos, sectionPos)
});



function animateButlletOnReady() {
    $(".draggie").animate({
        left: "80%"
    }, 1000).animate({
        left: "20%"
    }, 1000).animate({
            left: "50%"
    }, 700)
}


function getPercentage() {
    var windowWidth = $(window).width();
    return draggiePos /  windowWidth * 100;
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
    $("#names").css("-webkit-clip-path", "inset(0 " + nameSec+"% 0 0)");
    $("#names").css("clip-path", "inset(0 " + nameSec+"% 0 0)");
    $("#images").css("-webkit-clip-path", "inset(0 0 0 "  + imgSec+"%)");
    $("#images").css("clip-path", "inset(0 0 0 "  + imgSec+"%)");
}

// bind event listener
draggie.on( 'dragMove', onDragMove );
