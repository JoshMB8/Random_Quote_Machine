let quotesData;

function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

var colors = ['#00FFFF', '#A52A2A', '#5F9EA0', '#008B8B', '#006400', '#8B008B', '#00BFFF', '#000000', '#0000CD', '#6B8E23', '#FA8072', '#4682B4', '#FF6347', '#40E0D0'];

var currentQuote = '';
var currentAuthor = '';

function openURL(url) {
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1, location=0, statusbar=0, menubar=0, resizable=0');
}

function getQuotes() {
  return $.ajax({
    headers: {
      Accept: "application/json"
    },
    url: 'https://raw.githubusercontent.com/JoshMB8/Random_Quote_Machine/master/quotes.json',
    success: function(jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotesData = JSON.parse(jsonQuotes);
        console.log('quotesData');
        console.log(quotesData);
      }
    }
  });
}

function getRandomQuote() {
  return quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
}

function getQuote() {
  let randomQuote = getRandomQuote();
  
  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;
  
  if(inIframe())
    {
      $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet? hastags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
    }
  
  $(".quote-text").animate(
  {opacity: 0},
  500,
  function() {
    $(this).animate({ opacity: 1}, 500);
    $('#text').text(randomQuote.quote);
    }
  );
  
  $(".quote-author").animate(
    { opacity: 0 },
    500,
    function() {
      $(this).animate({ opacity: 1}, 500);
      $('#author').html(randomQuote.author);
    }
  );
  
  var color = Math.floor(Math.random() * colors.length);
  $("html body").animate(
    {
      backgroundColor: colors[color],
      color: colors[color]
    },
    1000
  );
  $(".button").animate(
    {
      backgroundColor: colors[color]
    },
    1000
  );
}

$(document).ready(function() {
  getQuotes().then(() => {
    getQuote();
  });
  
  $('#new-quote').on('click', getQuote);
  
  $('#tweet-quote').on('click', function() {
    if(!inIframe()) {
      openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
    }
  });
});
