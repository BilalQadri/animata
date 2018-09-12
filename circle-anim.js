

var interval = 20;
var acceleration = 0.7;
var falling = 0.02;
var shapeType = 'circle';
var size = 170;

lEvent = (function () {
    this.listeners = [];
    var that = this;
    this.fire = function (ev, type, data) {
        var lstns = that.listeners;
        for (var l = null, _js_idx14 = 0; _js_idx14 < lstns.length; _js_idx14 += 1) {
            l = lstns[_js_idx14];
            if (l.event === ev) {
                l.callback(type, data);
            };
        };
        return null;
    };
    this.listenFor = function (ev, callback) {
        var idx = that.listeners.findIndex(function (elm) {
            return elm['event'] == ev;
        });
        if (idx == -1) {
            that.listeners.push({ 'event' : ev, 'callback' : callback });
        } else {
            that.listeners[idx] = { 'event' : ev, 'callback' : callback };
        };
        return null;
    };
    return this;
})();
var pad = SVG('svg').size(800, 600);
function rect(pad, w, h, attrs) {
    return pad.rect(w, h).attr(attrs);
};
function circle(pad, r, attrs) {
    return pad.circle(r).attr(attrs);
};
function clr() {
    pad.clear();
    return null;
};
function move(shape, x, y) {
    return shape.move(x, y);
};
function cx(shape, x) {
    return shape.cx(x);
};
function dmove(shape, x, y) {
    return shape.dmove(x, y);
};
function rm(shape) {
    return shape.remove();
};
function randomColor() {
    var chars = '0123456789ABCDEF';
    var hex = '';
    for (var i = 1; i <= 6; i += 1) {
        hex += chars[Math.floor(16 * Math.random())];
    };
    return '#' + hex;
};
function process() {
    var shape = null;
    var creatingPoint = 0;
    var startingPoint = 0;
    var v = 1;
    var color = randomColor();
    var shade = 0;
    var radius = 5;
    var width = 5;
    var height = 5;
    var direction = 'up';
    var inputs = [[170,0.02,20,0.7] ,[110,0.008,85,2] ,[23,0.1,20,0.1], [23,0.02,-25,1.4]
		  , [50,0.03,15,0.4], [170,2,10,0.5], [60,0.001,25,0.8], [170,0.02,120,0]
		  , [70,0.8,100,-0.3], [150,0.001,100,1.5], [200,0.11,40,1], [100,0.11,10,1.6]
		  , [120,0.001,10,-0.1], [170,0,25,6], [170,1,25,1], [170,1,5,1], [170,2,10,20]
		  , [170,0,25,0.5]];
    var idx = 0;
    var size_e = document.getElementById("size");
    var fall_e = document.getElementById("fall");
    var interval_e = document.getElementById("interval");
    var acceleration_e = document.getElementById("acceleration");

    document.getElementById("svg").onclick = function () {

	if (inputs[idx] == undefined) {
	    idx = 0;
	}
	var input = inputs[idx];
	console.log(input);
	size = size_e.value = input[0];
	falling = fall_e.value = input[1];
	interval = interval_e.value = input[2];
	acceleration = acceleration_e.value = input[3];
	idx++;
    };
    
    function change() {
        if (direction == 'up') {
            radius += 5;
            width += 5;
            height += 5;
        } else {
            radius -= 5;
            width -= 5;
            height -= 5;
        };
        if (radius > 140) {
            direction = 'down';
        };
	 if (radius < 10) {
            direction = 'up';
        };
        
        return null;
    };


    document.getElementById("interval").onchange = function (e) {

	interval = e.target.value;
	restart();
    };

     document.getElementById("size").onchange = function (e) {

	size = e.target.value;
    };
     document.getElementById("fall").onchange = function (e) {

	falling = e.target.value;
    };
    document.getElementById("acceleration").onchange = function (e) {

	acceleration = e.target.value;
    };

    var changing = function (e) {

//	var elm = document.querySelector('input[name=shapeType]:checked');
	shapeType = e.target.value;
	
    };

    document.getElementById("r1").onclick = changing;
    document.getElementById("r2").onclick = changing;
    
    spawn = setInterval(function () {
        var shape23 = shapeType == 'circle' ? circle(pad, radius, { 'stroke' : shadeColor(color, shade), 'fill' : shadeColor(color, shade) }) : rect(pad, width, height, { 'stroke' : shadeColor(color, shade), 'fill' : shadeColor(color, shade) });
        dmove(shape23, creatingPoint, 0);
        fall(shape23, v);
        if (creatingPoint < 650) {
            shade -= -7;
            creatingPoint += parseInt(size);
            v += parseFloat(acceleration);
        } else {
            color = randomColor();
            shade = 0;
            change();
            v = 1;
            if (startingPoint == 650) {
                clearInterval(spawn);
            } else {
                startingPoint = 0;
            };
            creatingPoint = startingPoint;
        };
        return null;
    }, interval);

    
    
    lEvent.listenFor('fall', function (type, data) {
   
        return null;
    });
    lEvent.listenFor('side', function (type, data) {
       
        return null;
    });
    return null;
};
function fall(shape, v) {
    var fall = function () {
        var x = shape.attr('cx');
        var y = shape.attr('cy');
        if (y > 700) {
            rm(shape);
            lEvent.fire('fall', null, null);
        } else {
            v += parseFloat(falling);
            dmove(shape, 0, v);
            requestAnimationFrame(fall);
        };
    };
    fall();
    return null;
};
function restart() {
    clearInterval(spawn);
    clr();
     process();
};

window.onload = function () {
    process();
}
