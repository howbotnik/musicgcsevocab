var vocabList = [];
var currentIndex = 0;
var flipped = false;
var flipClicked = false;
var searchResultsShowing = false;

$(document).ready(function() {
  createVocabList();
  document.addEventListener("keypress", function(event) {
    if (event.keyCode == 39) {
      nextButtonClicked();
    } else if (event.keyCode == 37) {
      previousButtonClicked();
    }
  });

  $('#search-box').on('input', function(e) {
    searchData();
  });
});

function createVocabList() {
  for (var i = 0; i < vocabs.length; i++) {
    vocabList.push(vocabs[i]);
  }
  vocabList = shuffleArray(vocabList);
  setDisplay(vocabList[currentIndex]);
}

function nextButtonClicked() {
  $("#card").hide("drop", {
    percent: 10,
    direction: "down"
  }, 300, function() {});
  flipped = false;
  currentIndex++;
  if (currentIndex == vocabList.length) {
    currentIndex = 0;
  }
  setDisplay(vocabList[currentIndex]);
}

function previousButtonClicked() {
  $("#card").hide("drop", {
    percent: 10,
    direction: "down"
  }, 300, function() {});
  flipped = false;
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = 0;
  }
  setDisplay(vocabList[currentIndex]);
}

function setDisplay(vocab) {
  var card = document.getElementById('card');
  var animation = "";
  if (flipClicked == true) {
    animation = "fade";
    flipClicked = false;
  } else {
    animation = "drop";
    flipClicked = false;
  }

  if (flipped == false) {
    $("#card").show(animation, {
      percent: 10,
      direction: "up"
    }, 300, function() {});
    setTimeout(function() {
      console.log("Current Title: " + vocabList[currentIndex].title_vocab);
      card.innerHTML = vocabList[currentIndex].title_vocab;
      card.classList.remove('displayDescriptionText');
      card.classList.add('displayTitleText');
    }, 300);
  } else {
    $("#card").show(animation, {
      percent: 10,
      direction: "up"
    }, 300, function() {});
    setTimeout(function() {
      console.log("Current Description: " + vocabList[currentIndex].description_vocab);
      document.getElementById('card').innerHTML = vocabList[currentIndex].description_vocab;
      card.classList.remove('displayTitleText');
      card.classList.add('displayDescriptionText');
    }, 300);
  }
}

function flipButtonClicked() {
  flipClicked = true;
  $("#card").hide("highlight", {
    percent: 10
  }, 300, function() {});
  if (flipped == true) {
    flipped = false;
  } else {
    flipped = true;
  }
  setDisplay(vocabList[currentIndex]);
}

function shuffleArray(d) {
  for (var c = d.length - 1; c > 0; c--) {
    var b = Math.floor(Math.random() * (c + 1));
    var a = d[c];
    d[c] = d[b];
    d[b] = a;
  }
  return d
};

function searchData() {
  console.log("Entering 'searchdata'");
  clearSearchList();

  if (searchResultsShowing == false) {
    searchResultsShowing = true;
    $("#search-results").slideDown("fast", function() {});
  }

  for (var vocab in vocabList) {
    var searchInput = document.getElementById('searchInput');
    if (vocabList[vocab].title_vocab.toLowerCase().includes(searchInput.value.toLowerCase())) {
      console.log("match!");
      addToUl(vocabList[vocab]);
    }
  }
}

function clearSearchList(){
  var ul = document.getElementById("results-list");
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}

function addToUl(vocab) {
  var li = document.createElement('li');
  li.innerHTML = vocab.title_vocab;
  var posInArray;
  for(var i = 0; i < vocabList.length; i++){
    if(vocab.id_vocab == vocabList[i].id_vocab){
      posInArray = i;
    }
  }
  li.onclick = createCallback(posInArray);
  document.getElementById("results-list").appendChild(li);
}

function searchLostFocus(){
  if (searchResultsShowing == true) {
    searchResultsShowing = false;
    $("#search-results").slideUp("slow", function() {
      clearSearchList();
      document.getElementById('searchInput').value = "";
    });
  }
}

function createCallback(index){
  return function(){
    currentIndex = index;
    setDisplay(vocabList[currentIndex]);
  }
}
