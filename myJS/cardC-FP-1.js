// from node card0-impertive.js
// refactoring by stages 
// - stage a : just move logging so no mutation in the fuction
// - stage b : avoid play Random using in place mutation array splice 

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
        palyCards[0] = without(playCards, card0); // stage b
        turn +=1;
        
        console.log(`\tPlayer 0 plays: ${card0}`); // stage-a 
        console.log(`\tPlayer 1 plays: ${card1}`); // stage-a 
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
    
    console.log(`Scores: ${playerScores[0]} v ${playerScores[1]}`);
    
    if (playerScores[0] == playerScores[1]) {
        console.log("PLayer Tie.")
    } else if (playerScores[0] > playerScores[1]) {
        console.log("PLayer 0 Wins!")
    } else {
        console.log("PLayer 1 Wins!")
    }
}

runGame();

function popRandom(arr){
    const index = Math.floor(Math.random() * arr.length);
    const value = arr[index];
    arr.splice(index, 1);
    return value;
}

function playRandomStrategy(playerCards, bountyCard){
    const card = popRandom(playerCards);
    // stage a- console.log(`\tPlayer 0 plays: ${card}`);
    return card;
}

function playEqualStrategy(playerCards, bountyCard){
    playerCards.splice(playerCards.indexOf(bountyCard),1);
    // stage a- console.log(`\tPlayer 1 plays: ${bountyCard}`);
    return bountyCard;
}

function without(arr, value){                                //stage b
    const index = arr.indexOf(value);                        //stage b
    return [...arr.slice(0, index), ...arr.slice(index+1)];  //stage b
}

module.exports = runGame;