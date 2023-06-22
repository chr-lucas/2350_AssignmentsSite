"use strict";

/*

   Author:  Chris Lucas
   Date:    6.21.23

   Global Variables
   ================

   puzzleCells DONE
      References the TD cells within the Hanjie table grid.

   cellBackground DONE
      Stores the current background color of the puzzle
      cells during the mouseover event.


   Function List
   =============

   init() DONE
      Run when the web page is loaded; displays puzzle 1
      and loads the event handlers for the web page buttons.

   setupPuzzle() DONE
      Sets up a new puzzle, adding the event handlers for
      every puzzle cell.

   swapPuzzle(e) DONE
      Swaps one puzzle for another based on the button being clicked
      by the user. Confirms the change before swapping in the
      new puzzle.

   setBackground(e) DONE
      Sets the background color of the puzzle cells during the mousedown
      event

   extendBackground(e) DONE
      Extends the background color of the original puzzle cell during
      the mouse enter event.

   endBackground() DONE
      Ends the action of extending the cell backgrounds in response to the
      mouseup event.

   drawPuzzle(hint, rating, puzzle) PROVIDED
      Returns a text string of the HTML code to
      display a hanjie Web table based on the contents of
      multi-dimensional array, puzzle.

*/

// Define global variables
var puzzleCells;
var cellBackground;

// Page load event
window.onload = init;

// Display puzzle 1 on page load and set up event handling
function init()
{
   // Insert the title of the first puzzle and display to h1#puzzleTitle
   document.getElementById("puzzleTitle").innerHTML = "Puzzle 1";

   // Insert HTML for the puzzle board to figure#puzzle
   document.getElementById("puzzle").innerHTML =
      drawPuzzle(puzzle1Hint, puzzle1Rating, puzzle1);

   // Add event handlers for the puzzle buttons
   var puzzleButtons = document.getElementsByClassName("puzzles");
   for(var i = 0; i < puzzleButtons.length; i++)
   {
      puzzleButtons[i].onclick = swapPuzzle;
   }

   setupPuzzle();
   // Add event listener for mouseup event
   document.addEventListener("mouseup", endBackground);

   // Add event listener for show solution button
   document.getElementById("solve").addEventListener("click",
      function()
      {
         // Remove inline background color styles
         for (var i = 0; i < puzzleCells.length; i++)
         {
            puzzleCells[i].style.backgroundColor = "";
         }
      }
   );
}


// Swap puzzle title and board on button click for button.puzzles
function swapPuzzle(e)
{
   if (confirm("All progress will be lost when switching puzzles. Continue?"))
      {
         var puzzleId = e.target.id;
         var puzzleTitle = e.target.value;
         document.getElementById("puzzleTitle").innerHTML = puzzleTitle;

         switch (puzzleId)
         {
            case "puzzle1":
               document.getElementById("puzzle").innerHTML =
                  drawPuzzle(puzzle1Hint, puzzle1Rating, puzzle1);
                  break;
            case "puzzle2":
               document.getElementById("puzzle").innerHTML =
                  drawPuzzle(puzzle2Hint, puzzle2Rating, puzzle2);
                  break;
            case "puzzle3":
               document.getElementById("puzzle").innerHTML =
                  drawPuzzle(puzzle3Hint, puzzle3Rating, puzzle3);
         }
         setupPuzzle();
      }
}


// Configure puzzle data cells
function setupPuzzle()
{
   puzzleCells = document.querySelectorAll("table#hanjieGrid td");

   // Set initial color for puzzle cells
   for(var i = 0; i < puzzleCells.length; i++)
   {
      puzzleCells[i].style.backgroundColor = "rgb(233, 207, 29)";


   // Set cell color in response to mousedown event
      puzzleCells[i].onmousedown = setBackground;

   // Use pencil image as default puzzle cursor
   puzzleCells[i].style.cursor = "url(images/jpf_pencil.png), pointer";
   }

   // Check for puzzle solution
   document.getElementById("hanjieGrid").addEventListener("mouseup",
      function()
      {
         var solved = true;
         for(var i = 0; i < puzzleCells.length; i++)
         {
            if((puzzleCells[i].className === "filled" &&
               puzzleCells[i].style.backgroundColor !== "rgb(101, 101, 101)")
            ||
               (puzzleCells[i].className === "empty" &&
               puzzleCells[i].style.backgroundColor === "rgb(101, 101, 101)"))
               {
                  solved = false;
                  break;
               }
         }
         if(solved) alert("Congratulations! You've solved the puzzle!");
      }
   );

   // Create object collection of the filled and empty cells
   var filled = document.querySelectorAll("table#hanjieGrid td.filled");
   var empty = document.querySelectorAll("table#hanjieGrid td.empty");

   // Event listener for the peek button
   document.getElementById("peek").addEventListener("click",
      function()
      {
         // Show incorrent white cells in pink
         for(var i = 0; i < filled.length; i++)
         {
            if(filled[i].style.backgroundColor === "rgb(255, 255, 255)")
            {
               filled[i].style.backgroundColor = "rgb(255, 211, 211)";
            }
         }

         // Show incorrent grey cells in red
         for(var i = 0; i < empty.length; i++)
         {
            if(empty[i].style.backgroundColor === "rgb(101, 101, 101)")
            {
               empty[i].style.backgroundColor = "rgb(255, 101, 101)";
            }
         }

         // Remove hints after short delay
         setTimeout(
            function()
            {
               // Change pink cells to white & red cells to gray
               for(var i = 0; i < puzzleCells.length; i++)
               {
                  if(puzzleCells[i].style.backgroundColor === "rgb(255, 211, 211)")
                  {
                     puzzleCells[i].style.backgroundColor = "rgb(255, 255, 255)";
                  }
                  if(puzzleCells[i].style.backgroundColor === "rgb(255, 101, 101)")
                  {
                     puzzleCells[i].style.backgroundColor = "rgb(101, 101, 101)";
                  }
               }
            }, 500);
      }
   );
}


