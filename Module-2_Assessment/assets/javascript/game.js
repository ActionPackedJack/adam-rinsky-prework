const picture = document.querySelector("#picture");
const name = document.querySelector("#name");
const description = document.querySelector("#description");
const partialWord = document.querySelector("#partialWord");
const lettersGuessed = document.querySelector("#lettersGuessed");
const guessesRemaining = document.querySelector("#guessesRemaining");
const wins = document.querySelector("#wins");

let game = {
    lettersGuessed: [],
    wins: 0,
    answer: "",
    guessesRemaining: 15,
    partialWord: ""
};

let answer = {
    name: "",
    picture: undefined,
    description: undefined
};

let answers = [
    {name: "Shuriken",
    picture: "../images/shuriken.jpeg",
    description: "Sharpened metal objects in varying shapes, designed to be thrown at the enemy.  Unlikely to kill the target, used more to injure and distract."},
    {name: "Tabi",
    picture: "../images/tabi.jpeg",
    description: "Split-toed shoes to facilitate finding footholds when climbing."},
    {name: "Shinobi Shozoku",
    picture: "../images/shinobi_shozoku.jpeg",
    description: "It is unlikely that ninja actually wore these, as it would incriminate them immediately if found.  However, various art from the era proves that this image of them did exist at the time.  This outfit was worn by stage hands in theatrical performances to signify that the audience should ignore them."},
    {name: "Kama",
    picture: "../images/kusarigama",
    description: "A common farming sickle.  Since peasants were prohibited from carrying weapons, they learned to fight with objects that could be carried inconspicuously."},
    {name: "Kusarigama",
    picture: "../images/kusarigama.jpeg",
    description: "A chain with a weight on one end and a sickle on the other.  The chain was swung in one hand to entangle or disarm an opponent, while the sickle was held in the other hand to be ready to deliver the finishing blow."},
    {name: "Shuko",
    picture: "../images/shuko.jpg",
    description: "Claws worn around the palms, primarily to assist in climbing but useful as a last resort in a fight.  May have inspired the myth that ninja could catch a sword with their bare hands."},
    {name: "Metsubishi",
    picture: "../images/metsubishi.jpg",
    description: "Blinding powder.  Kept in a hollowed-out brittle object, such as an egg, then broken and flung in an enemy's face.  If the ninja was in a good mood, it might be filled with simple dust.  If not, it could be filled with pepper, or even metal filings."},
    {name: "Kunai",
    picture: "../images/kunai.jpeg",
    description: "A blunt instrument used for digging or prying."},
    {name: "Tetsubishi",
    picture: "../images/tetsubishi.jpeg",
    description: "Known in the West as caltrops.  Metal trinkets with enough pointy ends that, when dropped, will always land with at least one facing upward.  Designed to be thrown on the ground behind oneself when fleeing, so that pursuers will need to move more slowly and watch their steps."},
    {name: "Kaginawa",
    picture: "../images/kaginawa.jpeg",
    description: "A grappling hook.  Thrown over the side of a wall, so that the user can climb the attached rope."}
]