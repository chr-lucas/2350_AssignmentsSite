/*

   Planisphere Script
   Author: Chris Lucas
   Date:   6/13/23

*/

// Set time according to instructions, apply time to HTML "timestamp" div
var thisTime = new Date();
var timeStr = thisTime.toLocaleString();
document.getElementById("timeStamp").innerHTML = timeStr;

/*
   Set additional variable by extrapolating from thisTime.
   Hour and Month values calculate appropriate map image.
*/
var thisHour = thisTime.getHours();
var thisMonth = thisTime.getMonth();
var mapNum = (2 * thisMonth + thisHour) % 24;

// Set and insert correct map image based on datetime data
var imgStr = "<img src='images/sd_sky" + mapNum + ".png' />";
document.getElementById("planisphere").insertAdjacentHTML("afterbegin", imgStr);