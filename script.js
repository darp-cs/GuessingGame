let msgElement = document.getElementById("msg");

const getRandomNumber = () => (Math.floor(Math.random()*100)+1);
randNum = getRandomNumber()

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();
recognition.addEventListener("result", onSpeak);

function onSpeak(e){
     var msg = e.results[0][0].transcript;
     writeMessage(msg);
     checkNumber(msg);
}

function writeMessage(msg){
     msgElement.innerHTML = `
        <div> You said:</div>
        <span class ="box">${msg}</span>`
}

function checkNumber(msg){
    const num = +msg;
    if(Number.isNaN(num)){
        msgElement.innerHTML += `<div> That is not a valid number</div>`;
        return;
    }
    if(num>100||num<1){
        msgElement.innerHTML+=`<div> Number must be between 1 and 100 </div>`
        return;
    }
    if(num === randNum){
        document.body.innerHTML = `
        <h2> Congrats! You have guessed the number!<br><br>
        It was ${num}</h2>
        <button class = "play-again" id="play-again"> Play Again</button>
        `;
    } else if(num>randNum){
        msgElement.innerHTML += `<div>GO LOWER </div>`;
    } else{
        msgElement.innerHTML += `<div>GO HIGHER </div>`;
    }

}

recognition.addEventListener('end',()=> recognition.start());

document.body.addEventListener('click', e => {
    if(e.target.id == "play-again"){
        window.location.reload();
    }
})