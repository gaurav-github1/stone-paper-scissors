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