// Set cell color on mousedown event
function setBackground(e)
{
   var cursorType;

   // Change background color based on keyboard inputs
   if(e.shiftKey)
   {
      cellBackground = "rgb(233, 207, 29)";
      cursorType = "url(images/jpf_eraser.png), cell";
   }
   else if(e.altKey)
   {
      cellBackground = "rgb(255, 255, 255)";
      cursorType = "url(images/jpf_cross.png), crosshair";
   }
   else
   {
      cellBackground = "rgb(101, 101, 101)";
      cursorType = "url(images/jpf_pencil.png), pointer"
   }

   e.target.style.backgroundColor = cellBackground;
   // Create an event listener for puzzle cells
   for (var i = 0; i < puzzleCells.length; i++)
   {
      puzzleCells[i].addEventListener("mouseenter", extendBackground);
      puzzleCells[i].style.cursor = cursorType;
   }

   // Prevent default mouse selection
   e.preventDefault();
}

// Change cell background color on mouseover while continuous mousedown
function extendBackground(e)
{
   e.target.style.backgroundColor = cellBackground;
}

// End mouseenter event listener for every puzzle cell
function endBackground(e)
{
   for(var i = 0; i < puzzleCells.length; i++)
   {
      puzzleCells[i].removeEventListener("mouseenter", extendBackground);
   }
}

/* ================================================================= */

function drawPuzzle(hint, rating, puzzle) {

   /* Initial HTML string for the Hanjie Puzzle */
   var htmlString = "";

   /* puzzle is a multidimensional array containing the
      Hanjie puzzle layout. Marked cells are indicated by
      the # character. Empty cells are indicated by an
      empty text string. First, determine the number of rows
      and columns in the puzzle */

   var totalRows = puzzle.length;
   var totalCols = puzzle[0].length;

   /* Loop through the rows to create the rowCount array
      containing the totals for each row in the puzzle */

   var rowCount = [];
   var spaceCount;
   for (var i = 0; i < totalRows; i++) {
      rowCount[i]="";
      spaceCount = 0;

      for (var j = 0; j < totalCols; j++) {
         if (puzzle[i][j] === "#") {
            spaceCount++;
            if (j === totalCols-1) {
               rowCount[i] += spaceCount + "&nbsp;&nbsp;";
            }
         } else {
            if (spaceCount > 0) {
               rowCount[i] += spaceCount + "&nbsp;&nbsp;";
               spaceCount = 0;
            }
         }
      }

   }

   /* Loop through the columns to create the colCount array
      containing the totals for each column in the puzzle */

   var colCount = [];
   for (var j = 0; j < totalCols; j++) {
      colCount[j]="";
      spaceCount = 0;

      for (var i = 0; i < totalRows; i++) {
         if (puzzle[i][j] === "#") {
            spaceCount++;
            if (i === totalRows-1) {
               colCount[j] += spaceCount + "<br />";
            }
         } else {
            if (spaceCount > 0) {
               colCount[j] += spaceCount + "<br />";
               spaceCount = 0;
            }
         }
      }

   }

   /* Create a Web table with the id, hanjieGrid, containing
      headers with the row and column totals.
      Each marked cell has the class name, marked; each
      empty cell has the class name, empty */

   htmlString = "<table id='hanjieGrid'>";
   htmlString += "<caption>" + hint + " (" + rating + ")</caption>";
   htmlString += "<tr><th></th>";

   for (var j = 0; j < totalCols; j++) {
      htmlString += "<th class='cols'>" + colCount[j] + "</th>";
   }
   htmlString += "</tr>";

   for (var i = 0; i < totalRows; i++) {
      htmlString += "<tr><th class='rows'>&nbsp;" + rowCount[i]+"</th>";

      for (var j = 0; j<totalCols; j++) {
         if (puzzle[i][j] === "#") {
            htmlString += "<td  class='filled'></td>";
         }
         else {
            htmlString += "<td class='empty'></td>";
         }
      }

      htmlString += "</tr>";
   }

   htmlString += "</table>";

   return htmlString;
}