// Function to format text using the execCommand method
function formatText(command) {
    document.execCommand(command, false, null);
}

//---------------------Scientific Calculator---------------------------------

// Function to open the scientific calculator
function openSciCalculator() {
    const calculatorDiv = document.getElementById("sci-calculator");
    if (calculatorDiv.style.display === "none" || calculatorDiv.style.display === "") {
        calculatorDiv.style.display = "block"; // Show the calculator
        if (!calculatorDiv.dataset.initialized) {
            const calculator = Desmos.ScientificCalculator(calculatorDiv); // Initialize the calculator
            calculatorDiv.dataset.initialized = true;
        }
    } else {
        calculatorDiv.style.display = "none"; // Hide the calculator
    }
}

//---------------------Equation Solver---------------------------------

// Function to open the equation solver
function openEquationSolver() {
    const equation = prompt("Enter your equation:"); // Prompt the user to enter an equation

    if (!equation) {
        alert("Please enter an equation."); // Alert if no equation is entered
        return;
    }

    console.log("Equation entered:", equation); // Log the equation

    // Send the equation to the server to solve it
    fetch("/wolfram/solve", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ equation: equation }), // Ensure equation is sent as JSON
    })
    .then(response => response.json()) // Convert the response to JSON
    .then(data => {
        if (data.error) {
            alert("Error solving equation: " + data.error); // Alert if there's an error
        } else {
            displayResults(data); // Display the results
        }
    })
    .catch(error => {
        console.error("Error:", error); // Log the error
        alert("Error solving equation."); // Alert if there's an error
    });
}

// Function to display the results from the equation solver
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

    // Scroll to the result div
    resultDiv.scrollIntoView({ behavior: "smooth" });
}

//---------------------Graphical Calculator---------------------------------

// Function to open the graphical calculator
function openGraphicalCalculator() {
    const elt = document.getElementById('graphical-calculator');
    if (elt.style.display === "none" || elt.style.display === "") {
        elt.style.display = "block"; // Show the calculator
        if (!elt.dataset.initialized) {
            const calculator = Desmos.GraphingCalculator(elt); // Initialize the calculator
            elt.dataset.initialized = true;
        }
    } else {
        elt.style.display = "none"; // Hide the calculator
    }
}