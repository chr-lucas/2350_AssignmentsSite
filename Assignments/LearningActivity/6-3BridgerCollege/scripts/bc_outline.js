"use strict";

/*

   Author:  Chris Lucas
   Date:    6.23.23

   Filename: bc_outline.js


   Function List
   =============

   makeOutline()
      Generates the text of the table of contents
      as a nested list

   createList(source, TOCList, headings)
      Creates an outline based on the source document,
      list items are appended to TOCList,
      the items list are based on the element names
      specified in the headings array


*/

window.addEventListener("load", makeOutline);

// Generates the text of the table of contents as a nested list
function makeOutline()
{
   // Location of the document outline
   var outline = document.getElementById("outline");

   // Get source document
   var source = document.getElementById("doc");

   // Define created element variables
   var mainHeading = document.createElement("h1");
   var outlineList = document.createElement("ol");
   var headingText = document.createTextNode("Outline");

   // Establish node heirarchy
   mainHeading.appendChild(headingText);
   outline.appendChild(mainHeading);
   outline.appendChild(outlineList);

   // Call createList() with passed document
   createList(source, outlineList);

}

// Create an outline based on source document
function createList(source, outlineList)
{
   // Initialize needed heading evaluation variables
   var headings = ["H1", "H2", "H3", "H4", "H5", "H6",];
   var prevLevel = 0;
   var headNum = 0;

   // Loop through child nodes of source until none are left
   for(var n = source.firstChild; n !== null; n = n.nextSibling)
   {
      var headLevel = headings.indexOf(n.nodeName);
      if(headLevel !== -1) // Target node is a heading
      {
         headNum++; // Increment headNum
         // Check for exisiting id attribute, assign incremental id if empty.
         if(n.hasAttribute("id") === false)
         {
            n.setAttribute("id", "head" + headNum);
         }

         // Create li and a elements. Add source text to a element
         var listElement = document.createElement("li");
         var linkElement = document.createElement("a");
         linkElement.innerHTML = n.innerHTML;
         linkElement.setAttribute("href", "#" + n.id);

         // Append a element to li element as a child
         listElement.appendChild(linkElement);

         // Adjust append level for various headings
         if(headLevel === prevLevel) // Add to current list
         {
            outlineList.appendChild(listElement);
         }
         else if(headLevel > prevLevel) // Start new nested list level
         {
            var nestedList = document.createElement("ol");
            // Append current items to new list
            nestedList.appendChild(listElement);
            // Append new list to primary outline
            outlineList.lastChild.appendChild(nestedList);
            // Change current working list to newly made list
            outlineList = nestedList;
         }
         else // Add to the higher list
         {
            // Calculate difference between list levels
            var levelUp = prevLevel - headLevel;
            // Move to higher level based on difference
            for(var i = 1; i <= levelUp; i++)
            {
               outlineList = outlineList.parentNode.parentNode;
            }
            // Append list element
            outlineList.appendChild(listElement);
         }

         // Update the value of prevLevel
         prevLevel = headLevel;
      }
   }
}