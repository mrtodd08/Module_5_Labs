document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("addButton");
  const resultElement = document.getElementById("result");

  // Handle click event for the 'Add' button
  addButton.addEventListener("click", function () {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);

    // Validate input values
    if (isNaN(num1) || isNaN(num2)) {
      resultElement.textContent = "Please enter valid numbers.";
      return;
    }

    // Call the server-side add route using axios
    axios
      .get(`/calculator/add?num1=${num1}&num2=${num2}`)
      .then((response) => {
        resultElement.textContent = response.data.result; // Display the result
      })
      .catch((error) => {
        resultElement.textContent = "Error: Unable to fetch result.";
        console.error(error);
      });
  });
});
