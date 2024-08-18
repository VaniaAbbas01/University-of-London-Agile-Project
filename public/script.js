function formatText(command) {
    document.execCommand(command, false, null);
  }
  
  function openCalculator() {
    alert('Open Calculator');
    // Implement calculator logic here
  }
  
  function openEquationSolver() {
    alert('Open Equation Solver');
    // Implement equation solver logic here
  }
  
  function openGraphicalCalculator() {

      var elt = document.getElementById('calculator');
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

  

  
  