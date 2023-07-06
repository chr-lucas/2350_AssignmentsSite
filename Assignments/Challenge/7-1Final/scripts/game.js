"use strict";
/*
    Author: Chris Lucas
    Date:   7.3.23

*/

// Event listener for start button
var startButton = document.getElementById("startButton");
startButton.addEventListener("click", setOptions);

// Global variables for tracking tiles and score
var tilesFlipped = 0;
var attempts = 0;

// Function to setup the initial game board based on user options
function setOptions()
{
    // Get user option value and assign to variable numPairs
    var numPairs = document.getElementById("numSymbols").value;
    // Ensure numPairs does not exceed a value of 8
    if(numPairs > 8)
    {
        numPairs = 8;
    }
    // Hide initial starting form
    document.getElementById("startForm").style.display = "none";
    // Call game board construction with numPairs option
    setupGame(numPairs);
}

// Build initial game board
function setupGame(numPairs)
{
    // Set desired pairs and required tiles
    var pairs = numPairs;
    var tiles = numPairs * 2;

    // Create score board container element
    var scoreBoard = document.createElement("div");
    scoreBoard.setAttribute("id", "scoreBoard");
    scoreBoard.innerHTML = "Number of Attempts: " + attempts;

    // Create game board container element
    var gameBoard = document.createElement("div");
    gameBoard.setAttribute("id", "gameBoard");

    // Create tile elements
    for(var i = 0; i < tiles; i++)
    {
        // Create new elements using iterator for naming
        var tileName = "tile_" + i;
        var imgName = "img_" + i;
        var tileDiv = document.createElement("div");
        var tileImg = document.createElement("img");

        // Set needed class and id attributes
        tileDiv.setAttribute("id", tileName);
        tileDiv.setAttribute("class", "gameTile");
        tileImg.setAttribute("id", imgName);
        tileImg.setAttribute("class", "gameImg");

        // Add event listener to tile
        tileDiv.addEventListener("click", tileFlip);

        // Append new elements to DOM
        tileDiv.appendChild(tileImg);
        gameBoard.appendChild(tileDiv);
    }

    // Append game board as child to game display
    var display = document.getElementById("game");
    display.appendChild(scoreBoard);
    display.appendChild(gameBoard);

    setupImages(numPairs, tiles);
}

// Seed random images to tiles
function setupImages(numPairs, tiles)
{
    // Use pair numbers to create image array
    var imgArray = [];
    for(var i = 0; i < numPairs; i++)
    {
        var fileName = "images/img_" + i + ".png";
        imgArray.push(fileName);
        imgArray.push(fileName);
    }

    for(var i = 0; i < tiles; i++)
    {
        var imgName = "img_" + i;
        var tileImg = document.getElementById(imgName);
        var imgPos = Math.floor(Math.random()*imgArray.length);
        tileImg.setAttribute("src", imgArray[imgPos]);
        imgArray.splice(imgPos, 1);
    }
}

// Processing logic for card flip event
function tileFlip()
{
    // Increment counter variable, check for even numbers, increment score
    tilesFlipped++;
    if(tilesFlipped % 2 == 0)
    {
        attempts++;
        scoreBoard.innerHTML = "Number of Attempts: " + attempts;
    }
    // Set clicked tile to flipped class, call game functions
    this.setAttribute("class", "gameTileFlipped");
    checkMatch();
    checkWin();
}

// Check flipped tiles for matches, reset if needed
function checkMatch()
{
    var flippedTiles = document.getElementsByClassName("gameTileFlipped");
    if(flippedTiles.length >= 2)
    {
        var image1 = flippedTiles[0].getElementsByTagName("img")[0];
        var image2 = flippedTiles[1].getElementsByTagName("img")[0];
        // Checks for matching tile images, sets tile to matched class if true
        // Remove event listeners to prevent additional clicks
        if(image1.getAttribute("src") == image2.getAttribute("src"))
        {
            for(var i = 0; i < 2; i++)
            {
                flippedTiles[0].removeEventListener("click", tileFlip);
                flippedTiles[0].setAttribute("class", "gameTileMatched");
            }
        }
        // Resets non-matching tiles to standard game tiles
        else
        {
            setTimeout(function()
                {
                    flippedTiles[0].setAttribute("class", "gameTile");
                    flippedTiles[0].setAttribute("class", "gameTile");
                }, 1400);

        }
    }
}

// Check for all tiles to be in the Matched class, announce win.
function checkWin()
{
    var gameBoard = document.getElementById("gameBoard");
    var numTiles = gameBoard.getElementsByTagName("div");
    var notMatched = document.getElementsByClassName("gameTile");
    var matched = document.getElementsByClassName("gameTileMatched");
    if(notMatched.length === 0 && matched.length === numTiles.length)
    {
        setTimeout(function()
                {
                    document.getElementById("gameBoard").style.display = "none";
                    document.getElementById("scoreBoard").style.display = "none";
                }, 800);
        setTimeout(function()
        {
            var winMsg = document.createElement("div");
            winMsg.setAttribute("id", "winMsg");
            winMsg.innerHTML = "You Win!<br>All images matched in<br>" +
                attempts + " attempts!<br>";
            winMsg.innerHTML += "<button id='playAgain'>Play Again</button>"
            document.getElementById("game").appendChild(winMsg);
            var replayButton = document.getElementById("playAgain");
            replayButton.addEventListener("click", refreshPage);
        }, 1200);

    }

}

// Refresh page to play again
function refreshPage()
{
    window.location.reload();
}