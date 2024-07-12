const FREE_FALL = 9.8;

export default function calculateFallDistance(fallTimeSec) {
  /**
   * Calculate the fall distance based on the fall time in seconds.
   *
   * @param {number} fallTime - the time taken for the fall
   * @return {number} as a result.
   */

  try {
    return 0.5 * FREE_FALL * (Number(fallTimeSec) ^ 2)
  } catch (e) {
    console.log(e.message);
  }
}
