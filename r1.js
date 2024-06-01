console.log('jey');
//game constants
let inputDir={x:0,y:0};
let foodsound=new Audio('./music/food.mp3');
let gameOverSound=new Audio('./music/gameover.mp3');
let moveSound=new Audio('./music/move.mp3');

let musicSound=new Audio('./music/music.mp3');
let speed=5;
let score=0;
let lastPainTime=0;
let snakeArr = [
// remember that this is the array of theobjects
    {x: 13, y: 15} //it is the initial position of thefood
];

food = {x: 6, y: 7};  // here food is not the array
// why we are usign the requestAnimationFrame rather then settimeout
// game functions
//fps 
function main(ctime){
    // ctime means  the current time 
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPainTime)/1000<1/speed){
        return ;
    }
    lastPainTime=ctime;
    gameEngine();
}


function isCollide(snake){
   // all the cases when my snake will ocllide 
  for(let index =1;index<snakeArr.length;index++){
// means the present coordinate will get collide with the coordinate with of the head of the snake that is the both the x and y coordinate 
//will get collide witth body
    if(snake[index].x===snake[0].x&&snake[index].y===snake[0].y){
      return true;  
    }
}
// if u collide with the wall the snake with wall
    if(snake[0].x>=18||snake[0].x<=0||snake[0].y>=18||snake[0].y<=0){
return true;
    }
    return false;
  } 


function gameEngine(){
//parrt1 updatinf the sanke array and the food  means the action after the snake is eating the food
if(isCollide(snakeArr)){
    gameOverSound.play();
    musicSound.pause();
    inputDir={x:0,y:0};
    alert("Game over.press any key to paly again");
    snakeArr=[{x:13,y:15}];
    musicSound.play();
    score=0;
}


// if the snake has eaten the food then there will be the increment in the score and the food
// the snakewill eat the food when the head of the snake will be at the food means the index of the head and the food will collide
if(snakeArr[0].y===food.y&&snakeArr[0].x===food.x){
        foodsound.play();
        score=score+1;
        
        scoreBox.innerHTML="score"+score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
//  through this after eating the food the snake will get the new head and we are updating the head 
        let a = 2;
        let b = 16;
// here we are generating the random numebers so that after eating the food jo food hai hai phir se aaye 
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // moving the snake 
// here in this we will write the logic for how the snake will move 
//here in this we will start from the length=snakearr.length-2 and then we will go to till the 
//here we might think to start the loop from the snake.length-1 but it will start from the snake.length-2 as the last one will come to the second last means 
//sab ek ek step aage badhenge
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};  // here we need to create the shallow copy
// if we simple create the copy using  the normal assingnmet operator then it might be the snakeArr[i+1] = snakeArr[i];  using this then we will see that the change in the i+1 will affect the change in the i 
//and the vice versa 
    }
/// upar waise llop se jo i+1 wala hai wo 0 par aa jayega but we have to do the increment in the 0 wala index
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;















 
//part2 display thefood and thefood 
//display the snak
board.innerHTML = "";
snakeArr.forEach((e, index)=>{
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if(index === 0){
        snakeElement.classList.add('head');
    }
    else{
        snakeElement.classList.add('snake');  
// think this logic again and again  waht happenend wothout the else case
    }
    board.appendChild(snakeElement);
});
// Display the food
foodElement = document.createElement('div');
foodElement.style.gridRowStart = food.y;
foodElement.style.gridColumnStart = food.x;
foodElement.classList.add('food')
board.appendChild(foodElement);
}



//mainlogic as in the game we will always see that there is the repainting of the screen

// here the logic for the highscore
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}






window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y= -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x= 0;
            inputDir.y= 1;           
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;           
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1 ;
            inputDir.y=0 ;            
            break;
        default:
            break;
    }

});