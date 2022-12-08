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
            <span>${tweet.user.handle}</span>
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
        console.log('load Tweets', tweets);
        renderTweets(tweets);
      });
  };
  
  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();
    const tweetLength = $(this).serialize().length - 5;
    console.log('tweet-form on submit',$(this).serialize());
    console.log('tweet length',tweetLength);
    const formData = $(this).serialize();
    const yieldSymbol = '<i class="fa-solid fa-triangle-exclamation"></i>';
    
    if (tweetLength === 0 || tweetLength === null) {
      $(".error").html(`${yieldSymbol} Too short. Message length can't be zero. ${yieldSymbol}`).addClass("error-style").slideDown();
      return;
    }

    if (tweetLength > 140) {
      $(".error").html(`${yieldSymbol} Too long. Message length can't be greater than 140. ${yieldSymbol}`).addClass("error-style").slideDown();
      return;
    }
    $.ajax('/tweets', {
      method: 'POST',
      data: formData
    })
      .then(function(response) {
        $(".error").slideUp();
        console.log(response);
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
      return;
    }
    $(".tweet-write").html('Write');
    $("#tweet-form").slideUp();
  });

});