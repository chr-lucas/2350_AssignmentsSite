"use strict";

/*

   Author:  Chris Lucas
   Date:    6.18.23


*/

// Set needed variables to calculate required date index
var thisDay = new Date("August 30, 2018");
var endDate = new Date(thisDay.getTime() + 14*24*60*60*1000);

// Open tag, caption, and header row for Events Table
var tableHTML = "<table id='eventTable'>";
tableHTML += "<caption>Upcoming Events</caption>";
tableHTML += "<tr><th>Date</th><th>Event</th><th>Price</th></tr>";

// Iterate through events and create HTML for target events
for(var i = 0; i < eventDates.length; i++)
{
   var eventDate = new Date(eventDates[i]);
   var eventDay = eventDate.toDateString();
   var eventTime = eventDate.toLocaleTimeString();
   if(thisDay <= eventDate && eventDate <= endDate)
   {
      tableHTML += "<tr><td>" + eventDay + " @ " + eventTime +"</td>";
      tableHTML += "<td>" + eventDescriptions[i] + "</td>";
      tableHTML += "<td>" + eventPrices[i] + "</td></tr>";
   }
}
tableHTML += "</table>";

// Insert HTML to lht_events.html div#eventList
document.getElementById("eventList").innerHTML = tableHTML;
