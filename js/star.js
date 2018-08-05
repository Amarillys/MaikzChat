$(document).ready(function(){
	var canvas = document.createElement("canvas");
	ctx = canvas.getContext("2d");
	canvas.id = "star";
	canvas.style.top = 0;
	canvas.style.left = 0;
	canvas.style.position = "absolute";
	canvas.style.zIndex=-1;
	var W =  document.body.scrollWidth;
	var H =  document.body.scrollHeight;
	canvas.width = W;
	canvas.height = H;
	document.body.appendChild(canvas);
   function draw(x,y,r1,r2,num,color,isFill){
		var angle = 360 / (2 * num), res = [];
		for(var i=0,l=2*num;i<l;i++){
			var tmp = {};
			tmp.x = i%2==0?x+r1*Math.cos(i*angle*Math.PI/180):x+r2*Math.cos(i*angle*Math.PI/180);
			tmp.y = i%2==0?y+r1*Math.sin(i*angle*Math.PI/180):y+r2*Math.sin(i*angle*Math.PI/180);
			res.push(tmp);
		}
		ctx.beginPath();
		ctx.moveTo(res[0].x,res[0].y);
		for(var i=0,l=res.length;i<l;i++){
			ctx.lineTo(res[i].x,res[i].y);
		}
		ctx.closePath();
		if(isFill){
			ctx.fillStyle = color;
			ctx.fill();
		}else{
			ctx.strokeStyle = color;
			ctx.stroke();
		}
	}
	function rand(min,max){
		return Math.random() * (max-min) + min;
	}
	function ranC(){
		return "rgb(" + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + ")";
	}
	function init(num){
		for(var i=0;i<num;i++){
			draw(rand(10,W-10),rand(10,H-10),rand(4,7),rand(8,12),5,ranC(),Math.random()>0.5?1:0);
		} 
	}
	init(document.body.scrollHeight * 0.15);
});