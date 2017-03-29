function h5lock(canvasId,fun){
	var isMouseDown=false;
	var OverId=0;
	var mouseX=0;
	var mouseY=0;
	var self=this;
	var selectId=new Array();
	var res='';
	var lastX=0,lastY=0;
	this.canvasId=canvasId;
	this.color="#ccc";
	this.init=function(){
		this.canvas=document.getElementById(this.canvasId);
		if(!this.canvas.getContext('2d')){
			this.canvas.innerHTML="Don't support canvas!";
			return;
		}
		this.context=this.canvas.getContext('2d');
		
		this.context.clearRect(0,0,this.canvasWidth,this.canvasHeight);
		
		this.canvasWidth=this.canvas.offsetWidth;
		this.canvasHeight=this.canvas.offsetHeight;
		this.canvasSize=this.canvas.offsetWidth>this.canvas.offsetHeight?this.canvas.offsetHeight:this.canvas.offsetWidth;
		this.everyLockSize=Math.floor(this.canvasSize/7);
		this.marginLeft=(this.canvasWidth-5*this.everyLockSize)/2;
		this.marginTop=(this.canvasHeight-5*this.everyLockSize)/2;
		this.context.fillStyle=this.color;
		for(var i=0;i<9;i++){
			col=i%3;
			row=Math.floor(i/3);
			this.context.beginPath();
			this.context.arc(this.marginLeft+(col*2+0.5)*this.everyLockSize,this.marginTop+(row*2+0.5)*this.everyLockSize,(this.everyLockSize/2),0,Math.PI*2,true);
			this.context.closePath();
			this.context.fill();
		}
	}
	this.init();
	this.setColor=function(color){
		this.color=color;
		return this;
	}

	var isSelectId=function(id){
		if(selectId[id]){
			return true;
		}else{
			return false;
		}
	}

	this.canvas.onmousemove=this.canvas.ontouchmove=function(e){
		e.preventDefault();
		mouseX=e.offsetX||e.targetTouches[0].clientX-self.canvas.offsetLeft;
		mouseY=e.offsetY||e.targetTouches[0].clientY-self.canvas.offsetTop;
		for(var i=0;i<9;i++){
			col=i%3;
			row=Math.floor(i/3);
			temX=self.marginLeft+(col*2+0.5)*self.everyLockSize;
			temY=self.marginTop+(row*2+0.5)*self.everyLockSize;
			
			if(Math.pow(mouseX-temX,2)+Math.pow(mouseY-temY,2)<=Math.pow(self.everyLockSize/2,2)){

				OverId=i+1;
				if(isMouseDown&&!isSelectId(OverId)){
					col=i%3;
					row=Math.floor(i/3);
					
					if(lastX!=0&&lastY!=0){
						self.context.lineWidth = 6;
						self.context.strokeStyle = 'rgba(196,196,48,.7)';
						self.context.beginPath();
						self.context.moveTo(lastX,lastY);
						self.context.lineTo(self.marginLeft+(col*2+0.5)*self.everyLockSize,self.marginTop+(row*2+0.5)*self.everyLockSize);
						self.context.stroke();

						self.context.lineWidth = 0;
						self.context.beginPath();
						self.context.arc(lastX,lastY,(self.everyLockSize/4),0,Math.PI*2,true);
						self.context.closePath();
						self.context.fillStyle="#333";
						self.context.fill();

					}
					
					self.context.lineWidth = 0;
					self.context.beginPath();
					self.context.arc(self.marginLeft+(col*2+0.5)*self.everyLockSize,self.marginTop+(row*2+0.5)*self.everyLockSize,(self.everyLockSize/4),0,Math.PI*2,true);
					self.context.closePath();
					self.context.fillStyle="#333";
					self.context.fill();
					
					lastX=self.marginLeft+(col*2+0.5)*self.everyLockSize;
					lastY=self.marginTop+(row*2+0.5)*self.everyLockSize;
					selectId[OverId]=true;
					res+=OverId+'';
					console.log(res);
				}

			}
			
		}
		
	}
	this.canvas.onmousedown=this.canvas.ontouchstart=function(){
		if(!isMouseDown){
			isMouseDown=true;
		}
	}
	this.canvas.onmouseup=this.canvas.ontouchend=function(){
		if(isMouseDown){
			var re=fun(res);
			if(re!=true){
				self.init();
				res='';
				isMouseDown=false;
				selectId=new Array();
				lastX=0;
				lastY=0;
			}
		}
	}		
}
