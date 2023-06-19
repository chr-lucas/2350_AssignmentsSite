/*

   Author:     Chris Lucas
   Date:       6.18.23

*/

// Part 1

// Declare arrays
var familyNames = ["Misha Lucas", "Juli Warnes", "Pixel", "Whimsey", "Pillow",
                    "Fae",  "Whiskers"];
var familyRel = ["Wife", "Sister-in-Law", "Cat #1", "Cat #2", "Cat #3",
                    "Cat #4", "Avacado Tree"];

// Construct table
var partOneTable = "<table>";
partOneTable += "<tr><th>Name</th><th>Relationship</th></tr>";

// Iterate through arrays
for(var i = 0; i < familyNames.length; i++)
{
    var tempName = familyNames[i];
    var tempRel = familyRel[i];
    partOneTable += "<tr><td>" + tempName + "</td><td>" + tempRel + "</td></tr>";
}
partOneTable += "</table>";

// Inject HTML to div#family in arrays.html
document.getElementById("family").innerHTML = partOneTable;

// Part 2
// Declare empty array
var colorArray = [];

// Add color strings to array
colorArray.push("red", "green", "purple", "brown");
colorArray.unshift("yellow", "pink", "blue", "orange");

// Create ul using the array
var colorList = "<ul>";

for(color of colorArray)
{
    colorList += "<li>" + color + "</li>";
}
colorList += "</ul>";

// Inject ul to div#allColors in arrays.html
document.getElementById("allColors").innerHTML = colorList;

// Filter for colors that start with the letter p
var colorListP = "<ul>";

for(color in colorArray)
{
    if(colorArray[color][0] == "p")
    {
        colorListP += "<li>" + colorArray[color] + "</li>";
    }
}
colorListP += "</ul>";
document.getElementById("pColors").innerHTML = colorListP;

// Filter for colors that do NOT start with the letter b
var colorListB = "<ul>";

for(color in colorArray)
{
    if(colorArray[color][0] !== "b")
    {
        colorListB += "<li>" + colorArray[color] + "</li>";
    }
}
colorListB += "</ul>";
document.getElementById("nonBColors").innerHTML = colorListB;

// Filter for colors that contain the letter n
// Create filtered color list array
var colorNArray = colorArray.filter(checkForLetterN);

var colorListN = "<ul>";

for(color in colorNArray)
{
    colorListN += "<li>" + colorNArray[color] + "</li>";
}
colorListN += "</ul>";
document.getElementById("filterColors").innerHTML = colorListN;

// Return true if passed value contains letter n
function checkForLetterN(value, index, array)
{
        return value.search("n") > 0;
}

// Part 3

// Array one contains unsorted strings
var arrayOne = ["Hollow Knight", "X-Com", "Bastion", "Skyrim", "Dead Cells"];
// Array two contains unsorted integers
var arrayTwo = [7, -1, 212, 16, -9, 84, 17, 11];

// Display the arrays in original order
var arrayOrigP = "<p>" + arrayOne.toString() + "</p>";
arrayOrigP += "<p>" + arrayTwo.toString() + "</p>";
document.getElementById("twoArrays").innerHTML = arrayOrigP.split(",").join(", ");

// Sort the arrays alphabetically
var arraySortP = "<p>" + arrayOne.sort().toString() + "</p>";
arraySortP += "<p>" + arrayTwo.sort().toString() + "</p>";
document.getElementById("sortedArrays").innerHTML = arraySortP.split(",").join(", ");

// Sort arrayTwo by numeric value
var arrayNumP = "<p>" + arrayTwo.sort(function(a, b){return a - b}).toString() + "</p>";
document.getElementById("sortedNumberArray").innerHTML = arrayNumP.split(",").join(", ");

// Part 4
// Add last modify date to footer
var lastModified = document.lastModified;
var thisDate = new Date();
var footerDates = "<h4>Last Modified: " + lastModified + " (String)</h4>";
footerDates += "<h4>Current Date: " + thisDate + "(Date Object)</h4>";
document.getElementById("dates").innerHTML = footerDates;