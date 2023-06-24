"use strict";
// Author: Chris Lucas
// Date: 6.24.23

window.addEventListener("load", createTable)
window.addEventListener("load", setTableStyles)
window.addEventListener("load", placeNavLink)

var games = [
    {title: 'PAYDAY 2',
     developer: 'OVERKILL',
     alreadyPlayed: true
    },
    {title: 'Marvel SNAP',
     developer: 'Second Dinner Studios',
     alreadyPlayed: true
    },
    {title: 'Modern Warfare II',
     developer: 'Infinity Ward',
     alreadyPlayed: true
    },
    {title: 'Cloudpunk',
     developer: 'Ion Lands',
     alreadyPlayed: false
    },
    {title: 'The Artful Escape',
     developer: 'Beethoven & Dinosaur',
     alreadyPlayed: true
    },
    {title: 'Disco Elysium',
     developer: 'ZA/UM',
     alreadyPlayed: false
    },
    {title: 'Against the Storm',
     developer: 'Eremite Games',
     alreadyPlayed: true
    },
    {title: 'Diablo IV',
     developer: 'Blizzard Entertainment',
     alreadyPlayed: true
    },
    {title: 'Brotato',
     developer: 'Blobfish',
     alreadyPlayed: true
    },
    {title: 'Death\'s Gambit',
     developer: 'White Rabbit',
     alreadyPlayed: false
    },
    {title: 'Spiritfarer',
     developer: 'Thunder Lotus Games',
     alreadyPlayed: false
    },
];

function createTable()
{
    // Create table and header rows
    var tableCode = "<table>"
    tableCode += "<tr><th>Title</th><th>Studio</th><th>Played?</th>"


    // Loop through games array to make table rows
    for(var i = 0; i < games.length; i++)
    {
        var currentRow = "<tr>";
        for(var tr in games[i])
        {
            // Create conditional to set true and false img tags within table
            // Set class for embedded image to statusImage
            if(games[i][tr] == true)
            {
                games[i][tr] = "<img src='images/true.jpg' class ='statusImage'>"
            }
            else if(games[i][tr] == false)
            {
                games[i][tr] = "<img src='images/false.jpg' class ='statusImage'>"
            }
            currentRow += "<td>" + games[i][tr] + "</td>";
        }
        currentRow += "</tr>";
        tableCode += currentRow;
    }

    // Insert table into HTML
    tableCode += "</table>";
    var tableDiv = document.createElement("div");
    tableDiv.innerHTML = tableCode;
    document.body.appendChild(tableDiv);

    // Call imagePrep() function to add event listeners to the image cells
    imagePrep();
}


// Style the table
function setTableStyles()
{
    var styleTag = document.createElement("style")
    styleTag.innerHTML =
        "h1 {    \
            margin-top: 0px;  \
        }   \
        table, th, td {    \
            border: #9bb3c4 solid 3px;  \
            border-collapse: collapse; \
        }   \
        table {    \
            background-color: #062338;  \
            border: black solid 5px;    \
            color: white;   \
            margin: 0px 10px 15px 10px;            \
            width: 650px;                          \
        }   \
        th {    \
            background-color: black;  \
            border: none;  \
            font-size: xx-large; \
            text-transform: uppercase; \
            padding: 5px; \
        }   \
        td {    \
            height: 40px; \
            font-size: x-large; \
            padding: 5px 5px 5px 12px; \
        }   \
        td:first-of-type, td:nth-of-type(2), td:nth-of-type(3) {    \
            border-top: none;   \
        }   \
        tr td:last-of-type {    \
            text-align: center;   \
        }   \
        ";

    document.head.appendChild(styleTag);
}

// Add event handlers to table images.
function imagePrep()
{
    var statusImages = document.getElementsByClassName("statusImage");
    for(var i = 0; i < statusImages.length; i++)
    {
        // Assign attribute for toggle behavior on image click event
        statusImages[i].setAttribute("onclick", "toggleImage(this)");
    }
}

// Toggle image behavior
function toggleImage(element)
{
    var status = element.getAttribute("src");
    if(status == 'images/true.jpg')
    {
        element.setAttribute("src", 'images/false.jpg');
    }
    else if(status == 'images/false.jpg')
    {
        element.setAttribute("src", 'images/true.jpg');
    }
}

// For my own sanity, I centered the webpage body and changed off of white BGs
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

// Add a link for the About Me Page after the table
function placeNavLink()
{
    var myPageLink = document.createElement("a");
    myPageLink.innerHTML = "About Me";
    myPageLink.setAttribute("href", "aboutme.html");
    myPageLink.setAttribute("alt", "About Me Page");
    var myPageDiv = document.createElement("div");
    myPageDiv.appendChild(myPageLink);
    document.body.appendChild(myPageDiv);
}