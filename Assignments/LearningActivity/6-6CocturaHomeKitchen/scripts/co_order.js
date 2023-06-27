"use strict";

/*

   Order Form Script

   Author: Chris Lucas
   Date:   6.26.23

   Filename: co_order.js

   Function List
   =============

   calcOrder()
      Calculates the cost of the customer order

   formatNumber(val, decimals)
      Format a numeric value, val, using the local
      numeric format to the number of decimal
      places specified by decimals

   formatUSACurrency(val)
      Formats val as U.S.A. currency

*/

window.addEventListener("load", function()
   {
      // Assign variable for HTML order form
      var orderForm = document.forms.orderForm;
      // Set form date to current client date
      orderForm.elements.orderDate.value = new Date().toDateString();

      // Set initial focus to the model field
      orderForm.elements.model.focus();

      // Call calcOrder() to populate the rest of the fields
      calcOrder();

      // Add event handler for form change events
      orderForm.elements.model.onchange = calcOrder;
      orderForm.elements.qty.onchange = calcOrder;
      var pPlanOptions = orderForm.querySelectorAll('input[name="protection"]');
      for(var i = 0; i < pPlanOptions.length; i++)
      {
         pPlanOptions[i].onclick = calcOrder;
      }
   }
);

// Use the selected model and quantity to calculate the cost of the order
function calcOrder()
{
   // Calculate initial cost
   var mIndex = orderForm.elements.model.selectedIndex;
   var mCost = orderForm.elements.model.options[mIndex].value;
   var qIndex = orderForm.elements.qty.selectedIndex;
   var qunatity = orderForm.elements.qty.options[qIndex].value;

   // Initial product cost = model cost * qty
   var initialCost = Number(mCost * qunatity);
   orderForm.elements.initialCost.value = formatUSACurrency(Number(initialCost));

   // Check and add cost from Protection Plan selection
   var pPlanCost = Number(document.querySelector('input[name="protection"]:checked').value);
   orderForm.elements.protectionCost.value = formatNumber(pPlanCost, 2);

   // Calculate order subtotal
   orderForm.elements.subtotal.value = formatNumber(initialCost + pPlanCost, 2);

   // Calculate sales tax
   var salesTax = Number(0.05 * (initialCost + pPlanCost));
   orderForm.elements.salesTax.value = formatNumber(salesTax, 2);

   // Calculate total cost
   var totalCost = Number(initialCost + pPlanCost + salesTax);
   orderForm.elements.totalCost.value = formatUSACurrency(totalCost);

   // Populate hidden fields with selected purchase options
   orderForm.elements.modelName.value =
      orderForm.elements.model.options[mIndex].text;
   orderForm.elements.protectionName.value =
      document.querySelector('input[name="protection"]:checked')
      .nextSibling.nodeValue;

}

// Format val as number to decimals decimal places
function formatNumber(val, decimals)
{
   return val.toLocaleString(undefined,
      {
         minimumFractionDigits: decimals,
         maximumFractionDigits: decimals
      });
}

// Format val to US currency conventions
function formatUSACurrency(val)
{
   return val.toLocaleString('en-US',
   {
      style: "currency",
      currency: "USD"
   });
}

