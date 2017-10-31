(function(window){

	var requestAnimationFrame = (function () {
        return window.requestAnimationFrame ||
                function (cb) {
                    return window.setTimeout(cb, 1000 / 60);
                };
    })();

    var cancelAnimationFrame = (function () {
        return window.cancelAnimationFrame || window.clearTimeout;
    })();

	var J_progress = function(options){
		options.width = options.width || 250;
		options.height = options.height || 250;
		options.circleColor = options.circleColor || '#12a89f';
		options.textColor = options.textColor || 'rgba(32,99,95,0.8)';

		var canvas = document.getElementById(options.id);
		var range = document.getElementById(options.rangeId);

		if (canvas == null || canvas.getContext == null) {
            return;
        }

        canvas.width = options.width;
        canvas.height = options.height;


        options.context = canvas.getContext('2d');
        options.centre = options.width/2;
        options.lineWidth = 2;
        options.r = options.centre - 16*options.lineWidth;
        options.nowRange = 0;
        options.speed = 0.09;
        options.xoffset = 0;

        var render = function(){
        	options.context.clearRect(0,0,options.width,options.height);

        	var rangeValue = range.value;
        	if(options.nowRange<=rangeValue){
        		options.nowRange += 1;
        	}
        	if(options.nowRange > rangeValue){
        		options.nowRange -=1;
        	}

        	drawCircle(options);
        	options.xoffset += options.speed;
        	requestAnimationFrame(render);
        }

        render();
	}

	var drawCircle = function(options){
		var ctx = options.context;

		ctx.lineWidth = options.lineWidth;
		
		//画圆
		ctx.beginPath();
        ctx.strokeStyle = options.circleColor;
        ctx.arc(options.centre,options.centre,options.r+5,0,2*Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(options.centre,options.centre,options.r,0,2*Math.PI);
        res = ctx.clip();   //裁剪

        //画sin函数
        //ctx.save();
        var points = [];   //存放绘制sin曲线的点
        var sX = 0;
        var sY = options.width/2;
        var waveWidth = 0.015;   //波浪宽度，数越小越宽
        var waveHeight = 10;  //波浪高度

        ctx.beginPath();

        for(var x = sX;x<sX+options.width;x+=1){

            var y = Math.sin((sX+x)*waveWidth+options.xoffset);
            var dY = options.width*(1-options.nowRange/100);

            points.push([x,dY+y*waveHeight]);
            ctx.lineTo(x,dY+y*waveHeight);
        }

        ctx.lineTo(options.width,options.height);
        ctx.lineTo(sX,options.height);
        ctx.lineTo(points[0][0],points[0][1]);
        ctx.fillStyle = options.circleColor;
        ctx.fill();

        ctx.restore();


        //写百分比
        //ctx.save();
        var size = 0.4*options.r;

        ctx.font = size + 'px Microsoft Yahei';
        ctx.textAlign = 'center';
        ctx.fillStyle = options.textColor;
        
        ctx.fillText(options.nowRange +'%',options.centre,options.centre+size/2);
        ctx.stroke();

	}

	window.J_progress = J_progress;

})(this);
