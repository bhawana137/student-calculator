
// Gets the calculator display elements from HTML
let display = document.getElementById("display");
let previousDisplay = document.getElementById("previous-display");

// Gets the history list from HTML
let historyList = document.getElementById("history-list");

// Variables used to store calculation values
let firstNumber = "";
let secondNumber = "";
let operator = "";

// Checks whether a new number should replace the display
let newNumber = false;


// Function to add numbers to the display
function addNumber(number) {

    // Starts a new number after selecting an operator
    if (newNumber) {
        display.value = "0";
        newNumber = false;
    }

    // Prevents entering more than one decimal point
    if (number === "." && display.value.includes(".")) {
        return;
    }

    // Replaces the initial zero with the entered number
    if (display.value === "0" && number !== ".") {
        display.value = number;
    } else {
        display.value = display.value + number;
    }
}


// Function to select a mathematical operator
function addOperator(selectedOperator) {

    // Stores the first number
    firstNumber = display.value;

    // Stores the selected operator
    operator = selectedOperator;

    // Shows the selected operation above the display
    previousDisplay.textContent = firstNumber + " " + selectedOperator;

    // Prepares the display for the second number
    newNumber = true;
}


// Function to perform calculations
function calculate() {

    // Checks whether an operator has been selected
    if (operator === "" || newNumber) {
        return;
    }

    // Stores the second number
    secondNumber = display.value;

    // Converts the stored values into numbers
    let num1 = parseFloat(firstNumber);
    let num2 = parseFloat(secondNumber);

    // Variable to store the result
    let result;

    // Performs calculation based on the selected operator
    switch (operator) {

        case "+":
            result = num1 + num2;
            break;

        case "-":
            result = num1 - num2;
            break;

        case "*":
            result = num1 * num2;
            break;

        case "/":

            // Prevents division by zero
            if (num2 === 0) {
                display.value = "Cannot divide by zero";
                previousDisplay.textContent = "";
                operator = "";
                newNumber = true;
                return;
            }

            result = num1 / num2;
            break;
    }

    // Converts the result into a shorter decimal number
    result = parseFloat(result.toPrecision(12));

    // Stores the calculation in the history
    let calculation = firstNumber + " " + operator + " " +
                      secondNumber + " = " + result;

    addHistory(calculation);

    // Displays the result
    display.value = result;

    // Shows the completed calculation above the result
    previousDisplay.textContent = firstNumber + " " +
                                  operator + " " + secondNumber;

    // Clears the operator after calculation
    operator = "";

    // Prepares the calculator for another calculation
    newNumber = true;
}


// Function to clear the calculator
function clearDisplay() {

    // Resets the display to zero
    display.value = "0";

    // Clears all stored values
    firstNumber = "";
    secondNumber = "";
    operator = "";

    // Clears the previous calculation
    previousDisplay.textContent = "";

    // Resets the display control
    newNumber = false;
}


// Function to delete the last entered digit
function deleteNumber() {

    // If a new number is expected, start with zero
    if (newNumber) {
        display.value = "0";
        newNumber = false;
        return;
    }

    // Removes the last character from the display
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = "0";
    }
}


// Function to calculate percentage
function percentage() {

    // Converts the displayed number into a percentage
    display.value = parseFloat(display.value) / 100;

    // Prepares the calculator for a new number
    newNumber = true;
}


// Function to change the sign of a number
function toggleSign() {

    // Converts the current display into a number
    let currentNumber = parseFloat(display.value);

    // Changes positive to negative or negative to positive
    display.value = currentNumber * -1;
}


// Function to add a calculation to the history
function addHistory(calculation) {

    // Removes the empty history message
    if (historyList.querySelector(".empty-history")) {
        historyList.innerHTML = "";
    }

    // Creates a new list item
    let historyItem = document.createElement("li");

    // Adds the calculation text
    historyItem.textContent = calculation;

    // Adds the new calculation at the top of the list
    historyList.prepend(historyItem);
}


// Function to clear calculation history
function clearHistory() {

    // Removes all previous calculations
    historyList.innerHTML = "";

    // Shows a message when history is empty
    let emptyMessage = document.createElement("li");

    emptyMessage.textContent = "No calculations yet.";
    emptyMessage.className = "empty-history";

    historyList.appendChild(emptyMessage);
}


// Function to handle keyboard input
function handleKeyboard(event) {

    // Gets the key pressed by the user
    let key = event.key;

    // Checks whether the user pressed a number or decimal point
    if ((key >= "0" && key <= "9") || key === ".") {
        addNumber(key);
    }

    // Checks whether the user pressed an operator
    else if (key === "+" || key === "-" ||
             key === "*" || key === "/") {
        addOperator(key);
    }

    // Calculates when Enter or = is pressed
    else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    }

    // Deletes the last digit using Backspace
    else if (key === "Backspace") {
        deleteNumber();
    }

    // Clears the calculator using Escape
    else if (key === "Escape") {
        clearDisplay();
    }

    // Calculates percentage
    else if (key === "%") {
        percentage();
    }
}


// Listens for keyboard key presses
document.addEventListener("keydown", handleKeyboard);
