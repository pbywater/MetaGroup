//Allows only numbers
//charCode values can be found here: http://stevehardie.com/2009/09/character-code-list-char-code/ 
//Used charCode to limit input to only numbers 
// || means OR
// && means AND
function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

//Allows only letters
//Used charCode to limit input to only letters
function isAlphaKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if ((charCode > 32 && charCode <65) || (charCode > 90 && charCode < 97) || (charCode > 122))
        return false;
    return true;
}


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