// Create the hidingSpoilersDiv
const hidingSpoilersDiv = document.createElement('div');
hidingSpoilersDiv.id = 'hiding-spoilers';
hidingSpoilersDiv.classList.add('spoiler-hider');
hidingSpoilersDiv.innerText = 'Making sure you don\'t see any spoilers...';
hidingSpoilersDiv.style.position = 'fixed';
hidingSpoilersDiv.style.top = '0';
hidingSpoilersDiv.style.left = '0';
hidingSpoilersDiv.style.width = '100%';
hidingSpoilersDiv.style.height = '100%';
hidingSpoilersDiv.style.backgroundColor = 'white';
hidingSpoilersDiv.style.color = 'black';
hidingSpoilersDiv.style.display = 'flex';
hidingSpoilersDiv.style.justifyContent = 'center';
hidingSpoilersDiv.style.alignItems = 'center';
hidingSpoilersDiv.style.fontSize = '2em';
hidingSpoilersDiv.style.zIndex = '9999';

// Check if the body element is available and append the div
chrome.storage.local.get(['spoilerHidden'], (result) => {
    if (result.spoilerHidden) {
        if (document.body) {
          document.body.prepend(hidingSpoilersDiv);
        } else {
          // If the body is not available, use a MutationObserver to wait for it
          const observer = new MutationObserver((mutations, observer) => {
            if (document.body) {
              document.body.prepend(hidingSpoilersDiv);
              observer.disconnect();
            }
          });
          observer.observe(document.documentElement, { childList: true });
        }
    }
});

// Define a function to hide spoilers (score/outcome)
function hideSpoilers() {
    // Match Page
    console.log("Hiding Spoilers");
    const scoreElements = document.querySelectorAll('.won, .lost');
    scoreElements.forEach((element) => {
        element.innerText = 'Hidden';
        element.style.color = 'black';
    });

    const teamScoreElements = document.querySelectorAll('.results-team-score, .team2-score, .results-center');
    teamScoreElements.forEach((element) => {
        element.innerText = '-';
    });

    const resultsRight = document.querySelectorAll('.results-right');
    resultsRight.forEach((element) => {
        element.classList.remove('won');
        element.classList.remove('lost');
    });

    const resultsLeft = document.querySelectorAll('.results-left');
    resultsLeft.forEach((element) => {
        element.classList.remove('won');
        element.classList.remove('lost');
    });


    // Results Page
    const matchStats = document.querySelectorAll('.matchstats');
    matchStats.forEach((element) => {
        element.style.display = 'none';
    });

    const resultScoreElements = document.querySelectorAll('.result-score');
    resultScoreElements.forEach((element) => {
        element.innerHTML = 'Hidden';
    });
    document.body.classList.remove('hidden');

    // Remove all team-won and team-lost classes
    const teamWon = document.querySelectorAll('.team-won');
    teamWon.forEach((element) => {
        element.classList.remove('team-won');
    });

    const teamLost = document.querySelectorAll('.team-lost');
    teamLost.forEach((element) => {
        element.classList.remove('team-lost');
    });

    // Remove livescore classes
    const livescore = document.querySelectorAll('.livescore');
    livescore.forEach((element) => {
        element.style.display = 'none';
    });

    document.getElementById('hiding-spoilers').style.display = 'none';
}

// Define a function to show spoilers (restore original content)
function showSpoilers() {
    // Reload the page to show original content
    location.reload();
}

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.spoilerHidden) {
    hideSpoilers(); // Hide spoilers
  } else {
    showSpoilers(); // Show spoilers (reload the page to restore original content)
  }
});



// On initial page load, check if spoilers should be hidden

addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['spoilerHidden'], (result) => {
        if (result.spoilerHidden) {
            hideSpoilers();
        }else{
            document.getElementById('hiding-spoilers').style.display = 'none';
        }
      });
});      