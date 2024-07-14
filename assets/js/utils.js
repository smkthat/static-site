export default function createOrUpdateResultElement(targetId, result) {
  /**
   * Creates or updates a result element in the target element
   * based on the provided result.
   *
   * @param {string} targetId - The id of the target element
   *    where the result element will be created or updated.
   * @param {string} result - The result content to be displayed
   *    in the result element.
   * @return {void} No explicit return value.
   */

  const targetElement = document.querySelector(
    `#${targetId} .result`
  );
  let resultElement = targetElement.querySelector(
    ".result code.hljs"
  );

  if (!resultElement) {
    const preElement = document.createElement("pre");
    resultElement = document.createElement("code");
    resultElement.className = "hljs";
    preElement.appendChild(resultElement);
    targetElement.appendChild(preElement);
  }

  resultElement.textContent = result;
}
