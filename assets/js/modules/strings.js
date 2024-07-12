export default function concatStrings(word1, word2) {
  /**
   * A function to concatenate two input strings with specific formatting.
   *
   * @param {string} word1 - The first word to be concatenated.
   * @param {string} word2 - The second word to be concatenated.
   * @return {string} The concatenated string with special formatting.
   */

  try {
    return `Первое слово - «${word1}» , второе слово - «${word2}»`
  } catch (e) {
    console.log(e)
  }
}
