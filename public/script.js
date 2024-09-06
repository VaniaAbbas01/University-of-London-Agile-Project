function formatText(command) {
    document.execCommand(command, false, null);
  }
  
  function openSciCalculator() {
   
    const calculatorDiv = document.getElementById("sci-calculator");
    calculatorDiv.style.display = "block"; // Make the calculator div visible

    const calculator = Desmos.ScientificCalculator(calculatorDiv);
}

function openEquationSolver() {
  const equation = prompt("Enter your equation:");

  if (!equation) {
      alert("Please enter an equation.");
      return;
  }

  console.log("Equation entered:", equation); // Log the equation

  fetch("/wolfram/solve", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ equation: equation }), // Ensure equation is sent as JSON
  })
  .then(response => response.json())
  .then(data => {
      if (data.error) {
          alert("Error solving equation: " + data.error);
      } else {
          displayResults(data);
      }
  })
  .catch(error => {
      console.error("Error:", error);
      alert("Error solving equation.");
  });
}

function displayResults(results) {
  // Create a new div element to hold the results
  const resultDiv = document.createElement("div");
  // Add a class named "result" to the div
  resultDiv.classList.add("result");

  // Loop through each pod in the results
  results.pods.forEach(pod => {
      // Create a new div element for each pod
      const podDiv = document.createElement("div");
      // Add a class named "pod" to the div
      podDiv.classList.add("pod");

      // Create an h3 element for the pod title
      const podTitle = document.createElement("h3");
      // Set the text content of the h3 element to the pod's title
      podTitle.textContent = pod.title;
      // Append the h3 element to the pod div
      podDiv.appendChild(podTitle);

      // Loop through each subpod in the pod
      pod.subpods.forEach(subpod => {
          // Create a new div element for each subpod
          const subpodDiv = document.createElement("div");
          // Create an img element for the subpod image
          const img = document.createElement("img");
          // Set the src attribute of the img element to the subpod's image source
          img.src = subpod.img.src;
          // Append the img element to the subpod div
          subpodDiv.appendChild(img);
          // Append the subpod div to the pod div
          podDiv.appendChild(subpodDiv);
      });

      // Append the pod div to the result div
      resultDiv.appendChild(podDiv);
  });

  // Append the result div to the body of the document
  document.body.appendChild(resultDiv);
}

function openGraphicalCalculator() {

    var elt = document.getElementById('graphical-calculator');
    var calculator = Desmos.GraphingCalculator(elt);

}

//   // script.js
// document.getElementById("graphical-calculator").addEventListener("click", function() {


//   // Create a new div element
//   var newDiv = document.createElement("div");

//   // Add a class to the new div for styling
//   newDiv.id = "calculator";

//   var elt = document.getElementById('calculator');
//   var calculator = Desmos.GraphingCalculator(elt);

//   // Append the new div to the container
//   document.getElementById("container").appendChild(newDiv);
// });