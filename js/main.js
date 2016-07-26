// FUNCTIONS TO BE RUN AFTER PAGE HAS LOADED
$(document).ready(function() {   

//TEXT CHARACTER COUNT

var text_max = 500;
$('#count_message').html(text_max + ' characters remaining');
$('#msg').keyup(function() {
    var text_length = $('#msg').val().length;
    var text_remaining = text_max - text_length;
    $('#count_message').html(text_remaining + ' characters remaining');
});

//END OF CHARACTER COUNT

// BACK TO TOP BUTTON

// browser window scroll (in pixels) after which the "back to top" link is shown
var offset = 100,
  //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
  offset_opacity = 2000, //1200px??
  //duration of the top scrolling animation (in ms)
  scroll_top_duration = 700,
  //grab the "back to top" link
  $back_to_top = $('.cd-top');

//hide or show the "back to top" link
$(window).scroll(function(){
  ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
  if( $(this).scrollTop() > offset_opacity ) { 
    $back_to_top.addClass('cd-fade-out');
  }
});

//smooth scroll to top
$back_to_top.on('click', function(event){
  event.preventDefault();
  $('body,html').animate({
    scrollTop: 0 ,
    }, scroll_top_duration
  );
});
// END OF BACK TO TOP BUTTON
        
});
// END OF FUNCTIONS TO BE RUN AFTER PAGE LOADS

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

        'What would this code do? <a href="http://www.facebook.com">facebook</a> ' : ['link to facebook', 'insert facebooks logo', 'close facebook', 0],
        
        'Which are these is NOT a python built in function? ' : ['len()', 'raw_input()', 'clear()', 2],

        'What gets printed? x = 4.5 y = 2 print x//y ' : ['2.0', '9.0', '20.25', 0],

        'What is the output of print list[0] if list = [ abcd, 786 , 2.23, john, 70.2 ]? ' : ['abcd', 'Error', '[ abcd, 786 , 2.23, john, 70.2 ]', 0],

        'Which is not a python loop?' : ['for loop', 'while loop', 'iter loop', 2]
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

// About page begin

// Highlights who Kat is

$('#kat-span').hover(function() {
  $('#kat-img img').toggleClass('active');
  $('#kat-span').toggleClass('active');
})

$('#kat-img').hover(function() {
  $('#kat-span').toggleClass('active');
  $('#kat-img img').toggleClass('active');
})

// Highlights who Aarti is

$('#aarti-span').hover(function() {
  $('#aarti-img img').toggleClass('active');
  $('#aarti-span').toggleClass('active');
})

$('#aarti-img').hover(function() {
  $('#aarti-span').toggleClass('active');
  $('#aarti-img img').toggleClass('active');
})

// Highlights who Philippa is

$('#philippa-span').hover(function() {
  $('#philippa-img img').toggleClass('active');
  $('#philippa-span').toggleClass('active');
})

$('#philippa-img').hover(function() {
  $('#philippa-span').toggleClass('active');
  $('#philippa-img img').toggleClass('active');
})

// Highlights who Disha is

$('#disha-span').hover(function() {
  $('#disha-img img').toggleClass('active');
  $('#disha-span').toggleClass('active');
})

$('#disha-img').hover(function() {
  $('#disha-span').toggleClass('active');
  $('#disha-img img').toggleClass('active');
})

// About page end
