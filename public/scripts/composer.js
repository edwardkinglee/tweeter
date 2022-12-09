/* eslint-disable no-undef */
$(document).ready(function() {
  
  $("textarea").on('input', function() {
    let textUsed = $(this).val().length;
    const textLimit = 140;
    let count = textLimit - textUsed;
    //if count is less than 0 color-red, greater or equal remove color-red
    if (count < 0) {
      $('.counter').addClass("color-red");
    }
    
    if (count >= 0) {
      $('.counter').removeClass("color-red");
    }
   
    $(".counter").text(count);

  });
    
  $(window).scroll(function() {
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
      $(".tweet-write").html('Close');
      $('#tweet-text').focus();
    }

    $(window).scrollTop(0);
    $('#tweet-text').focus();

  });

});