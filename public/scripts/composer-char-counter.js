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
    
  $(window).scroll(function() {
    console.log('scrollTop',$(window).scrollTop());
    const scrollTop = $(window).scrollTop();
    if (scrollTop > 400) {
      return $(".up-arrow").show();
    }
     
    $(".up-arrow").hide();
  
  });
  $(".up-arrow").on("click", function() {
    const hiddenValue = $('#tweet-form').is(":hidden");

    if (hiddenValue) {
      $("#tweet-form").slideDown();
    }

    $(window).scrollTop(0);
    $('textarea').focus();
     
    
  });
  
});