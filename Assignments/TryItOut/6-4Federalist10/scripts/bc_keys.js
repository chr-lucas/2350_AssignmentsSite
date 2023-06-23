"use strict";

/*

   Author: Chris Lucas
   Date:   6.23.23

   Filename: bc_keys.js

   Functions
   =========

   findKeyWords()
      Locate the keywords in the article indicated by the <dfn> tag
      and add those keywords in alphabetical order to a keyword box.

   makeKeyStyles()
      Create an embedded style sheet for the keyword box.


   replaceWS(textStr)
      Replaces occurences of one or more consecutive white space
      characters with the "_" character.

*/

window.addEventListener("load", findKeyWords);
window.addEventListener("load", makeKeyStyles);

// Find keywords in article and create keyword box in an aside element
function findKeyWords()
{
   // Create the elements needed for the aside
   var asideContainer = document.createElement("aside");
   asideContainer.setAttribute("id", "keywords");
   var asideHeading = document.createElement("h1");
   asideHeading.innerHTML = "Keyword List";
   var asideList = document.createElement("ol");

   // Define element hierarchy
   asideContainer.appendChild(asideHeading);
   asideContainer.appendChild(asideList);

   // Find and copy keywords in the document
   // Gather obect collection and prepare array
   var keyWordElems = document.querySelectorAll("dfn");
   var keyWords = [];

   // Iterate through object collection
   for(var i = 0; i < keyWordElems.length; i++)
   {
      keyWords[i] = keyWordElems[i].firstChild.nodeValue;
      var linkID = replaceWS(keyWordElems[i].firstChild.nodeValue);
      keyWordElems[i].setAttribute("id", "keyword_" + linkID);
   }

   // Sort keyword array
   keyWords.sort();

   // Iterate through keywords array
   for(var i = 0; i < keyWords.length; i++)
   {
      var keyWordListItem = document.createElement("li");
      var keyWordLink = document.createElement("a");
      keyWordLink.innerHTML = keyWords[i];
      var linkID = replaceWS(keyWords[i]);
      keyWordLink.setAttribute("href", "#keyword_" + linkID);
      keyWordListItem.appendChild(keyWordLink);
      asideList.appendChild(keyWordListItem);
   }

   // Insert aside to main document
   document.getElementById("doc").insertBefore(asideContainer, document.getElementById("doc").firstChild);
}


// Create an embedded stylesheet for the above created aside element
function makeKeyStyles()
{
   // Create a style element for stylesheet and append to head
   var asideStyle = document.createElement("style");
   document.head.appendChild(asideStyle);

   // Add style rules to asideStyle embeded style tag
   asideStyle.innerHTML =
      "aside#keywords {                         \
         border: 3px solid rgb(101, 101, 101);  \
         float: right;                          \
         margin: 20px 0px 20px 20px;            \
         padding: 10px;                         \
         width: 320px;                          \
      }                                         \
      aside#keywords h1 {                       \
         font-size: 2em;                        \
         margin: 5px;                           \
         text-align: center;                    \
      }                                         \
      aside#keywords ol {                       \
         margin-left: 20px;                     \
         font-size: 1.2em;                      \
      }                                         \
      aside#keywords ol li {                    \
         line-height: 1.5em;                    \
      }                                         \
      aside#keywords ol li a {                  \
         color: rgb(101, 101, 101);             \
         text-decoration: none;                 \
      }";
}





/*Supplied Functions*/

function replaceWS(textStr) {
   var revText = textStr.replace(/\s+/g,"_");
   return revText;
}
