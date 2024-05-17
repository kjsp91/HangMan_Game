const words = [
  ["apple", "It's a fruit"],
  ["elephant", "It's an animal"],
  ["vijayawada", "It's a city"],
  ["andaman", "It's an island"],
];
let flag = true
const hint = document.getElementById("hint");
const word = document.getElementById("word");
const msge = document.getElementById("msge")
let updatedWord = "";
let selectedWord = ""; //one of the random word from above list
let displayWord = ""; //user will guess the word(_ _ _ _ _)
let attempts = 0;
let maxAttempts = 6;
let guessedLetters = []; //how many leterrs user guessed these should not be used by user again
const gl = document.getElementById("guessed")
const canvas = document.getElementById("canv");
canvas.height = 500;
canvas.width = 400;
const retry = ()=>{
  document.getElementsByClassName('container')[0].style.visibility = 'hidden'
  window.location.reload();

}

const intializeGame = () => {
 
  const selectedIndex = parseInt(Math.random() * words.length); //gives values b/w 0 to 3 but not 3
  selectedWord = words[selectedIndex][0]; //getting 1st value of array
  hint.innerText = `${words[selectedIndex][1]}`;
  displayWord = "_ ".repeat(selectedWord.length).trim(); //trim --> to remove extra space at last
  word.innerText = displayWord;
  console.log(selectedWord);
  drawHangman();
};




const drawHangman = () => {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  //down box
  ctx.rect(20, 433, 330, 20);
  //side line
  ctx.moveTo(50, 40);
  ctx.lineTo(50, 433);
  //horizantal top line
  ctx.moveTo(50, 40);
  ctx.lineTo(200, 40);
    ctx.stroke();
  if (attempts > 0) {
    //head top line
    ctx.moveTo(200, 40);
    ctx.lineTo(200, 89);
    ctx.stroke();
  }
  if (attempts > 1) {
    //face
    ctx.moveTo(233, 120); // there should be moveTo otherwise the line above executed will continue
    ctx.arc(200, 120, 33, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (attempts > 2) {
    //body
    ctx.moveTo(200, 154);
    ctx.lineTo(200, 280);
    ctx.stroke();
  }
  if (attempts > 3) {
    //hand left
    ctx.moveTo(140, 210);
    ctx.lineTo(200, 155);
    ctx.stroke();
  }
  if (attempts > 4) {
    //hand right
    ctx.moveTo(265, 210);
    ctx.lineTo(200, 154);
    ctx.stroke();
  }
  if (attempts > 5) {
    //leg left
    ctx.moveTo(145, 340);
    ctx.lineTo(200, 280);
    ctx.stroke();
  }
  if (attempts > 6) {
    //leg right
    ctx.moveTo(200, 280);
    ctx.lineTo(260, 339);
    ctx.stroke();
  }
};
intializeGame();

const update = ()=>{
  let updatedWord = ''
  for(let i=0;i<selectedWord.length;i++){
    if(guessedLetters.indexOf(selectedWord[i]) > -1){
      updatedWord+=selectedWord[i] + ' '
    }else{
      updatedWord+='_ '
    }
  }
  displayWord = updatedWord
  word.innerText = updatedWord
}

const perform = (event)=>{
  if(flag){
    let letterPressed = event.key;
    
    reg = /^[A-Z]?[a-z]?$/
    // console.log(guessedLetters)
    // console.log(reg.test(letterPressed))
    if(reg.test(letterPressed)){
      if(guessedLetters.includes(letterPressed)){
        return
      }else{
        gl.innerHTML += `<span id="press">${letterPressed}</span>`
      }
      if(!selectedWord.includes(letterPressed)){
        attempts++;
      }
      guessedLetters.push(letterPressed)
      update()
      drawHangman()
      if(displayWord.replace(/ /g,'')===selectedWord){
          msge.innerText="Hurray!! You WON"
          msge.className = 'won' 
          document.getElementById("retry").style.display = "block"

      }
      if(attempts===7){
        msge.innerText = "Sorry You Lost"
        flag = false
        msge.className = 'msge' 
        document.getElementById("retry").style.display = "block"
        // document.getElementsByClassName('container')[0].style.visibility = 'visible'
      }
    }else{
      console.log("Press Right")
    } 
  }

}
// let start = 120
// const timer = ()=>{
//   const time = document.getElementById("timer")
//   time.innerHTML = start
//   start-- 
//   if(start==100){
//     console.log("Half")
//   }
  
// }
// setInterval(timer,1000)

document.addEventListener('keydown',perform)

