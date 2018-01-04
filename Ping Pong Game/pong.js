//Sadhana Singh 1001460273
//Declare variables
var id = 0;
var maxscore = 0;
var rightend = 752;
var topend = -80;
var leftend = 0;
var bottomend = 400;    
var topglobal;
var leftglobal;
var strikes;


//function to intialize the ping pong game on page load
function initialize()
{
    var ball = document.getElementById("ball");
    var rnumbertop = Math.floor((Math.random() * 400) + 1);
    topglobal=rnumbertop;
    leftglobal = 0;
    document.getElementById("messages").innerHTML= "THIS IS GAME MADE BY SADHANA SINGH....ENJOY PLAYING!!!";
    clearInterval(id);
    ball.style.top = topglobal + 'px'; 
    ball.style.left = leftglobal + 'px';
}

//Function to Reset the Game , here the strikes and the max score both gets initialized to Zero. 
function resetGame()
{        
    var ball = document.getElementById("ball");
    var rnumbertop = Math.floor((Math.random() * 400) + 1);
    topglobal=rnumbertop;    
    leftglobal = 0;
    maxscore=0;
    strikes=0;
    document.getElementById("score").innerHTML=maxscore;
    document.getElementById("strikes").innerHTML=strikes;
    clearInterval(id);
    ball.style.top = topglobal + 'px'; 
    ball.style.left = leftglobal + 'px';  
}

//Function to Set the Speed to slow,medium and fast. For Slow, the speed is 30ms,
// for medium it is 10ms and for for fast the time selected is 0.05ms
function setSpeed(speed){
    
    var speed = document.forms[0];
    var speedvalue = "";
    var i;
    for (i = 0; i < speed.length; i++) {
    if (speed[i].checked) 
        {
            speedvalue = speed[i].value;
        }
    }
    return speedvalue;
}

//Function to move the Paddle and it determines the coordinates of the paddle
function movePaddle(e){
    var paddle = document.getElementById("paddle");  
    var x = e.clientX; 
    var y = e.clientY;

    
    if (y>398)
    {
        y=398;
        paddle.style.top = y +'px';
    }
    else
    {
        paddle.style.top = y +'px';
    } 
    
    var coor = "Coordinates: (" + x + "," + y + ")";
    
    
}

//Function to Start the Game by clicking on the Start Button.
//The ball is initially set at any random position and when the start button 
//is clicked the ball starts moving in any angle between 45 and -45 degree

function startGame(speed)
{	    
    var count=0;    
    var strikes = document.getElementById("strikes").innerHTML=count;    
    var speedvalue = setSpeed(speed);
    if (speedvalue == 0)
    {
        speed = 30;                 //Slow
    }
    if (speedvalue == 1){
        speed = 10;                  //Medium
    }
    if(speedvalue == 2){
        speed = 0.05;                //Fast
    }
    
    var ball = document.getElementById("ball");
    
    var top= topglobal;
    var left = leftglobal;     
    
    var randomangle = Math.floor(Math.random() * (45-(-45)+1) + (-45));
    
    document.getElementById("messages").innerHTML= "Random Angle is " +randomangle +" and speed is " +speed+ " CHANGES CONFIRMED...ENJOY PLAYING!!!";
    var topangle = Math.sin(randomangle/180*Math.PI);
    var leftangle = Math.cos(randomangle/180*Math.PI);
    
    id = setInterval(startBall1, speed);
    
    function startBall1() 
    {        
        
        if (top>=bottomend) 
        {       
            clearInterval(id);  
            

            moveRightUp();
              
        } 
        else if (top<=topend) 
        {       
            clearInterval(id);    
            moveRightDown();
              
        } 
        else if (left >= rightend)
        {
            clearInterval(id);
            collision();
        }
        else {
            top=top+topangle; 
            left=left+leftangle;
            ball.style.top = top + 'px'; 
            ball.style.left = left + 'px'; 
        }
    }

    function moveRightUp()
    {
    	var top = parseInt(ball.style.top,10) ;
    	var left = parseInt(ball.style.left,10);
        
    	id = setInterval(startBall2, speed);   	

    	function startBall2()
    	{
            if(left >= rightend)
            {	
                clearInterval();
                collision();                
               
            }
            
            else if(top <= topend)
            {	
                clearInterval(id);
//                moveLeftDown();
                moveRightDown();
                
            }
            else
            {               
                left++;
                top--;                
                ball.style.top = top + 'px';            
                ball.style.left = left + 'px';
            }
    	}    
    } 
    
    function moveLeftUp()
    {    	
    	var top = parseInt(ball.style.top,10) ;
    	var left = parseInt(ball.style.left,10);    	
    	        
        id = setInterval(startBall3, speed);
        
    	function startBall3()
    	{
            if(top <= topend )
            {
                clearInterval(id);
                moveLeftDown();
                
            }               
            else if(left <= leftend )
            {
                clearInterval(id);
                moveRightUp();
                
            } 
            else
            {           
                left--;
                top--;                                         
                ball.style.top = top + 'px'; 
                ball.style.left = left + 'px';
            }

    	}   	
    	
    }
    
        
    function moveLeftDown()
    {   	
        var top = parseInt(ball.style.top,10);
    	var left = parseInt(ball.style.left,10) ;       
        
    	id = setInterval(startBall4, speed);
    	
    	function startBall4()
    	{    		
            if( top >= bottomend )
            {
                clearInterval(id);
                moveLeftUp();
                
            }    
            else if (left <= leftend)
            {
                clearInterval(id);
                moveRightDown();                
            }
            else
            {
                left--; 
                top++;
                ball.style.top = top + 'px'; 
                ball.style.left = left + 'px';
            }

	}
    }   
    
    function moveRightDown()
    {   	
        var top = parseInt(ball.style.top,10);
    	var left = parseInt(ball.style.left,10) ;
        
        id = setInterval(startBall7, speed);
    	
    	function startBall7()
    	{    		
                
            if (left >= rightend)
            {
                clearInterval(id);
                collision();
            }
            else if (top >= bottomend)
            {
                clearInterval(id);
                moveRightUp();
                
            }
            else
            {
                left++;
                top++;
                ball.style.top = top + 'px'; 
                ball.style.left = left + 'px';
            }
	}
    }

    
    function collision(){
    
    var ball = document.getElementById("ball");
    var paddle = document.getElementById("paddle");  
    
    var top = parseInt(ball.style.top,10);
    var paddletop = parseInt(paddle.style.top,10);
    var paddlebottom = paddletop-100;
    if ((top<=paddletop) && (top>=paddlebottom))
    {
        
        clearInterval(id);
        count= count+1;
        strikes = document.getElementById("strikes").innerHTML = count;        
        moveLeftDown();
        
    }
    else
    {   
        clearInterval(id);
        var rnumbertop = Math.floor((Math.random() * 400) + 1);
        topglobal=rnumbertop;    
        leftglobal = 0;        
        
        ball.style.top = topglobal + 'px'; 
        ball.style.left = leftglobal + 'px';     
        
        document.getElementById("messages").innerHTML = "Game Is Over, Please Click on Start Again!!!!!";
        
        if   (strikes>maxscore)    
        {
            maxscore = strikes;
            document.getElementById("score").innerHTML = maxscore;
            
        }
    }         
  }
}
//end of StartGame function
