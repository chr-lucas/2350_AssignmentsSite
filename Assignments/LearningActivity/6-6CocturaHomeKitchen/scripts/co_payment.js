"use strict";

/*

   Payment Form Script

   Author: Chris Lucas
   Date:   6.26.23

   Filename: co_payment.js

   Function List
   =============

   runSubmit()
      Runs validation tests when the submit button is clicked

   validateCVC()
      Validates the credit card CVC number

   validateMonth()
      Validates that the user has selected the expiration month of the credit card

   validateYear()
      Validates that the user has selected the expiration year of the credit card

   validateNumber()
      Validates that the user has entered a valid and legitimate card number

   validateCredit()
      Validates that the user has selected a credit card type

   validateName()
      Validates that the user has specified the name on the credit card

   sumDigits(numStr)
      Sums the digits characters in a text string

   luhn(idNum)
      Returns true of idNum satisfies the Luhn Algorithm

*/

window.addEventListener("load",
   function()
   {
      // Set event handling for validation functions
      document.getElementById("subButton").onclick = runSubmit;
      document.getElementById("cardName").oninput = validateName;
      document.getElementById("cardNumber").oninput = validateNumber;
      document.getElementById("expMonth").onchange = validateMonth;
      document.getElementById("expYear").onchange = validateYear;
      document.getElementById("cvc").oninput = validateCVC;

      // Pull down the url string starting from index 1
      var formData = this.location.search.slice(1);
      formData = formData.replace(/\+/g, " "); // globally replace "+" with "_"
      formData = decodeURIComponent(formData); // decode URI characters
      var formFields = formData.split(/[&=]/g); // split formData on & or =

      // Write values from url string out to order form
      document.forms.order.elements.orderDate.value = formFields[1];
      document.forms.order.elements.modelName.value = formFields[5];
      document.forms.order.elements.qty.value = formFields[7];
      document.forms.order.elements.initialCost.value = formFields[9];
      document.forms.order.elements.protectionName.value = formFields[13];
      document.forms.order.elements.protectionCost.value = formFields[15];
      document.forms.order.elements.subtotal.value = formFields[17];
      document.forms.order.elements.salesTax.value = formFields[19];
      document.forms.order.elements.totalCost.value = formFields[21];
   });

// Runs validation tests when the submit button is clicked
function runSubmit ()
{
   validateName();
   validateCredit();
   validateNumber();
   validateMonth();
   validateYear();
   validateCVC();
}

// Validates the credit card CVC number, accounting for 2 valid formats
function validateCVC()
{
   var cardCVC = document.getElementById("cvc");
   var creditCard = document.querySelector('input[name="credit"]:checked').value;
   if(cardCVC.validity.valueMissing)
   {
      cardCVC.setCustomValidity("Enter the CVC number from the back of your card");
   }
   else if((creditCard === "amex") && ((/^\d{4}$/).test(cardCVC.value) === false))
   {
      cardCVC.setCustomValidity("Enter the 4 digit CVC number");
   }
   else if((creditCard !== "amex") && ((/^\d{3}$/).test(cardCVC.value) === false))
   {
      cardCVC.setCustomValidity("Enter the 3 digit CVC number");
   }
   else
   {
      cardCVC.setCustomValidity("");
   }
}

// Validates that the user has selected the expiration month of the credit card
function validateMonth()
{
   var cardMonth = document.getElementById("expMonth");
   if(cardMonth.selectedIndex === 0)
   {
      cardMonth.setCustomValidity("Select the expiration month");
   }
   else
   {
      cardMonth.setCustomValidity("");
   }
}

// Validates that the user has selected the expiration year of the credit card
function validateYear()
{
   var cardYear = document.getElementById("expYear");
   if(cardYear.selectedIndex === 0)
   {
      cardYear.setCustomValidity("Select the expiration year");
   }
   else
   {
      cardYear.setCustomValidity("");
   }
}

// Validates that the user has entered a valid and legitimate card number
function validateNumber()
{
   var cardNumber = document.getElementById("cardNumber");
   if(cardNumber.validity.valueMissing)
   {
      cardNumber.setCustomValidity("Enter card number");
   }
   else if(cardNumber.validity.patternMismatch)
   {
      cardNumber.setCustomValidity("Enter a valid card number");
   }
   else if(luhn(cardNumber.value) === false)
   {
      cardNumber.setCustomValidity("Enter a legitimate card number");
   }
   else
   {
      cardNumber.setCustomValidity("");
   }
}

// Validates that the user has selected a credit card type
function validateCredit()
{
   var creditCard = document.forms.payment.elements.credit[0];
   if(creditCard.validity.valueMissing)
   {
      creditCard.setCustomValidity("Select your Credit Card");
   }
   else
   {
      creditCard.setCustomValidity("");
   }
}

// Validates that the user has specified the name on the credit card
function validateName()
{
   var cardName = document.getElementById("cardName");
   if(cardName.validity.valueMissing)
   {
      cardName.setCustomValidity("Enter your name as it appears on the card");
   }
   else
   {
      cardName.setCustomValidity("");
   }
}

// Sums the digits characters in a text string
function sumDigits(numStr)
{
   var digitTotal = 0;
   for(var i = 0; i < numStr.length; i++)
   {
      digitTotal += parseInt(numStr.charAt(i));
   }

   return digitTotal;
}

// Returns true of idNum satisfies the Luhn Algorithm
function luhn(idNum)
{
   var string1 = "";
   var string2 = "";

   // Retreive odd numbered digits
   for(var i = idNum.length - 1; i >= 0; i -= 2)
   {
      string1 += idNum.charAt(i);
   }

   // Retreive even numbered digits and double values
   for(var i = idNum.length - 2; i >= 0; i -= 2)
   {
      string2 += 2 * idNum.charAt(i);
   }

   // Return evaluation of sum of the digits % 10 === 0
   return sumDigits(string1 + string2) % 10 === 0;
}
