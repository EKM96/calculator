// VARIABLES
let operand1;
let operand2;
let operator;
let expression;
let equalButtonIsClicked = false;
let digitsCounter = 0;
let symbolCounter = 0;

const clearButton = document.querySelector('.js-clear-button');
const digitsButtons = document.querySelectorAll('.js-button-digit');
const displayContainer = document.querySelector('.js-display');
const equalButton = document.querySelector('.js-equal-button');
const operatorsButtons = document.querySelectorAll('.js-operator-button');
const regex = /^\d{1,12}[\+\-x\/]\d{1,12}$/;


// EVENTS
digitsButtons.forEach((digitButton) => {
    digitButton.addEventListener('click', displayDigits);
});

operatorsButtons.forEach((operatorButton) => {
    operatorButton.addEventListener('click', () => {
        if(regex.test(displayContainer.textContent)) {     
            getResult();
            displayOperator(operatorButton); 
        } else {
            displayOperator(operatorButton);
        }
    });
});

equalButton.addEventListener('click', () => {
    if(regex.test(displayContainer.textContent)) {
        getResult();   
    }
    equalButtonIsClicked = true;
});

clearButton.addEventListener('click',  () => {
    removeDisplay();
    digitsCounter = 0;
    symbolCounter = 0;
    equalButtonIsClicked = false;
});


// FUNCTIONS DECLARATIONS
function displayDigits(event) {
    if (equalButtonIsClicked) {
        removeDisplay();
        digitsCounter = 0;
        symbolCounter = 0;
        equalButtonIsClicked = false;
        display();
    } else if(digitsCounter < 12) {
        display();
    } else {
        return;
    }

    function display() {
        digitDisplayed = event.target.textContent;
        displayContainer.textContent += digitDisplayed;
        digitsCounter++;
    }
}

function displayOperator(operatorButton) {
    let symbol = operatorButton.textContent;
    displayContainer.textContent += symbol;
    
    symbolCounter++; 
    digitsCounter = 0;
    equalButtonIsClicked = false;
    let isClickedMoreThanOnce = symbolCounter > 1;

    if (isClickedMoreThanOnce) {
        let displayed = displayContainer.textContent;
        let displayLength = displayContainer.textContent.length;

        displayContainer.textContent = displayed.substring(0, displayLength - 2);
        displayContainer.textContent += symbol;
    }
}

function getResult () { 
    getOperator();
    getOperands();
    removeDisplay();
    displayResult();
}

function getOperator() { 
    expression = displayContainer.textContent;
    const operators = /[\+\-x\/]/;
    let operatorIndex = expression.search(operators);
    operator = expression.substring(operatorIndex, operatorIndex + 1);
}
 
function getOperands() {
    expression = displayContainer.textContent;
    let operands = expression.split(/[\+\-x\/]/);
    operand1 = +operands[0];
    operand2 = +operands[1];
};

function removeDisplay() {
    displayContainer.textContent = '';
};

function displayResult() {
        let result = calculate(operator, operand1, operand2);
        displayContainer.textContent = roundResult(result);
        symbolCounter = 0;
}

function calculate(operator, operand1, operand2) {
    switch (operator) {
        case '+':
            return (operand1 + operand2);
        
        case '-': 
            return (operand1 - operand2);

        case 'x': 
            return (operand1 * operand2);

        case '/':
            return (operand1 / operand2);
    }
}

function roundResult(result) {
    const resultIsFloat = !Number.isInteger(result);
      
        if (resultIsFloat) {
            let float = result.toString();
            if (float.length > 12) {
                float = float.split('.');
                let positions = 12 - (float[0].length + 1);
                result = result.toFixed(positions);  
            }
        }
    return result;
}