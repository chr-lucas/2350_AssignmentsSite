"use strict";

/*

   Author: Chris Lucas
   Date:   6.23.23

   Filename: bc_switch.js

   setupStyles()
   Function to set up the style sheet switcher and insert
   from buttons to allow the user to switch between web
   view and page view

*/

window.addEventListener("load", setupStyles);

function setupStyles()
{
   // Create a link element for stylesheet
   var pageStyle = document.createElement("link");
   pageStyle.setAttribute("href", "styles/bc_page.css");
   pageStyle.setAttribute("rel", "stylesheet");
   pageStyle.setAttribute("disabled", "disabled");

   // Append newly made link element to document head
   document.head.appendChild(pageStyle);
   pageStyle.disabled = true;

   // Insert style toggle buttons
   var buttonDiv = document.createElement("div");
   buttonDiv.setAttribute("id", "styleButtons");

   var webButton = document.createElement("input");
   webButton.setAttribute("type", "button");
   webButton.setAttribute("value", "Web View");

   var pageButton = document.createElement("input");
   pageButton.setAttribute("type", "button");
   pageButton.setAttribute("value", "Page View");

   // Append buttons to div, and div to body
   buttonDiv.appendChild(webButton);
   buttonDiv.appendChild(pageButton);
   document.body.insertBefore(buttonDiv, document.body.firstChild);

   // Append embedded style in head
   var buttonStyles = document.createElement("style");
   document.head.appendChild(buttonStyles);

   // Add style rules to buttonStyles
   document.styleSheets[document.styleSheets.length - 1].insertRule
   (
      "div#styleButtons    \
      {                    \
         position: fixed;  \
      }"
   , 0);

   document.styleSheets[document.styleSheets.length - 1].insertRule
   (
      "div#styleButtons input                                  \
      {                                                        \
         background-color: rgba(68, 94, 186, 0.6);             \
         border:           3px solid rgba(0, 24, 123, 0.6);    \
         border-radius:    50%;                                \
         cusror:           pointer;                            \
         display:          inline-block;                       \
         font-size:        1.2em;                              \
         height:           60px;                               \
         margin:           5px 10px;                           \
         width:            100px;                              \
      }"
   , 1);

      document.styleSheets[document.styleSheets.length - 1].insertRule
      (
         "div#styleButtons input                                  \
         {                                                        \
            background-color: rgba(68, 94, 186, 0.6);             \
            border:           3px solid rgba(0, 24, 123, 0.6);    \
            border-radius:    50%;                                \
            cusror:           pointer;                            \
            display:          inline-block;                       \
            font-size:        1.2em;                              \
            height:           60px;                               \
            margin:           5px 10px;                           \
            width:            100px;                              \
         }"
      , 1);

   document.styleSheets[document.styleSheets.length - 1].insertRule
   (
      "@media print           \
      {                       \
         div#styleButtons     \
         {                    \
            display: none;    \
         }                    \
      }"
   , 2);


   // Toggle page view on button click
   webButton.onclick = function()
   {
      pageStyle.disabled = true;
   }

   pageButton.onclick = function()
   {
      pageStyle.disabled = false;
   }
}
