(function() {
'use strict;'

var tPlane = document.getElementById('transformation-plane');

var maxScale = 10;
var minScale = 0;
var currentScale = 1;
var scaleDelta = 0.025;
var running = true;
var currentFrame;

var frameNumber = 0;
var currentDelta = 0;
var startTime = new Date().getTime();

var doUnblit = false;

function updateFPS(){
		frameNumber++;
		var d = new Date().getTime();
        currentDelta = ( d - startTime ) / 1000;
        var fps = Math.floor(frameNumber / currentDelta);

		if (currentDelta > 1) {
			startTime = new Date().getTime();
			frameNumber = 0;
		}

        var readout = document.getElementById('fps-readout');
        readout.innerHTML = fps;
}

function setTransform(ts) {
    tPlane.style.transform = ts;
    tPlane.style['-webkit-transform'] = ts;
}

function unblit() {
    setTransform('scale(' + currentScale + ')');
    currentFrame = requestAnimationFrame(updateScale);
    updateFPS();
}

function updateScale() {
    if (currentScale >= maxScale) {
        scaleDelta = scaleDelta * -1;
    } else if (currentScale + scaleDelta < minScale) {
        scaleDelta = scaleDelta * -1;
    }
    currentScale += (scaleDelta * currentScale);
    var cssString = 'translate3d(0px, 0px, 0px) scale(' + currentScale + ')';
    setTransform(cssString);

    if (doUnblit) {
        currentFrame = requestAnimationFrame(unblit);
    } else {
        currentFrame = requestAnimationFrame(updateScale);
    }
    updateFPS();
}

function toggleAnimation() {
    if (running) {
        cancelAnimationFrame(currentFrame);
    } else {
        currentFrame = requestAnimationFrame(updateScale);
    }
    running = !running;
}
document.getElementById('toggle-animation').onclick = toggleAnimation;

function toggleUnblit() {
    doUnblit = !doUnblit;
}
document.getElementById('toggle-unblit').onclick = toggleUnblit;

currentFrame = requestAnimationFrame(updateScale);

})();
