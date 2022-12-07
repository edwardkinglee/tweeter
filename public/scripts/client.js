
/* eslint-disable no-undef */
$(document).ready(function() {

  const renderTweets = function(tweets) {

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
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
            <p class="tweet-text">${tweet.content.text}</p>
          <footer>
            <div class="days">
              <p>${tweet.created_at}</p>
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
  
  loadTweets = () => {
    
    $.ajax('/tweets', { method: 'GET' })
      .then(function(tweets) {
        console.log('load Tweets', tweets);
        renderTweets(tweets);
      });
  };

  loadTweets();
  
  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();
    console.log($(this).serialize());
    const formData = $(this).serialize();
    $.ajax('/tweets', {
      method: 'POST',
      data: formData
    })
      .then(function(response) {
        console.log(response);
      });
    return false;
  });
});