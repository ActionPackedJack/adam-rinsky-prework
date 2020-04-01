
//First, we link variables to our html elements so that we can display our information later.
const picture = document.querySelector("#picture");
const name = document.querySelector("#name");
const description = document.querySelector("#description");
const partialWord = document.querySelector("#partialWord");
const lettersGuessed = document.querySelector("#lettersGuessed");
const guessesRemaining = document.querySelector("#guessesRemaining");
const wins = document.querySelector("#wins");
const finalScore = document.querySelector("#finalScore");
const finalMessage = document.querySelector("#finalMessage");
//Then we establish an audio cue to play when an answer is guessed correctly.
var winSound = new Audio ('assets/sounds/shamisen.wav');
//Our answers are stored as an array of objects containing names that need to be guessed, trivia to display when the game reveals them, and file paths that point to images.
let answers = [
    {name: "Shuriken",
    picture: "assets/images/shuriken.jpeg",
    description: "Sharpened metal objects in varying shapes, designed to be thrown at the enemy.  Unlikely to kill the target; used more to injure and distract."},
    {name: "Tabi",
    picture: "assets/images/tabi.jpeg",
    description: "Split-toed shoes to facilitate finding footholds when climbing."},
    {name: "Shinobi Shozoku",
    picture: "assets/images/shinobi_shozoku.jpeg",
    description: "It is unlikely that ninja actually wore these, as it would incriminate them immediately if found.  However, various art from the era proves that this image of them did exist at the time.  This outfit was worn by stage hands in theatrical performances to signify that the audience should ignore them."},
    {name: "Kama",
    picture: "assets/images/kama.jpg",
    description: "A common farming sickle.  Since peasants were prohibited from carrying weapons, they learned to fight with objects that could be carried inconspicuously."},
    {name: "Kusarigama",
    picture: "assets/images/kusarigama.jpeg",
    description: "A chain with a weight on one end and a sickle on the other.  The chain was swung in one hand to entangle or disarm an opponent, while the sickle was held in the other hand to be ready to deliver the finishing blow."},
    {name: "Shuko",
    picture: "assets/images/shuko.jpg",
    description: "Claws worn around the palms, primarily to assist in climbing but useful as a last resort in a fight.  May have inspired the myth that ninja could catch a sword with their bare hands."},
    {name: "Metsubishi",
    picture: "assets/images/metsubishi.jpg",
    description: "Blinding powder.  Kept in a hollowed-out brittle object, such as an egg, then broken and flung in an enemy's face.  If the ninja was in a good mood, it might be filled with simple dust.  If not, it could be filled with pepper, or even metal filings."},
    {name: "Kunai",
    picture: "assets/images/kunai.jpeg",
    description: "A blunt instrument used for digging or prying."},
    {name: "Tetsubishi",
    picture: "assets/images/tetsubishi.jpeg",
    description: "Known in the West as caltrops.  Metal trinkets with enough pointy ends that, when dropped, will always land with at least one facing upward.  Designed to be thrown on the ground behind oneself when fleeing, so that pursuers will need to move more slowly and watch their steps."},
    {name: "Kaginawa",
    picture: "assets/images/kaginawa.jpeg",
    description: "A grappling hook.  Thrown over the side of a wall, so that the user can climb the attached rope."}
];
//Then we establish our game object.
let game = {
    //Whether or not the game is accepting guesses.
    active: true,
    //What letters have already been guessed.
    lettersGuessed: [],
    //How many times the player has guessed correctly.
    wins: 0,
    //Fairly obvious.
    guessesRemaining: 15,
    //What part of the word has already been guessed.
    partialWord: "",
    answer: undefined,
    //How the answer's name will appear in the guessing window, because we don't want spaces or capital letters.
    guessableAnswer: undefined,
    setAnswer: function(index){
        //Resets the number of guesses...
        this.guessesRemaining = 15;
        //..and update that in the display.
        guessesRemaining.innerText = this.guessesRemaining;
        //If we're not setting the answer for the first time, the previous answer is displayed for the viewer.
        if(index !==0 && this.answer != undefined){
            console.log ("Setting display to show " + this.answer.name);
            name.innerText = this.answer.name;
            description.innerText = this.answer.description;
            picture.innerHTML = "<img src = '" + this.answer.picture + "' >";
            console.log(picture);
        }
        //The answer is set on the backend.
        this.answer = answers[index];
        //The answer is transformed to lowercase and the white space is removed.  The result is stored in a variable the player actually guesses.
        this.guessableAnswer = "";
        for (let i = 0; i < this.answer.name.length; i++){
            if(this.answer.name[i] !==" "){
                this.guessableAnswer += this.answer.name[i].toLowerCase();
            }
        }
        //Then an underscore is displayed for each guessable letter.
        this.partialWord = "";
        for (let i = 0; i < this.guessableAnswer.length; i++){
            this.partialWord+="_";
        }
        //..and we update that in the display.
        partialWord.innerHTML = this.partialWord;
    },
    nextAnswer: function(){
        //We reset the letters that have been guessed.
        this.lettersGuessed = [];
        //..and update that in the display.
        lettersGuessed.innerText = this.lettersGuessed;
        //If we're already at the last answer, we end the game.
        if(this.answer === answers[answers.length-1]){
            this.scoreReport();
        }
        //If we're doing this for the first time, we go to the first answer.
        else if(this.answer === undefined){
                this.setAnswer(answers[0]);
            }
        //Otherwise, we just cycle to the next one.
        else{               
                this.setAnswer(answers.indexOf(this.answer)+1);
            }
        },
    win: function(){
        winSound.play();
        this.wins++;
        wins.innerText = this.wins;
        this.nextAnswer();
    },
    lose: function(){
        this.nextAnswer();
    },
    guessLetter: function(guess){
        //We first check to see if the player has already guessed this letter.
        if(this.lettersGuessed.indexOf(guess)===-1){
            //If not, we see whether the guess is in the letter.
            if(this.guessableAnswer.indexOf(guess)!==-1){
                //If so, we replace every appropriate underscore with the guessed letter.
                for(let i = 0; i < this.guessableAnswer.length; i ++){
                    if(this.guessableAnswer[i] === guess){
                        partialWord.innerText = partialWord.innerText.slice(0, i) + guess + partialWord.innerText.slice(i+1, partialWord.innerText.length);
                    }
                }
            }
            //Then we add the guessed letter to the list of previous guesses.
            this.lettersGuessed.push(guess);
            //If every letter has been guessed, we run the win codde.
            if(partialWord.innerText === this.guessableAnswer){
                this.win();
            }
            else{
                //Then we decrement the remaining guesses, and if we are at 0, hang our heads in shame.
                this.guessesRemaining--;
                guessesRemaining.innerText = this.guessesRemaining;
                if(this.guessesRemaining === 0){
                    this.lose();
                }
                else{
                    //This alphabetizes the guesses before displaying them onscreen.
                    lettersGuessed.innerText = this.lettersGuessed.sort();
                }
            }
        }
    },
    scoreReport: function(){
        //This disables new guesses.
        this.active = false;
        //This displays the final answer.
        name.innerText = this.answer.name;
        description.innerText = this.answer.description;
        picture.innerHTML = "<img src = '" + this.answer.picture + "' >";
        //This shows the final score.
        finalScore.innerText = "Final score : " + this.wins + " of " + answers.length;
        //This prints a message based on how well the player did.
        if(this.wins === answers.length){
            finalMessage.innerText = "Wow, you got all of them.  You're either a true ninja master, or as thorough of a nerd as I am.";
        }
        else if (this.wins > 5){
            finalMessage.innerText = "Impressive.  This is far better than I expected anyone to do.";
        }
        else if(this.wins > 2){
            finalMessage.innerText = "Well, you got a few.  This knowledge is pretty obscure, so I'm not expecting people to know very many of these.  I hope you learned something interesting.";
        }
        else{
            finalMessage.innerText = "No judgment though.  This is about as esoteric as trivia gets.  But I hope you learned something interesting.";
        }
    }
};
//This initializes everything.
wins.innerText = 0;
game.setAnswer(0);
document.addEventListener('keyup', logKey);

function logKey(e){
    //This checks whether the game is still running, and whether the key pressed is a letter, before reacting further.
    if(e.keyCode >= 65 && e.keyCode <= 90 && game.active === true){
        game.guessLetter(e.key);
    }
}
