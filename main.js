


// ctrl + shift + h for live html
//ctr + j + s for live console

var items = 0;
var score = 0;
var fail = 0;
var diff = 1;
var totalscore = 0;
var question = '';
var test = [];
var mistakes = [];
var pracNumbers = [];
var pracAnswer = 0;
var index = 0;

var input = document.getElementById('p');
var span = document.getElementById('prac');
var answerBtn = document.getElementById('G');


// Hide button 1 & 2 & prog bar & Wrong answer text until start;
document.getElementById('button').style.visibility = 'hidden';
document.getElementById('G').style.visibility = 'hidden';
document.getElementById('progressBar').style.visibility = 'hidden';
document.getElementById('gameOverLvl').style.visibility = 'hidden';
document.getElementById('p').style.visibility = 'hidden';

//Use enter key to input
var inpu = document.getElementById("z");
inpu.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("button").click();
  }
});

//Use enter key to input
var inpu2 = document.getElementById("p");
inpu2.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("G").click();
  }
});


// Set difficulty
function setDiff(){
  if (document.getElementById('1').checked == true) {
    diff = 1} else if (document.getElementById('2').checked == true) {
      diff = 2
    } else if (document.getElementById('3').checked == true) {
      diff = 3
    }
    // Hide buttons after press
    document.getElementById('1').remove();
    document.getElementById('2').remove();
    document.getElementById('3').remove();
    document.getElementById('ez').remove();
    document.getElementById('md').remove();
    document.getElementById('hd').remove();
    document.getElementById('progressBar').style.visibility = 'visible';
    document.getElementById('selectdiff').remove();
    document.getElementById('infoTxt').remove();
    Quest();
    timerFunc();

}

//Question Function
function Quest(){

  numbers = [easy = [1,2,3,10],medium = [4,5,9],hard = [6,7,8],all = [1,2,3,4,5,6,7,8,9]];

  if (diff == 1) {

    var nr1 = easy[Math.floor(Math.random() * easy.length)]; //Pick out random numbers per diff
  } else if (diff == 2) {
    var nr1 = medium[Math.floor(Math.random() * medium.length)]; //Pick out random numbers per diff
  } else {
    var nr1 = hard[Math.floor(Math.random() * hard.length)]; //Pick out random numbers per diff
    numbers = [easy = [1,2,3,10],medium = [4,5,9],hard = [6,7,8],all = [3,4,5,6,7,8]];
  }

    var nr2 = all[Math.floor(Math.random() * all.length)]; //Pick random number 1-10

    test =  ['What is ' + nr1 + ' * ' + nr2 + '?','What is ' + nr2 + ' * ' + nr1 + '?'];

    nr3 = nr1 * nr2; //Define the correct answer

    question = test[Math.floor(Math.random() * test.length)]; // Draw order random

    document.getElementById("first").innerHTML = question;

    document.getElementById("z").style.display = 'block';

    document.getElementById('button').style.visibility = 'visible';



    items += 1
}


// Anser function
function Answ() {
  var userAns = document.getElementById("z").value;
  if (userAns == nr3) {
    score++;
    timeleft +=2;
    totalscore += nr3;
    $('#feedbackC').show();
    $('#feedbackC').delay(800).fadeOut();
    Quest();
  }else{
    $('#feedbackW').show();
    $('#feedbackW').delay(800).fadeOut();
      fail++;
      timeleft -=2;
      pracNumbers.push(question);
      mistakes.push(question);
      mistakes.push(' = ' + nr3);
      mistakes.push(' <br> ');
      Quest();
  }
  document.getElementById("scoretext").innerHTML = 'Score: ' + totalscore;
  if (fail == 5) {
    gameOver();
  }
  document.getElementById('z').value = "";

  // Stop timer going above 10
  if(timeleft > 10){
    timeleft = 10;
  }
}

//Timer
var timeleft = 10;

function timerFunc(){
  var downloadTimer = setInterval(function(){
    if(timeleft <= 0){
      clearInterval(downloadTimer);
    }
    document.getElementById("progressBar").value = 10 - timeleft;
    if (items <= 10) {
        timeleft -= 0.005
    } else if (items > 10) {
      timeleft -= 0.01
    } else if (items > 20) {
      timeleft -= 0.05
    } else if (items > 30) {
      timeleft -= 0.1
    } else if (items > 40) {
      timeleft -= 0.15
    } else {
      timeleft -= 0.20
    }
  }, 10);
}


// Game over function
function gameOver(){
  document.getElementById('mainLvl').remove();
  document.getElementById('gameOverLvl').style.visibility = 'visible';
  mistakes = mistakes.map(String);
  mistakes = mistakes.join(' ');
  mistakes = mistakes.replace(/What is/g,'');
  mistakes = mistakes.replace(/\?/g,'');
  document.getElementById("questDisp").innerHTML = mistakes;
}

// Global game Over
window.setInterval(function(){
  if(timeleft < 0){
    gameOver();
    timeleft = 10
  }
}, 100);

// Retry Function
function retry() {
  location.reload();
}

// Practice Function
function practice() {
  document.getElementById('gameOverLvl').remove();
  document.getElementById('p').style.visibility = 'visible';
  document.getElementById('G').style.visibility = 'visible';
  //Practice stuff
  pracOnly = pracNumbers.join();
  pracOnly = pracOnly.replace(/What is /g,'');
  pracOnly = pracOnly.replace(/\?/g,' = ');
  //pracOnly = pracOnly.replace(/\*/g,'');
  pracOnly = pracOnly.replace(/ /g,'');
  pracOnly = pracOnly.split(',');

  showNextQuestion();

}


answerBtn.addEventListener('click', function practiceAnswer() {
  if (input.value == pracAnswer) {

    $("#pracCW").html("Correct!");
    $("#pracCW").css("color","#19C27E");
    $('#pracCW').show();
    $('#pracCW').delay(1000).fadeOut();



    input.value = '';
    showNextQuestion();
  } else {
    $("#pracCW").html("Wrong");
    $("#pracCW").css("color","#9A275A");
    $('#pracCW').show();
    $('#pracCW').delay(1000).fadeOut();
    input.value = '';
  }
});

function showNextQuestion() {
  if (index == pracOnly.length) {
    return endQuiz();
  };

  pracA = pracOnly[index];


  a = pracA.split('*');

  a_1 = parseInt(a[0]);

  a_2 = parseInt(a[1]);

  pracAnswer = a_1 * a_2;

  span.innerHTML = pracOnly[index];
  index++;

}


function endQuiz() {
  span.innerHTML = 'Quiz Over';
  input.style.display = 'none';
  answerBtn.style.display = 'none';
  document.getElementById('lastRT').style.display = 'block';
}


showNextQuestion();
