(function() {
'use strict;'

var tPlane = document.getElementById('transformation-plane');

var maxScale = 10;
var minScale = 0;
var currentScale = 1;
var scaleDelta = 0.1;
var running = true;
var currentFrame;

function setTransform(ts) {
    tPlane.style.transform = ts;
    tPlane.style['-webkit-transform'] = ts;
}

function unblit() {
    setTransform('scale(' + currentScale + ')');
    currentFrame = requestAnimationFrame(updateScale);
}

function updateScale() {
    if (currentScale >= maxScale) {
        scaleDelta = scaleDelta * -1;
    } else if (currentScale + scaleDelta < minScale) {
        scaleDelta = scaleDelta * -1;
    }
    currentScale += scaleDelta;
    var cssString = 'translate3d(0px, 0px, 0px) scale(' + currentScale + ')';
    setTransform(cssString);

    currentFrame = requestAnimationFrame(updateScale);
}

function toggleAnimation() {
    if (running) {
        cancelAnimationFrame(currentFrame);
    } else {
        currentFrame = requestAnimationFrame(updateScale);
    }
    running = !running;
}
document.getElementById('toggle-button').onclick = toggleAnimation;

currentFrame = requestAnimationFrame(updateScale);

})();
