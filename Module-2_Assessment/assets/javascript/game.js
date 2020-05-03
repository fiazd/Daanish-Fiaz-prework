let alphabet = "abcdefghijklmnopqrstuvwxyz".split(""); //alphabet
let characters = ["kirby", "mario", "yoshi", "luigi", "link", "zelda", "cortana", "niko", "kratos", "ezio"] //characters array for words

const state = {
    currWord : "kirby", 
    answer : [], //word split by "" 
    correctAnswers : [], //array conntaining coorrect guesses
    numWins : 0, 
    numGamesPlayed : 0,
    wrongLetters : [],
    numChances : 13,

    //We need a function to pick a random word as the first word
    pickRandom : function(words){
        let random = Math.floor(Math.random()*words.length);
        this.currWord = characters[random];
        console.log(random);
    },

    resetHelper : function(){ //will help reset by reseting answer and correctAnswers
        this.answer = this.currWord.split("");
        const temp = [];
        for(i = 0; i < this.answer.length; i++){
            temp.push("_ ");
        }
        this.correctAnswers = temp;
    },

    resetGame : function(){ //reset game after each loss or win
        this.numGamesPlayed += 1;
        this.updateWins();
        this.pickRandom(characters);
        this.wrongLetters = [];
        this.numChances = 13;
        this.resetHelper();
        this.display();
    },

    isGameOver : function(){ //checks the state of the game to determine if a loss or win occurred
        console.log('Checking if game is over...');
        let stateH3 = document.querySelector('#state');
        
        if(this.correctAnswers.includes("_ ") === false){ //if blanks are all filled
            stateH3.innerText = `You win! Word was ${this.currWord}.` //you win
            this.numWins += 1; // add to wins
            this.resetGame(); //then reset game, only reset game when you win or run out of guesses
        }
        else if(this.numChances === 0){
            stateH3.innerText = `You lost! Word was ${this.word}.`
            this.resetGame();
        }
    },

    display : function(){ //updates our display for all elements except wins
        let guessWordH3 = document.querySelector('#guessWord');
        let numGuessesLeftH3 = document.querySelector('#numGuessesLeft');
        let numGuessesWrongH3 = document.querySelector('#numGuessesWrong');

        let currGuess = "";

        for(i = 0; i < this.correctAnswers.length; i++){
            currGuess += this.correctAnswers[i];
        }

        let wrongGuess = ""; //string that we will display to the user for wrong chars
        if(this.wrongLetters.length > 1){
            for(i = 0; i < this.wrongLetters.length - 1; i++){
                wrongGuess += this.wrongLetters[i] + ", ";
            }
            wrongGuess += this.wrongLetters[this.wrongLetters.length - 1];
        }
        else if(this.wrongLetters.length === 1){
            wrongGuess += this.wrongLetters[0];
        }
        //update display variables
        guessWordH3.innerText = currGuess;
        numGuessesLeftH3.innerText = this.numChances;
        numGuessesWrongH3.innerText = wrongGuess;

    },

    updateWins : function(){ //updates display for wins
        let winsH3 = document.querySelector('#numWins');

        if(this.numGamesPlayed > 0){
            winsH3.innerText = `${this.numWins}`;
        }
        else{
            winsH3.innerText = `${this.numWins}`;
        }
    },

    //Next we need to take in the input guess word
    inputGuess : function(event){
        const key = event.key;

        if(alphabet.includes(key)){ //if it is a valid key
            if(state.answer.includes(key)){
                let indexes = [];
                for(i = 0; i < state.answer.length; i++){
                    if(state.answer[i] === key){
                        indexes.push(i);
                    }
                }
                for(i = 0; i < indexes.length; i++){
                    state.correctAnswers[indexes[i]] = state.answer[indexes[i]];
                }
            }
            else{
                state.wrongLetters.push(key);
                state.numChances-=1;
            }
        }
        
        state.display();
        state.isGameOver();
    }

}
//main four functions that will be called
state.pickRandom(characters); 
state.updateWins();
state.resetHelper();
state.display();
//function that is called everytime we press a key
document.addEventListener('keyup', state.inputGuess);