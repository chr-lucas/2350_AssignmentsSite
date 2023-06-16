"use strict";

/*

   Author:     Chris Lucas
   Date:       6.15.23

   Filename:   lht_calendar.js

   Function List:
   createCalendar(calDate)
      Creates the calendar table for the month specified in the
      calDate parameter. The current date is highlighted in
      the table.

   calCaption(calDate)
      Writes the caption of the calendar table

   calWeekdayRow()
      Writes the title weekday rows in the calendar table

   daysInMonth(calDate)
      Returns the number of days in the month from calDate

   calDays(calDate)
      Writes the daily rows in the calendar table, highlighting calDate

*/

// Create current date
var thisDay = new Date();

// Add table to div with id=calendar
document.getElementById("calendar").innerHTML = createCalendar(thisDay);

// Function that generates a calendar table
function createCalendar(calDate)
{
   var calendarHTML = "<table id='calendar_table'>";
   calendarHTML += calCaption(thisDay);
   calendarHTML += calWeekdayRow();
   calendarHTML += calDays(thisDay);
   calendarHTML += "</table>";
   return calendarHTML;
}

// Set table caption
function calCaption(calDate)
{
   var monthName = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

      // Get current Month and Year from parameter Date
      var thisMonth = calDate.getMonth();
      var thisYear = calDate.getFullYear();

      return "<caption>" + monthName[thisMonth] + " " + thisYear +"</caption>";
}

// Generate Weekday header row
function calWeekdayRow()
{
   // Array of weekdays for weekday label row
   var dayName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
   var rowHTML = "<tr>";
   // Loop through dayName to create table header rows
   for(var i = 0; i < dayName.length; i++)
   {
      rowHTML += "<th class='calendar_weekdays'>" + dayName[i] + "</th>";
   }
   // Close table row
   rowHTML += "</tr>";

   return rowHTML;
}

// Calculate and return days-in-month based on Date parameter
function daysInMonth(calDate)
{
   // Array of days in each month
   var dayCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
   // Get month and year from date object
   var thisMonth = calDate.getMonth();
   var thisYear = calDate.getFullYear();

   // Logic to handle Feb during leap year
   if(thisYear % 4 === 0)
   {
      if(thisDay % 100 != 0 || thisDay % 400 === 0)
      {
         dayCount[1] = 29;
      }
   }


   return dayCount[thisMonth];
}

// Write rows based on days of month to create calendar
function calDays(calDate)
{
   // Find day of week for 1st of current month
   var day = new Date(calDate.getFullYear(), calDate.getMonth(), 1);
   var weekday = day.getDay();

   // Fill in blank days at start of calendar
   var htmlCode = "<tr>";
   for(var i = 0; i < weekday; i++)
   {
      htmlCode += "<td></td>";
   }

   // Add calendar days for each day in the current month
   var totalDays = daysInMonth(calDate);
   var highlightDay = calDate.getDate();

   for(var i = 1; i <= totalDays; i++)
   {
      // Iterate date to find day of week
      day.setDate(i);
      weekday = day.getDay();

      // Open new tr if day of week is Sunday
      if(weekday === 0) htmlCode += "<tr>";

      // Iterate days of the month to write full calendar table cells
      // Check for current date and add highlight styling
      var id = 'calendar_today';
      if(i === highlightDay)
      {
         htmlCode +=
         "<td class='calendar_dates' id='calendar_today'>" +
         i +
         dayEvent[i] +
         "</td>";
      }
      else // Normal styling for none active dates
      {
         htmlCode +=
         "<td class='calendar_dates'>" +
         i +
         dayEvent[i] +
         "</td>";
      }

      // Close tr if day of week is Saturday
      if(weekday === 6) htmlCode += "</tr>";
   }

   return htmlCode;
}