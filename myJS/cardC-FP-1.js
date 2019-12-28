// from node card0-impertive.js
// refactoring by stages 
// - stage a : (try to remove mutation) just move logging so no mutation in the fuction
// - stage b : (make popRandom () pure) avoid play Random using in place mutation array splice 
// - stage c : (make payEqual () pure) 
// - stage d : (extract winMessage) try to avoid logic in display message
// - stage e : (combine end message) 

// adopt the competition card is discarded as in wiki: https://en.wikipedia.org/wiki/Goofspiel

function runGame() {
    let turn = 0;
    let bountyCards = [1, 2, 3, 4, 5, 6, 7, 8];
    let playerCards = [[1, 2, 3, 4, 5, 6, 7, 8],
                       [1, 2, 3, 4, 5, 6, 7, 8]];
    let playerScores = [0, 0];

    while (bountyCards.length > 0) {
        
        const bountyCard = selectRandom(bountyCards);  // stage b - popRandom(bountyCards); 
        bountyCards = without(bountyCards, bountyCard) // stage b - 
        
        console.log(`Turn ${turn}: Bounty: ${bountyCard}`);
        const card0 = playRandomStrategy(playerCards[0], bountyCard);
        const card1 = playEqualStrategy(playerCards[1], bountyCard);
        playerCards[0] = without(playerCards[0], card0); // stage b
        playerCards[1] = without(playerCards[1], card1); // stage c
        
        turn +=1;
        
        console.log(`\tPlayer 0 plays: ${card0}`); // stage - a 
        console.log(`\tPlayer 1 plays: ${card1}`); // stage - a 
                                                   // ; see wiki best strategy against random play
        
        if (card0 > card1) {
            playerScores[0] += bountyCard;
        } else if (card1 > card0){
            playerScores[1] += bountyCard;
        } else {
            //console.log(`\ncard0 is ${card0}`);
            //console.log(`card1 is ${card1}`);
            console.log("the competition card is discarded")
        }
    }
    
    // stage e - console.log(`Scores: ${playerScores[0]} v ${playerScores[1]}`);
    
    // stage e = console.log(winMessage(playerScores));
    
    console.log(endMessage(playerScores));
    
    // stage d - if (playerScores[0] == playerScores[1]) {
    // stage d -     console.log("PLayer Tie.")
    // stage d - } else if (playerScores[0] > playerScores[1]) {
    // stage d -     console.log("PLayer 0 Wins!")
    // stage d - } else {
    // stage d -     console.log("PLayer 1 Wins!")
    // stage d - }
}

runGame();


function scoreMessage(playerScores){
    return `Scores: ${playerScores[0]} v ${playerScores[1]}`;
}

function endMessage(playerScores){
    return scoreMessage(playerScores) + "\n" + 
           winMessage(playerScores);
}

function winMessage(playerScores) {
    if (playerScores[0] == playerScores[1]) {
        return "PLayer Tie.";
    } else if (playerScores[0] > playerScores[1]) {
        return "PLayer 0 Wins!";
    } else {
        return "PLayer 1 Wins!";
    }
}

function selectRandom(arr){ // stage b - popRandom(arr){
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
    // stage b - const value = arr[index];
    // stage b - arr.splice(index, 1);
    // stage b - return value;
}

function playRandomStrategy(playerCards, bountyCard){
    const card = selectRandom(playerCards); // stage b - popRandom(playerCards);
    // stage a - console.log(`\tPlayer 0 plays: ${card}`);
    return card;
}

function playEqualStrategy(playerCards, bountyCard){
    // stage c - playerCards.splice(playerCards.indexOf(bountyCard),1);
    // stage a - console.log(`\tPlayer 1 plays: ${bountyCard}`);
    return bountyCard;
}

function without(arr, value){                                //stage b
    const index = arr.indexOf(value);                        //stage b
    // debug during stage b : x = 
    // debug during stage b : console.log(` ===> not sure what is this: ${x} `)
    return [...arr.slice(0, index), ...arr.slice(index+1)];  //stage b
}

module.exports = runGame;