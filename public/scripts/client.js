/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json
$(document).ready(function () {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    for (const tweet of tweets) {
      console.log('in renderTweets function');
      const $tweet = createTweetElement(tweet);
      console.log('tweet element', $tweet);
      $('#tweets-container').append($tweet);
    }
  };

  const createTweetElement = function (tweet) {
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

  renderTweets(data);

  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }


  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});