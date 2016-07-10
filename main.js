$(document).ready(function() {

//Allows only numbers
function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}
   
//Text character countdown

var text_max = 1000;
$('#count_message').html(text_max + ' remaining');
$('#text').keyup(function() {
	var text_length = $('#text').val().length;
	var text_remaining = text_max - text_length;
	$('#count_message').html(text_remaining + ' remaining');
});
        
});