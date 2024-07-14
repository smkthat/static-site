import greet from "./modules/greet.js";
import celsiusToFahrenheit from "./modules/celsius.js";
import calculateFallDistance from "./modules/gravity.js";
import calculateAverage from "./modules/average.js";
import concatStrings from "./modules/strings.js";

import createOrUpdateResultCodeBlock from "./utils.js";


function showName(event) {
  /**
   * A function to handle displaying a greeting based on the input name element value and clearing the input field.
   *
   * @param {Event} event - The event object triggering the function.
   * @return {void} No explicit return value.
   */

  event.preventDefault();
  const nameElement = document.getElementById("myName");
  if (nameElement != null) {
    const result = greet(nameElement.value);
    createOrUpdateResultCodeBlock("greet", result)
    nameElement.value = "";
  }
}

function showConvertedTemperature(event) {
  /**
   * A function that handles the conversion of Celsius temperature to Fahrenheit
   * and displays the result in a code block.
   *
   * @param {Event} event - The event object triggering the function.
   * @return {void} This function does not return a value.
   */

  event.preventDefault();
  const celsiusElement = document.getElementById("celsiusNum");
  if (celsiusElement != null) {
    const result = celsiusToFahrenheit(celsiusElement.value);
    createOrUpdateResultCodeBlock("celsius", `${result} °F`)
    celsiusElement.value = null;
  }
}

function showCalculatedFall(event) {
  /**
   * Calculates and displays the fall distance based on the input fall time.
   *
   * @param {Object} event - The event object triggering the function
   * @return {void} Displays the calculated fall distance as an alert
   */

  event.preventDefault();
  const fallTimeSecElement = document.getElementById("fallTimeSec");
  if (fallTimeSecElement != null) {
    const result = calculateFallDistance(fallTimeSecElement.value);
    createOrUpdateResultCodeBlock("fall-time", `${result} м`)
    fallTimeSecElement.value = null;
  }
}

function showAverage(event) {
  /**
   * A function to calculate the average of three numbers,
   * display the result in a code block, and reset the input fields.
   *
   * @param {Event} event - The event object triggering the function.
   * @return {void} No explicit return value.
   */

  event.preventDefault();
  const num1Element = document.getElementById("num1");
  const num2Element = document.getElementById("num2");
  const num3Element = document.getElementById("num3");
  if (num1Element != null && num2Element != null && num3Element != null) {
    const num1 = num1Element.value;
    const num2 = num2Element.value;
    const num3 = num3Element.value;
    const result = calculateAverage(num1, num2, num3);
    createOrUpdateResultCodeBlock(
      "average",
      `Среднее значение чисел ${num1}, ${num2} и ${num3} равно ${result}`
    )
    num1Element.value = 0;
    num2Element.value = 0;
    num3Element.value = 0;
  }
}

function showConcatStrings(event) {
  /**
   * A function to handle the concatenation of two input strings,
   * display the result in a code block, and clear the input fields.
   *
   * @param {Event} event - The event object triggering the function.
   * @return {void} No explicit return value.
   */

  event.preventDefault();
  const word1Element = document.getElementById("word1");
  const word2Element = document.getElementById("word2");
  if (word1Element != null && word2Element != null) {
    const word1 = word1Element.value;
    const word2 = word2Element.value;
    const result = concatStrings(word1, word2);
    createOrUpdateResultCodeBlock("concat", result);
    word1Element.value = "";
    word2Element.value = "";
  }
}

window.showName = showName;
window.showConvertedTemperature = showConvertedTemperature;
window.showCalculatedFall = showCalculatedFall;
window.showAverage = showAverage;
window.showConcatStrings = showConcatStrings;
