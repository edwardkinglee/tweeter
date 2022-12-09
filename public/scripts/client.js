/* eslint-disable no-undef */
$(document).ready(function() {
  $(".error").hide();
  
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function(tweets) {
    $('#tweets-container').empty();

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };

  const createTweetElement = function(tweet) {
    let $tweet = $(`<article class="tweet">
        <div class="tweet-header">
          <div class="profile-pic">
            <div>
              <img src=${tweet.user.avatars}/>
            </div>
            <div class="profile-name">
              <label for="name"><strong>${tweet.user.name}</strong></label>
            </div> 
            </div>
              <span class="user-handle">${tweet.user.handle}</span>
            </div>
              <p class="tweet-text">${escape(tweet.content.text)}</p>
            <footer>
              <div class="days">
                <p>${timeago.format(tweet.created_at)}</p>
              </div>
              <div>
                <form method="POST" action="">
                  <i class="fa-solid fa-flag"></i>
                  <i class="fa-sharp fa-solid fa-retweet"></i>
                  <i class="fa-solid fa-heart"></i>
                </form>
              </div>
            </footer>
        </article>`);

    return $tweet;
  };
  
  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(tweets) {
        renderTweets(tweets);
      });
  };
  
  /*Checks if tweet length is not empty or greater than max, returns error message if true, returns false if okay*/
  const tweetLengthValidator = (tweetLength, maxLength) => {

    const yieldSymbol = '<i class="fa-solid fa-triangle-exclamation"></i>';
    
    if (tweetLength === 0 || tweetLength === null) {
      return `${yieldSymbol} Too short. Message length can't be zero. ${yieldSymbol}`;
    }

    if (tweetLength > maxLength) {
      return `${yieldSymbol} Too long. Message length can't be greater than 140. ${yieldSymbol}`;
    }

    return false;
  
  };

  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();
    const tweetLength = $(this).serialize().length - 5;
    const formData = $(this).serialize();
    const errorMessage = tweetLengthValidator(tweetLength, 140);
    
    if (errorMessage) {
      return $(".error").html(errorMessage).addClass("error-style").slideDown();
    }

    $.ajax('/tweets', {
      method: 'POST',
      data: formData
    })
      .then(function() {
        $(".error").slideUp();
        $("#tweet-text").val("");
        $(".counter").text(140);
        loadTweets();
      });

    return false;
  
  });

  $('.new-tweet').on('click', function() {
    const hiddenValue = $('#tweet-form').is(":hidden");
    if (hiddenValue) {
      $(".tweet-write").html('Close');
      $("#tweet-form").slideDown();
      $("#tweet-text").focus();
      return;
    }
    $(".tweet-write").html('Write');
    $("#tweet-form").slideUp();
    $(".error").slideUp();
  });

  loadTweets();
});