//game contants
let InputDir = {x:0 ,y:0};
const foodSound= new Audio('food.mp3');
const gameOverSound = new Audio ('gameover.mp3');
const moveSound= new Audio('move.mp3');
const musicSound =new Audio('music.mp3');
let speed = 15;
let lastPaintTime = 0;
let score=0;
let snakearr= [
    {x:13 , y:15}
];
 food= {x:6 , y:7};

//game function

function main (ctime){
    window.requestAnimationFrame(main);
   // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
     

}
function isCollide(sarr)
{
    //if you bump into yourself
    for(let index=1;index<snakearr.length;index++){
        if(snakearr[index].x===snakearr[0].x && snakearr[index].y===snakearr[0].y){
            return true;
        }
    }
    //if bump into wall
        if(snakearr[0].x>=18 || snakearr[0].x<=0 || snakearr[0].y>=18 || snakearr[0].y<=0){
        
            return true;

        }
    
    return false;

}
function gameEngine(){
    //update snake arraay and food
    if(isCollide(snakearr)){
        gameOverSound.play();
        musicSound.pause();
        InputDir = {x:0 ,y:0};
        alert("Game over press any key to play again");
        snakearr= [{x:13 , y:15}];
        musicSound.play();
        score=0;
        scoreBox.innerHTML="score:"+score;
    }
    //if you have eTEN THE FOOD INCREMENT THE SCORE AND REPOSSITION FOOD
    if(snakearr[0].y === food.y && snakearr[0].x===food.x)
    {
        score +=1;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            HighscoreBox.innerHTML="High Score:"+hiscoreval;

        }
        scoreBox.innerHTML="score:"+score;
        foodSound.play();
        snakearr.unshift({x:snakearr[0].x+InputDir.x ,y:snakearr[0].y+InputDir.y});
        let a=2;
        let b=16;
        food ={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    }
    // Moving the snake
    for(let i=snakearr.length-2;i>=0;i--)
    {
        snakearr[i+1]={...snakearr[i]};
    }
    snakearr[0].x +=InputDir.x;
    snakearr[0].y +=InputDir.y;




//display the snake 
  
    board.innerHTML="";
    snakearr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
      
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
        snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);


    })
      //display the  food
      
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);


  
        
}



//main logic
let hiscore =localStorage.getItem ("hiscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval =JSON.parse(hiscore);
    HighscoreBox.innerHTML="High Score:"+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    InputDir = {x:0 , y:0} //start game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
        console.log( "ArrowUp");
         InputDir.x=0;
        InputDir.y=-1;
        console.log(  InputDir.y=-1);
        break;
        case "ArrowDown":
        console.log( "ArrowDown");
        console.log( InputDir.y);
       switch( InputDir.y){
        
       case 0:
        console.log( InputDir.y);
        InputDir.x=0;
        InputDir.y=1;
        default:
            break
       }
        
        break;
        case "ArrowLeft":
        console.log( "ArrowLeft");
        InputDir.x=-1;
        InputDir.y=0;
        break;case "ArrowRight":
        console.log( "ArrowRight");
        InputDir.x=1;
        InputDir.y=0;
        
        break;
        default:
            break

    }

});
