var noHit=false;
var noTurn=false;
var whiteCarFlag=true;
var jump=0;
var WhiteCurLeft=470;
var jumpTime;
var curLeft=295;
var ran850to1200=1200;
var ran850to900=900;
var ran850to1000=1000;
var redCar1Speed=1;
var redCar2Speed=2;
var redCar3Speed=3;
var whiteCarSpeed=3;
var bgSpeed=30;
var starttimef, endtimef;
var fastTime;

function init()
   {
	
  var starttime, endtime;
  var time; 
  var BgY = 0;
  var animateFlag=false;
  
	var redCar1Y = 0;
	var redCar2Y = 0;
	var redCar3Y = 0;
	var whiteCarY = 0;
	

	
	var bg = document.getElementById('sprite');
	var gameOver = document.getElementById('gameOver');
	var myCar = document.getElementById('myCar');
	var myCarJump = document.getElementById('myCarJump');
	var redCar1 = document.getElementById('redCar1');
	var redCar2 = document.getElementById('redCar2');
	var redCar3 = document.getElementById('redCar3');
	var whiteCar = document.getElementById('whiteCar');
	
	
	
	startclock();
	
	function movingBg ()
		  {
		            //console.log("hello");
					
					
					 bg.style.backgroundPosition = 100 + '%' + BgY +'px' ;
					 redCar1.style.top = redCar1Y +'px' ;
					 redCar2.style.top = redCar2Y +'px' ;
					 redCar3.style.top = redCar3Y +'px' ;
					 whiteCar.style.top = whiteCarY +'px' ;
					 BgY = BgY + bgSpeed;
					 if(BgY>200){BgY=0};
					 //console.log(redCar1Y);		
					 
					 redCar1Y = redCar1Y + redCar1Speed;
					 redCar2Y = redCar2Y + redCar2Speed;
					 redCar3Y = redCar3Y + redCar3Speed;
					 whiteCarY = whiteCarY + whiteCarSpeed;
					  if(redCar1Y > ran850to900){redCar1Y=0;ran850to900 = randomInRange(850,900);}
					 if(redCar2Y > ran850to1200){redCar2Y=0;ran850to1200 = randomInRange(850,1200);}
					 if(redCar3Y > ran850to1000){redCar3Y=0;ran850to1000 = randomInRange(850,1000);} 
					 if(whiteCarY > 3000){
											whiteCarY=0;
											 $(whiteCar).css({display:'block'});
											 whiteCarFlag=true;
											var ran1to3 = randomInRange(1,3);
											if(ran1to3==1){WhiteCurLeft=470;}
											if(ran1to3==2){WhiteCurLeft=292;}
											if(ran1to3==3){WhiteCurLeft=114;}
											$(whiteCar).css({left:WhiteCurLeft});
										} 
				
					 checkHit(redCar1Y,redCar2Y,redCar3Y,whiteCarY,curLeft);
					  		
					 
					 setTimeout(movingBg,10);
				
				
					 
			}
		            	 
					$(document).keydown(function(e){
					if (e.keyCode == 37 && curLeft > 290 && noTurn==false && animateFlag==false) 
					{ 
						
						 			 
						 curLeft=myCar.offsetLeft;
						 animateFlag=true;
						 $(myCar).animate({left:curLeft-175},500,function(){
						 curLeft=myCar.offsetLeft;
						 animateFlag=false;
						 }) ;						
					}
						
					});
					
					$(document).keydown(function(e){
					if (e.keyCode == 39 && curLeft < 300 && noTurn==false && animateFlag==false)
					{  
					//console.log(myCar.offsetLeft);
							
					 	
					
					 curLeft=myCar.offsetLeft;
					 animateFlag=true;
					 $(myCar).animate({left:curLeft+181},500,function(){
						 curLeft=myCar.offsetLeft;
						 animateFlag=false;
						 }) ;
					
					
					}
					  
					});
					 $(document).keydown(function(e){
					if (e.keyCode == 32 && jump>0 && animateFlag==false) 
					{
									
					jump--;
					document.getElementById('jump').innerHTML = jump;
					noHit=true;
					noTurn=true;
					animateFlag=true;
					$(myCarJump).css({left:curLeft});
					jumptime();
					$(myCarJump).animate({opacity:1},jumpTime,function(){
						 
						 }) ;	
					
					$(myCarJump).animate({opacity:0},jumpTime,function(){
						 noHit=false;
						 noTurn=false;
						 animateFlag=false;
						 }) ;	
						
					
					}  
					});
					
					$(document).keydown(function(e){
					if (e.keyCode == 38 )
					{ 
							
					redCar1Speed=3;
					redCar2Speed=6;
					redCar3Speed=9;
					whiteCarSpeed=9;
					bgSpeed=60;
					startclockf();

					
					}
					  
					});
					$(document).keyup(function(e){
					if (e.keyCode == 38 )
					{  
					redCar1Speed=1;
					redCar2Speed=2;
					redCar3Speed=3;
					whiteCarSpeed=3
					bgSpeed=30;
					endclockf();
					calctimef();
					time=time+fastTime;
					
					
					
					}
					  
					});
					 
	
		movingBg();  
	}
	
	function checkHit(redCar1Y,redCar2Y,redCar3Y,whiteCarY,curLeft)
	{
 	
	if((redCar3Y > 480 && redCar3Y < 750) && (curLeft==295 || curLeft==292) && noHit==false)
	{endclock();calctime();over();}
	if((redCar1Y > 480 && redCar1Y < 750) && (curLeft==470 || curLeft==467) && noHit==false)
	{endclock();calctime();over();}
	if((redCar2Y > 480 && redCar2Y < 750) && (curLeft==114 || curLeft==111) && noHit==false)
	{endclock();calctime();over();}
	if((whiteCarY > 480 && whiteCarY < 750) && curLeft == WhiteCurLeft && noHit == false && whiteCarFlag == true)
	{jump++;$(whiteCar).css({display:'none'});document.getElementById('jump').innerHTML = jump;console.log("white"+whiteCarY+"mycar"+curLeft);whiteCarFlag=false;}
	}
	
	function endclock() {var today = new Date(); endtime = today.getTime();}
	function calctime() {time = Math.floor((endtime - starttime - 0)/1000)*10; 	return time;}
	function startclock() {var today = new Date(); starttime = today.getTime();}
	
	function endclockf() {var today = new Date(); endtimef = today.getTime();}
	function calctimef() {fastTime = Math.floor((endtimef - starttimef - 0)/100)*10; 	console.log(fastTime); return fastTime;}
	function startclockf() {var today = new Date(); starttimef = today.getTime();}
	
	function over()
	{
	document.getElementById('gameOver').style.zIndex=6;
	//document.getElementById('score').innerHTML = time;
	document.getElementById('score').style.display="block";
	$('#score').append(time+fastTime);
	exit();
	
	
	//alert("Game Over "+"your score is "+time);
	}
	
function randomInRange(from, to) {
  var r = Math.random();
  return Math.floor(r * (to - from) + from);
}

function jumptime(){
if(curLeft==470){jumpTime=2500;}
if(curLeft==292){jumpTime=1000;}
if(curLeft==114){jumpTime=1500;}
}
