var canvasWidth = window.innerWidth;
var canvasHeight =window.innerHeight;

var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");
canvas.width = canvasWidth;
canvas.height = canvasHeight;

var image = new Image();
var radius =40;
var clippingRegion = {x:400,y:200,r:50}; //定义剪辑区域
var leftMargin = 0,topMargin = 0;
image.src = "img/bg.jpg";

image.onload = function(e){
	document.getElementById('blur-div').style.width = canvasWidth+"px";
	document.getElementById('blur-div').style.height = canvasHeight+"px";
	
	document.getElementById('blur-image').style.width = image+"px";
	document.getElementById('blur-image').style.height = image+"px";

	leftMargin = (image.width - canvas.width)/2;
	topMargin = (image.height - canvas.height)/2;

	document.getElementById('blur-image').style.top = String(-topMargin)+"px";
	document.getElementById('blur-image').style.left =String(-leftMargin)+"px";

	initCanvas();
}
function initCanvas(){
	var theLeft = leftMargin<0?-leftMargin:0;
	var theTop = topMargin<0?-topMargin:0;
	clippingRegion = {x:Math.random()*(canvas.width-2*radius-2*theLeft)+radius+theLeft,
					  y:Math.random()*(canvas.height-2*radius-2*theTop)+radius+theTop,r:0};
	
	var smallAnimation = setInterval(
		function(){
			clippingRegion.r +=1;
			if(clippingRegion.r>radius){
				clearInterval(smallAnimation);
			}
			draw(image,clippingRegion);
		},10)
	
}
function setClippingRegion(clippingRegion){
	context.beginPath();
	context.arc(clippingRegion.x,clippingRegion.y,clippingRegion.r,0,Math.PI*2,false)
	context.clip();
}
function draw(image){
	context.clearRect( 0, 0, canvas.width, canvas.height);

	context.save();
	setClippingRegion(clippingRegion);
	context.drawImage( image, 
						Math.max(leftMargin,0),Math.max(topMargin,0),
						Math.min(canvasWidth,image.width),Math.min(canvasHeight,image.height),
						leftMargin<0?-leftMargin:0,topMargin<0?-topMargin:0,
						Math.min(canvasWidth,image.width),Math.min(canvasHeight,image.height));
	context.restore();
}
function reset(){
	initCanvas();
}
function show(){
	var theAnimation = setInterval(
		function(){
			clippingRegion.r +=20;
			if(clippingRegion.r> 2*Math.max(canvas.width,canvas.height)){
				clearInterval(theAnimation);
			}
			draw(image,clippingRegion);
		},30)
}
canvas.addEventListener("touchstart",function(e){
	e.preventDefault();
});
