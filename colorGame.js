var numOfSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var buttonReset = document.querySelector("#reset");
// var easyBtn = document.querySelector("#easy");
// var hardBtn = document.querySelector("#hard");

var modebuttons = document.querySelectorAll(".mode");

init();

function init(){
	setUpModeButtons();

	setUpSquares();
}

function setUpModeButtons(){
	for(var i = 0; i < modebuttons.length; i++){
	modebuttons[i].addEventListener("click", function(){
		modebuttons[0].classList.remove("selected");
		modebuttons[1].classList.remove("selected");
		this.classList.add("selected");
		//need to figure out how many squares to show
		if(this.textContent === "Easy"){
			numOfSquares = 3;
		} else {
			numOfSquares = 6;
		}
		reset();
		//a shorter way of doing this^ would be the terniary operator
//this.textContent === "Easy" ? numOfSquares = 3: numOfSquares = 6;
// it has the condition if    ^(until here)    ^(first execute)  ^(else execute)
});
} //HERE ENDS 1ST FOR()
}

function setUpSquares(){
	for(var i = 0; i < squares.length; i++) {
	// add initial colors to squares
	// squares[i].style.backgroundColor = colors[i]; - not needed anymore, since in big function

	//add click listeners to squares
	squares[i].addEventListener("click", function(){
		//grab color of picked square
		var clickedColor = this.style.backgroundColor;
		//compare color to pickedColor
		if (clickedColor === pickedColor){
			messageDisplay.textContent = "Correct!";
			buttonReset.textContent = "Play Again!";
			changeColors(clickedColor);
			h1.style.backgroundColor = clickedColor;
		} else {
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent = "Try Again!";	
		}
	});
}
	reset();
}


function reset(){
	//generate all new colors
	colors = generateRandomColors(numOfSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	//resetting the new colors button
	buttonReset.textContent = "New Colors"; // this. wont work here because we are not in the buttonReset function
	//to reset the correct msg
	messageDisplay.textContent = "";
	//need to change the colors of squares
	for(var i = 0; i < squares.length; i++){
		if(colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
		
	}
	h1.style.backgroundColor = "steelblue";
}

buttonReset.addEventListener("click", function(){
	reset();
});

// colorDisplay.textContent = pickedColor;
// ^ removing this line because of the init() function!



function changeColors(color){
	//loop through all squares
	for(var i = 0; i < squares.length; i++){
		squares[i].style.background = color;
	}
	//change each color to match picked color
}


function pickColor(){
	// pick a random number
	var random = Math.floor(Math.random() * colors.length);
	//use the number to access the color out of the array and return it
	return colors[random];
}


function generateRandomColors(num) {
	//make an array
	var arr = [];
	//add num random colors to array ; repeat num times
	for(var i = 0; i < num; i++) {
		//get random color and push into array
		arr.push(randomColor());
	}
	//return the array in the end
	return arr;
}

function randomColor(){
	//pick a "red" from 0-255 ; green ; blue
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}