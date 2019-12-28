// from node card0-impertive.js
// refactoring by stages 
// - stage a : (try to remove mutation) just move logging so no mutation in the fuction
// - stage b : (make popRandom () pure) avoid play Random using in place mutation array splice 
// - stage c : (make payEqual () pure) 
// - stage d : (extract winMessage) try to avoid logic in display message
// - stage e : (combine end message) 
// - stage f : (combine sate vars into one)
// - stage g : (creat a nextState()) basically it is generalisd to nextState( current state) 
// - stage h : (create a turn message) 
// - stage i : (store states in an array)

// adopt the competition card is discarded as in wiki: https://en.wikipedia.org/wiki/Goofspiel

function runGame() {
    let states = [{ turn : 0,
                  bountyCards : [1, 2, 3, 4, 5, 6, 7, 8],
                  playerCards : [[1, 2, 3, 4, 5, 6, 7, 8],
                                 [1, 2, 3, 4, 5, 6, 7, 8]],
                  lastBountyCard: 0,  
                  lastPlayingCards : [0, 0], // need this to avoid cannot logging in stage g
                  playerScores : [0, 0]}] // stage f and many below to use state. !!!

    while (last(states).bountyCards.length > 0) { // some minor bugs and concat is from end
        
        
        console.log(turnMessage("before", last(states)));
        
        states = states.concat(nextState(last(states))) // some minor bugs and concat is from end
        
        // stage g - const bountyCard = selectRandom(state.bountyCards);  // stage b - popRandom(bountyCards); 
        // stage g - state.bountyCards = without(state.bountyCards, bountyCard) // stage b - 
        
        console.log(turnMessage("after", last(states)));
        

        // stage g - const card0 = playRandomStrategy(state.playerCards[0], bountyCard);
        // stage g - const card1 = playEqualStrategy(state.playerCards[1], bountyCard);
        // stage g - state.playerCards[0] = without(state.playerCards[0], card0); // stage b
        // stage g - state.playerCards[1] = without(state.playerCards[1], card1); // stage c
        
        // stage g - state.turn +=1;
        
        //console.log(`\tPlayer 0 plays: ${state.lastPlayingCards[0]}`)// card0}`); // stage - a 
        //console.log(`\tPlayer 1 plays: ${state.lastPlayingCards[1]}`)// card1}`); // stage - a 
                                                   // ; see wiki best strategy against random play
        
        // stage g - if (card0 > card1) {
        // stage g -     state.playerScores[0] += bountyCard;
        // stage g - } else if (card1 > card0){
        // stage g -     state.playerScores[1] += bountyCard;
        // stage g - } else {
        // stage g -     //console.log(`\ncard0 is ${card0}`);
        // stage g -     //console.log(`card1 is ${card1}`);
        // stage g -    console.log("the competition card is discarded")
        // stage g - }
    }
    
    // stage e - console.log(`Scores: ${playerScores[0]} v ${playerScores[1]}`);
    
    // stage e = console.log(winMessage(playerScores));
    
    console.log(endMessage(last(states).playerScores));
    
    // stage d - if (playerScores[0] == playerScores[1]) {
    // stage d -     console.log("PLayer Tie.")
    // stage d - } else if (playerScores[0] > playerScores[1]) {
    // stage d -     console.log("PLayer 0 Wins!")
    // stage d - } else {
    // stage d -     console.log("PLayer 1 Wins!")
    // stage d - }
}

runGame();

function last(arr){
    return arr[arr.length - 1];
}

function turnMessage(status, state){
   if (status == 'before') { 
       return   `-------------------------------\n`+
            status +` Turn ${state.turn}:`+ 
            `\n\t  bountyCards: ${state.bountyCards}, ` +
            `\n\t  playerCards: ${state.playerCards}, ` +
            `\n\t  lastBountyCards: ${state.lastBountyCard}, ` +
            `\n\t  lastPlayingCards: ${state.lastPlayingCards}, ` +
            `\n\t  playerScores: ${state.playerScores}. `
   } else {
       return   `|||||||||||||||||||||||||||||||\n`+
            status +`  Turn ${state.turn}:`+ 
            `\n\t  bountyCards: ${state.bountyCards}, ` +
            `\n\t  playerCards: ${state.playerCards}, ` +
            `\n\t  lastBountyCards: ${state.lastBountyCard}, ` +
            `\n\t  lastPlayingCards: ${state.lastPlayingCards}, ` +
            `\n\t  playerScores: ${state.playerScores}.  ` +
            `\n===============================\n`
   }
}

function nextState(state) {

        const bountyCard = selectRandom(state.bountyCards);  // stage b - popRandom(bountyCards); 
        // no need just return : state.bountyCards = without(state.bountyCards, bountyCard) // stage b - 
        
        // remain in the main logic : console.log(`Turn ${state.turn}: Bounty: ${bountyCard}`);
        const card0 = playRandomStrategy(state.playerCards[0], bountyCard);
        const card1 = playEqualStrategy(state.playerCards[1], bountyCard);
        // no need just return : state.playerCards[0] = without(state.playerCards[0], card0); // stage b
        // no need just return : state.playerCards[1] = without(state.playerCards[1], card1); // stage c
        
        // no need just return : state.turn +=1;
        
        // remain in the main logic : console.log(`\tPlayer 0 plays: ${card0}`); // stage - a 
        // remain in the main logic : console.log(`\tPlayer 1 plays: ${card1}`); // stage - a 
                                                   // ; see wiki best strategy against random play
        
        // use a new function - if (card0 > card1) {
        // use a new function -     state.playerScores[0] += bountyCard;
        // use a new function - } else if (card1 > card0){
        // use a new function -     state.playerScores[1] += bountyCard;
        // use a new function - } else {
        // use a new function -     //console.log(`\ncard0 is ${card0}`);
        // use a new function -     //console.log(`card1 is ${card1}`);
        // use a new function -     console.log("the competition card is discarded")
        // use a new function - }
    
        return {turn: state.turn + 1,
                bountyCards: without(state.bountyCards, bountyCard),
                playerCards: [without(state.playerCards[0], card0),  // source has a bugs without card0
                              without(state.playerCards[1], card1)], // source has a bugs without card1
                lastBountyCard: bountyCard, 
                lastPlayingCards : [card0, card1],
                playerScores: newScore(state.playerScores, 
                                       [card0, card1],
                                       bountyCard) // source has a bugs without bountyCard1
        }
}

function newScore(playerScores, playerCards, bountyCard){
    if (playerCards[0] > playerCards[1]) {
            return [playerScores[0]+bountyCard, playerScores[1]]; // source has a bugs not + 1
        } else if (playerCards[0] < playerCards[1]){
            return [playerScores[0]  ,  playerScores[1]+bountyCard]; // source has a bugs not + 
        } else {
          // no need  //console.log(`\ncard0 is ${card0}`);
          // no need  //console.log(`card1 is ${card1}`);
          // no need  console.log("the competition card is discarded")
            return [playerScores[0]  ,  playerScores[1]]  // actually need this as still need to return
          }
}

function scoreMessage(playerScores){
    return `Scores: ${playerScores[0]} v ${playerScores[1]}`;
}

function endMessage(playerScores){
    return scoreMessage(playerScores) + "\n" + 
           winMessage(playerScores);
}

function winMessage(playerScores) {
    if (playerScores[0] == playerScores[1]) {
        return "PLayer Tie.\n";
    } else if (playerScores[0] > playerScores[1]) {
        return "PLayer 0 Wins!\n";
    } else {
        return "PLayer 1 Wins!\n";
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