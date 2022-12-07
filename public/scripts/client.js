
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

  loadTweets();
  
  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();
    const tweetLength = $(this).serialize().length - 5;
    console.log('tweet-form on submit',$(this).serialize());
    console.log('tweet length',tweetLength);
    const formData = $(this).serialize();
    
    if (tweetLength === 0 || tweetLength === null) {
      return alert("Message length can't be zero");
    }

    if (tweetLength > 140) {
      return alert("Message length can't be greater than 140");
    }
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