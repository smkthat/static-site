export default function calculateAverage(num1, num2, num3) {
  /**
   * A function to calculate the average of three numbers.
   *
   * @param {number} num1 - The first number.
   * @param {number} num2 - The second number.
   * @param {number} num3 - The third number.
   * @return {number} as a result.
   */

  try {
    return (Number(num1) + Number(num2) + Number(num3)) / 3;
  } catch (e) {
    console.log(e.message);
  }
}
