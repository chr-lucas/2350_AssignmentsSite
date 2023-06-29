/*
    Author: Chris Lucas
    Date:   6.28.23

*/

window.addEventListener("load", function()
    {
        // Add event handling for various form changes
        // Pet weight/Kennel size
        document.getElementById("weight").onchange = sizeCalc;
        // Days of required boarding
        document.getElementById("days").onchange = bordingCalc;
        // Competition checkboxes
        document.getElementById("sing").onchange = checkCheckboxes;
        document.getElementById("cute").onchange = checkCheckboxes;
        document.getElementById("trick").onchange = checkCheckboxes;
    }
);

// Calculate animal size using pet weight
function sizeCalc()
{
    // Get weight value from weight field
    var petWeight = document.getElementById("weight").value;
    // Initialize a size variable
    var petSize;
    // Logic sequence to convert weight range to a size
    if(isNaN(parseInt(petWeight)))
    {
        petSize = "";
    }
    else if(petWeight <= 4)
    {
        petSize = "mini";
    }
    else if(petWeight <= 12)
    {
        petSize = "small";
    }
    else if(petWeight <= 50)
    {
        petSize = "medium";
    }
    else
    {
        petSize = "large";
    }

    // Set size field to calculated pet size
    document.getElementById("size").value = petSize;
}

// Calculate boarding costs using days of required boarding
function bordingCalc()
{
    // Get days needed from days field
    var daysBoard = parseInt(document.getElementById("days").value);
    // Format daysBoard
    if(isNaN(parseInt(daysBoard)))
    {
        daysBoard = 0;
        document.getElementById("boardingFee").value = Number(0.00);
    }
    else
    {
        var boardingFee = daysBoard * 19.99;
        boardingFee = boardingFee.toFixed(2);
        document.getElementById("boardingFee").value = boardingFee;
    }

    // Update total cost
    totalCalc();
}

// Calculate Total Cost for competition
function totalCalc()
{
    // Set initial values for fields that impact cost
    var regCost = 0;
    var numEvents = 0;
    var boardCost = document.getElementById("boardingFee").value;
    if(boardCost == "")
    {
        boardCost = 0;
        boardCost = boardCost.toFixed(2);
    }
    else
    {
        boardCost = Number(boardCost);
        boardCost = boardCost.toFixed(2);
    }

    // Find number of events
    var eventFields = document.querySelectorAll('input[type="checkbox"]');
    for(var i = 0; i < eventFields.length; i++)
    if(eventFields[i].checked)
    {
        numEvents++;
    }

    // Calculate registration costs using numEvents
    regCost = Number(120 * numEvents).toFixed(2);
    // Calculate total costs using boardingFee and regFee
    var totalCost = Number(boardCost) + Number(regCost);
    totalCost = totalCost.toFixed(2);

    // Display fees in related fields
    document.getElementById("boardingCost").value = boardCost;
    document.getElementById("registrationCost").value = regCost;
    document.getElementById("totalCost").value = totalCost;
}


// Set display settings for competition fields using checkbox status
function checkCheckboxes()
{
    // Initialize a variable with to hold associated div element
    var elemDisplay;

    // Get name attribute from checkbox
    var elemName = this.getAttribute("name");
    if(elemName == "sing")
    {
        elemDisplay = document.getElementById("singAdd");
    }
    else if(elemName == "cute")
    {
        elemDisplay = document.getElementById("cuteAdd");
    }
    else if(elemName == "trick")
    {
        elemDisplay = document.getElementById("trickAdd");
    }

    // Check the status of the checkbox and update display rule
    if(this.checked)
    {
        elemDisplay.style.display = "block";
    }
    else
    {
        elemDisplay.style.display = "none";
    }

    // Call totalCalc() to update totals
    totalCalc();
}
