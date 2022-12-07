/* eslint-disable no-undef */
console.log('composer file loaded');
$(document).ready(function() {
  console.log('document ready started');
  
  $("textarea").on('input', function() {
    let textUsed = $(this).val().length;
    const textLimit = 140;
    let count = textLimit - textUsed;
    //if count is less than 0 red text else black text
    if (count < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', '#545149');
    }
   
    $(".counter").text(count);

  });
    
});