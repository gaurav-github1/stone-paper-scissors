// converting JSON string to js object to get it from localStorage
let score =JSON.parse(localStorage.getItem('score'))||{
    win : 0,
    lose : 0,
    tie : 0  
};  

if(!score){ // same as score === null
    score = {
        win : 0,
        lose : 0,
        tie : 0
    };
}

updateResult();

let isAutoPlaying = false;
let intervalId;

function autoPlay(){
    if(!isAutoPlaying){
        intervalId = setInterval(() =>{
            let playerMove = pickRandomMove();
            playGame(playerMove,pickRandomMove());
        } , 1000);
        document.querySelector('.autoPlay-btn').innerHTML ="Stop";
        isAutoPlaying = true;
    }
    else{
        clearInterval(intervalId);
        document.querySelector('.autoPlay-btn').innerHTML ="Auto Play";
        isAutoPlaying = false;
    }
}

document.querySelector('.autoPlay-btn').addEventListener('click', autoPlay
    // if(!isAutoPlaying){
    //     intervalId = setInterval(() =>{
    //         let playerMove = pickRandomMove();
    //         playGame(playerMove,pickRandomMove());
    //     } , 1000);
    //     document.querySelector('.autoPlay-btn').innerHTML ="Stop Playing";
    //     isAutoPlaying = true;
    // }
    // else{
    //     clearInterval(intervalId);
    //     document.querySelector('.autoPlay-btn').innerHTML ="Auto Play";
    //     isAutoPlaying = false;
    // }
);

document.body.addEventListener('keydown',(event) =>{
    if(event.key==='a'){
        autoPlay();
    }
});

function reset(){
    score.lose = 0;
    score.tie = 0;
    score.win = 0;
    localStorage.removeItem('score');
    updateResult();
    alert('Wins : '+score.win+',Losses : '+score.lose+',Ties : '+score.tie);
}

document.querySelector('.reset-btn').addEventListener('click', () =>{
    document.querySelector('.conformation-Reset').innerHTML=`Are you sure you want to reset the score ? <button class="js-conf-Y">Yes</button><button class="js-conf-N">No</button>`;
    document.querySelector('.js-conf-Y').addEventListener('click', () =>{
        
        document.querySelector('.conformation-Reset').innerHTML="";
        reset();
    });
    
    document.querySelector('.js-conf-N').addEventListener('click',() => {
        document.querySelector('.conformation-Reset').innerHTML="";
    });
});

document.body.addEventListener('keydown',(event)=>{
    if(event.key === ' '){
        document.querySelector('.conformation-Reset').innerHTML=`Are you sure you want to reset the score ? <button class="js-conf-Y">Yes</button><button class="js-conf-N">No</button>`;
    }
    document.querySelector('.js-conf-Y').addEventListener('click', () =>{
        reset();
        document.querySelector('.conformation-Reset').innerHTML="";
        
    });
    
    document.querySelector('.js-conf-N').addEventListener('click',() => {
        document.querySelector('.conformation-Reset').innerHTML="";
    });
});



document.querySelector('.rock-btn').addEventListener('click',() => {
    playGame('rock',pickRandomMove());
});

document.body.addEventListener('keydown', (event) =>{
    if(event.key === 'r'){
        playGame('rock',pickRandomMove());
    }
    else if(event.key === 'p'){
        playGame('paper',pickRandomMove());
    }
    else if(event.key === 's'){
        playGame('scissors',pickRandomMove());
    }
});

function playGame(playerMove,computerMove){
    let result = '';
    if(computerMove === 'scissors' && playerMove === 'rock'){
        result = 'You win';
    }
    else if(computerMove === 'paper' && playerMove === 'scissors'){
        result = 'You win';
    }
    else if(computerMove === 'scissors' && playerMove === 'paper'){
        result = 'You lose';
    }
    else if(computerMove === 'rock' && playerMove === 'scissors'){
        result = 'You lose';
    }
    else if(computerMove === 'paper' && playerMove === 'rock'){
        result = 'You lose';
    }
    else if(computerMove === 'rock' && playerMove === 'paper'){
        result = 'You win';
    }
    else{
        result = 'Tie';
    }

    if(result==='You win'){
        score.win+=1;
    }
    else if(result==='You lose'){
        score.lose+=1;
    }
    else{
        score.tie+=1;
    }

    localStorage.setItem('score',JSON.stringify(score));//for localStorage the value should be of string and 
                                                        //whole object will be converted in JSON string 

    updateResult(); 
    
    document.querySelector('.js-winner').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `You <img class="move-icon" src="./images/${playerMove}-emoji.png">
<img class="move-icon" src="./images/${computerMove}-emoji.png" alt=""> Computer`;

    // alert('You picked '+playerMove+'.'+'Computer picked '+computerMove+'. '+result+'\n'
    // +'Wins : '+score.win+',Losses : '+score.lose+',Ties : '+score.tie);
}

function updateResult(){
    document.querySelector('.js-result').innerHTML = 'Wins : '+score.win+',Losses : '+score.lose+',Ties : '+score.tie;
}

function pickRandomMove(){
    let randomNumber = Math.random();
    let computerMove = '';
    if(randomNumber >= 0 && randomNumber<(1/3)){
        computerMove = 'rock';
    }
    else if(randomNumber >= (1/3) && randomNumber<(2/3)){
        computerMove = 'paper';
    }
    else{
        computerMove = 'scissors';
    }
    return computerMove;
}