export default function celsiusToFahrenheit(celsius) {
  /**
   * Convert Celsius temperature to Fahrenheit temperature.
   *
   * @param {number} celsius - The temperature in Celsius to convert.
   * @return {number} The equivalent temperature in Fahrenheit.
   */

  try {
    return Number(celsius) * 9 / 5 + 32;
  } catch (e) {
    console.log(e.message);
  }
}
