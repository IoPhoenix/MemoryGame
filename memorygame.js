var catsImages = ["images/img1.jpeg","images/img1.jpeg","images/img2.jpeg","images/img2.jpeg","images/img3.jpeg","images/img3.jpeg","images/img4.jpeg","images/img4.jpeg","images/img5.jpeg","images/img5.jpeg","images/img6.jpeg","images/img6.jpeg","images/img7.jpeg","images/img7.jpeg","images/img8.jpeg","images/img8.jpeg"],
	tiles = document.getElementsByTagName("IMG"),
	score = document.getElementById("score"),
	reset = document.getElementById("reset"),
	timer = document.getElementById("timer"),
	totalScore = 0,
	tileBack = "file:///Users/olga/src/MemoryGame/images/pattern.png",
	flippedTiles = [],
	matchedPairs = 0;


// shuffle the order of cat imagges in an array before start of the game
shuffle(catsImages);

// add event listener to reset button
reset.addEventListener("click", resetGame);


// create a function to shuffle images in the array
function shuffle(array) {
    var counter = array.length,
    	temp,
    	index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}


// assign a cat image to each tile
// add a click event to each tile
for (var i = 0; i < tiles.length; i++) {

	tiles[i].setAttribute("data-facesrc", catsImages[i]);
    tiles[i].addEventListener('click', flipTile);
}


function flipTile(event) {
	
	// if flippedTiles length less than 2 and tile is closed, 
	// open tile and add it to the flippedTiles array
	if (flippedTiles.length < 2 && this.src === tileBack) {
	
		this.src = this.getAttribute("data-facesrc");
		flippedTiles.push(this);

		// increase score by one with each successful click
		totalScore++;
	}


	// do not increase score if clicked on the tile that is already opened
	if (this.src !== tileBack) {
		totalScore == totalScore;
	}


	if (flippedTiles.length === 2) {

		// close both opened tiles after delay if cat images are not the same
		setTimeout(function() {
			if (flippedTiles[0].src !== flippedTiles[1].src) {
				flippedTiles[0].src = tileBack;
				flippedTiles[1].src = tileBack;

				// clear flippedTiles array to fill it with next pair 
				flippedTiles = [];
			} else {

				// dim both images if they match
				flippedTiles[0].classList.add("matched");
				flippedTiles[1].classList.add("matched");
				flippedTiles = [];
				
				// increase the number of matched pairs by one
				matchedPairs++;
			}
		}, 500);
	}

	// show the changing score in the span tag
	score.innerHTML = totalScore;
}



// create a timer
window.onload = function() {
	var sec = 30,

		gameTime = setInterval(function() {
		   sec--;
		   timer.innerHTML = "0 : " + sec;

	   // abort the game if time has ran out
	   if (sec == 00) {

	   		// stop timer
	   		clearInterval(gameTime);

			alert("Your time has ran out! Your score is " + totalScore);

			// reload page to start a new game
	    	location.reload();
	    }

	   // alert win game message if all pairs are matched within 60 sec
	   if (sec !== 0 && matchedPairs === 8) {

	   		// stop timer
	   		clearInterval(gameTime);
			alert("Good job! Your score is " + totalScore);
		}
	}, 1000);
}


// reload page by clicking on a 'new game' button
function resetGame() {
	location.reload();	
}

