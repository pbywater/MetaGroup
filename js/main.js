// FUNCTIONS TO BE RUN AFTER PAGE HAS LOADED
$(document).ready(function() {   


//Text character countdown

var text_max = 1000;
$('#count_message').html(text_max + ' characters remaining');
$('#text').keyup(function() {
    var text_length = $('#text').val().length;
    var text_remaining = text_max - text_length;
    $('#count_message').html(text_remaining + ' characters remaining');
});
        
});



//FUNCTIONS TO BE RUN BEFORE PAGE HAS LOADED

//Allows only numbers
//charCode values can be found here: http://stevehardie.com/2009/09/character-code-list-char-code/ 
//Used charCode to limit input to only numbers and + symbol
// || means OR
// && means AND
function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if ((charCode > 31 && charCode < 43) || (charCode > 43 && (charCode < 48 || charCode > 57)))
        return false;
    return true;
}

//Allows only letters
//Used charCode to limit input to only letters and hyphens
function isAlphaKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if ((charCode > 32 && charCode < 45) || (charCode > 45 && charCode < 65) || (charCode > 90 && charCode < 97) || (charCode > 122))
        return false;
    return true;
}

//QUIZ START
window.onload = function () { 
// needed to ensure the questions loaded

  var questionArea = document.getElementsByClassName('questions')[0], 
      answerArea   = document.getElementsByClassName('answers')[0],   
      checker      = document.getElementsByClassName('checker')[0],   
      current      = 0,
     
     // var stores data values
     // Get all elements that have a class of x
     // last digit gives right answer positon

      allQuestions = {
        'what does css stand for? ' : ['Cascading style sheets', 'classy style sheets', 'clear styling shapes', 0],
        
        'What type of language is HTML? ' : ['A programming language', 'A markup language' , 'A machine learning language', 1],
        
        'Which are these is NOT a python built in function? ' : ['len()', 'raw_input()', 'clear()', 2]
      };
      
  function loadQuestion(curr) {
  // This function loads all the question into the questionArea
  // It grabs the current question based on the 'current'-variable
  
    var question = Object.keys(allQuestions)[curr];
    
    questionArea.innerHTML = '';
    questionArea.innerHTML = question;    
  }
  
  function loadAnswers(curr) {
  // This function loads all the possible answers of the given question
  // It grabs the needed answer-array with the help of the current-variable

  

var answers = allQuestions[Object.keys(allQuestions)[curr]];
    //grabs keys of object and places in array 
    answerArea.innerHTML = '';
    //removes everything in question Area


    for (var i = 0; i < answers.length -1; i += 1) {
      var createDiv = document.createElement('div'),
          text = document.createTextNode(answers[i]);
      
      createDiv.appendChild(text);      
      createDiv.addEventListener("click", checkAnswer(i, answers));
      
      
      answerArea.appendChild(createDiv);
    }
  }
  
  function checkAnswer(i, arr) {
    // This is the function that will run, when clicked on one of the answers
    // Check if givenAnswer is same as the correct one
    // After this, check if it's the last question:
    // If it is: empty the answerArea and let them know it's done.
    
    return function () {
      var givenAnswer = i,
          correctAnswer = arr[arr.length-1];
      
      if (givenAnswer === correctAnswer) {
        addChecker(true);             
      } else {
        addChecker(false);                        
      }
      
      if (current < Object.keys(allQuestions).length -1) {
        current += 1;
        
        loadQuestion(current);
        loadAnswers(current);
      } else {
        questionArea.innerHTML = 'Done';
        answerArea.innerHTML = '';
      }
                              
    };
  }
  
  function addChecker(bool) {
  // This function adds a div element to the page
  // Used to see if it was correct or false
  
    var createDiv = document.createElement('div'),
        txt       = document.createTextNode(current + 1);
    
    createDiv.appendChild(txt);
    
    if (bool) {
      
      createDiv.className += 'correct';
      checker.appendChild(createDiv);
    } else {
      createDiv.className += 'false';
      checker.appendChild(createDiv);
    }
  }
  
  loadQuestion(current);
  loadAnswers(current);
  // Starts the quiz

};
//QUIZ END
