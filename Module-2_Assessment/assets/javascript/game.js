
const picture = document.querySelector("#picture");
const name = document.querySelector("#name");
const description = document.querySelector("#description");
const partialWord = document.querySelector("#partialWord");
const lettersGuessed = document.querySelector("#lettersGuessed");
const guessesRemaining = document.querySelector("#guessesRemaining");
const wins = document.querySelector("#wins");
const finalScore = document.querySelector("#finalScore");
const finalMessage = document.querySelector("#finalMessage");

var winSound = new Audio ('assets/sounds/shamisen.wav');
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

let game = {
    active: true,
    lettersGuessed: [],
    wins: 0,
    guessesRemaining: 15,
    partialWord: "",
    answer: undefined,
    guessableAnswer: undefined,
    setAnswer: function(index){
        console.log("SETANSWER to index: ", index);
        this.guessesRemaining = 15;
        guessesRemaining.innerText = this.guessesRemaining;
        if(index !==0 && this.answer != undefined){
            console.log ("Setting display to show " + this.answer.name);
            name.innerText = this.answer.name;
            description.innerText = this.answer.description;
            picture.innerHTML = "<img src = '" + this.answer.picture + "' >";
            console.log(picture);
        }
        this.answer = answers[index];
        this.guessableAnswer = "";
        for (let i = 0; i < this.answer.name.length; i++){
            if(this.answer.name[i] !==" "){
                console.log("Adding " + this.answer.name[i].toLowerCase() +" to guessableAnswer");
                this.guessableAnswer += this.answer.name[i].toLowerCase();
            }
        }
        this.partialWord = "";
        for (let i = 0; i < this.guessableAnswer.length; i++){
            this.partialWord+="_";
        }
        partialWord.innerHTML = this.partialWord;
        console.log("Current answer: " + this.guessableAnswer);
    },
    nextAnswer: function(){
        console.log("NEXTANSWER");
        this.lettersGuessed = [];
        lettersGuessed.innerText = this.lettersGuessed;
        if(this.answer === answers[answers.length-1]){
            this.scoreReport();
        }
        else if(this.answer === undefined){
                this.setAnswer(answers[0]);
            }
        else{               
                this.setAnswer(answers.indexOf(this.answer)+1);
            }
        },
    win: function(){
        console.log("Win!");
        winSound.play();
        this.wins++;
        wins.innerText = this.wins;
        this.nextAnswer();
    },
    lose: function(){
        console.log("Lose...");
        this.nextAnswer();
    },
    guessLetter: function(guess){
        console.log("GUESSING LETTER: " + guess);
        console.log (this.lettersGuessed.indexOf(guess));
        if(this.lettersGuessed.indexOf(guess)===-1){
            if(this.guessableAnswer.indexOf(guess)!==-1){
                for(let i = 0; i < this.guessableAnswer.length; i ++){
                    if(this.guessableAnswer[i] === guess){
                        partialWord.innerText = partialWord.innerText.slice(0, i) + guess + partialWord.innerText.slice(i+1, partialWord.innerText.length);
                    }
                }
            }
            this.lettersGuessed.push(guess);
            if(partialWord.innerText === this.guessableAnswer){
                this.win();
            }
            else{
                this.guessesRemaining--;
                guessesRemaining.innerText = this.guessesRemaining;
                if(this.guessesRemaining === 0){
                    this.lose();
                }
                else{
                    lettersGuessed.innerText = this.lettersGuessed.sort();
                }
            }
        }
    },
    scoreReport: function(){
        this.active = false;
        finalScore.innerText = "Final score : " + this.wins + " of " + answers.length;
        if(this.wins === answers.length){
            finalMessage.innerText = "Wow, you got all of them.  You're either a true ninja master, or as thorough of a nerd as I am.";
        }
        else if (this.wins > 6){
            finalMessage.innerText = "Impressive.  This is far better than I expected anyone to do.";
        }
        else if(this.wins > 3){
            finalMessage.innerText = "Well, you got a few.  This knowledge is pretty obscure, so I'm not expecting people to know very many of these.  I hope you learned something interesting.";
        }
        else{
            finalMessage.innerText = "No judgment though.  This is about as esoteric as trivia gets.  But I hope you learned something interesting.";
        }
    }
};
wins.innerText = 0;
game.setAnswer(0);
document.addEventListener('keyup', logKey);

function logKey(e){
    // console.log ("Key pressed. Key data:");
    // console.log(e.key);
    if(e.keyCode >= 65 && e.keyCode <= 90 && game.active === true){
        game.guessLetter(e.key);
    }
}
