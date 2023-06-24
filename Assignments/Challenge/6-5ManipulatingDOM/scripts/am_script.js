"use strict";
// Author: Chris Lucas
// Date: 6.24.23

// Add style tag to body element
document.body.setAttribute("style","font-family:Arial, sans-serif");

// Replace contents of span tags with my info
var spanTags = document.getElementsByTagName("span");
var spanInfo = ["CvB", "Food is the Garbage Plate, Videogame is Bastion", "Rochester, NY"];
for(var i = 0; i < spanTags.length; i++)
{
    spanTags[i].innerHTML = spanInfo[i];
}

// Iterate through the li tags and add a class.
var listItems = document.getElementsByTagName("li");
for(var i = 0; i < listItems.length; i++)
{
    listItems[i].setAttribute("class", "listitem");
}

// Add style to listitem class
var listStyle = document.createElement("style");
document.head.appendChild(listStyle);
listStyle.innerHTML = ".listitem {color: red;}"

// Create a new element to insert a picture
var imgElm = document.createElement("img");
imgElm.setAttribute("src", "images/me1.jpg");
imgElm.setAttribute("id", "myPic");
var h1Tag = document.getElementsByTagName("h1");
h1Tag[0].after(imgElm);

// Set event listener for the myPic img tag
document.getElementById("myPic").addEventListener("click", changePic);


// Create picture cycling function
function changePic()
{
    var imageSuf = [1,2,3,4,5,6,7,8,9,10];
    var indexNum = Math.floor(Math.random() * imageSuf.length);
    var newPic = "images/me" + imageSuf[indexNum] + ".jpg";
    document.getElementById("myPic").setAttribute("src", newPic);
}

// For my own sanity, I added some styling and changed off of white BGs
var htmlElem = document.getElementsByTagName('html');
htmlElem[0].setAttribute("style",
    "background-color: #806D40; \
    background-image: url(images/bgText1.png)")

var bodyElem = document.getElementsByTagName('body');
bodyElem[0].setAttribute("style",
    "background-color: #9EBED1;    \
    width: 50%;    \
    min-height: 100vh;    \
    margin-top: 0px;  \
    margin-left: auto;  \
    margin-right: auto; \
    padding-left: 20px; \
    padding-right: 20px;"
)

h1Tag[0].setAttribute("style", "margin-top: 0px;")


// Add a link for the My Collection Page
var myCollLink = document.createElement("a");
myCollLink.innerHTML = "My Collection";
myCollLink.setAttribute("href", "mycollection.html");
myCollLink.setAttribute("alt", "My Collection Page");
var myCollDiv = document.createElement("div");
myCollDiv.appendChild(myCollLink);
document.body.appendChild(myCollDiv);