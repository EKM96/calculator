// VARIABLES
let operand1;
let operand2;
let operator;
let expression;
let equalButtonIsClicked = false;
let digitsCounter = 0;
let symbolCounter = 0;
let pointButtonCounter = 0;

const clearButton = document.querySelector('.js-clear-button');
const decimalPointButton = document.querySelector('.js-decimal-point-button');
const digitsButtons = document.querySelectorAll('.js-button-digit');
const displayContainer = document.querySelector('.js-display');
const equalButton = document.querySelector('.js-equal-button');
const operatorsButtons = document.querySelectorAll('.js-operator-button');
const regex1 = /^\d{1,12}[\+\-x\/]\d{1,12}$/;
const regex = /[\+\-x\/]/;


// EVENTS
digitsButtons.forEach((digitButton) => {
    digitButton.addEventListener('click', displayDigits);
});

operatorsButtons.forEach((operatorButton) => {
    operatorButton.addEventListener('click', () => {
        let toCheck = displayContainer.textContent.toString();
        let includesSymbol = regex.test(toCheck);
        let indexOfSymbol = toCheck.search(/[\+\-x\/]/);
        let symbolNotAtStart = (indexOfSymbol !== 0);
        let symbolNotAtEnd = (indexOfSymbol !== toCheck.length - 1)
        
        if(includesSymbol && symbolNotAtStart && symbolNotAtEnd) {
            getResult();
            displayOperator(operatorButton); 
        } else {
            displayOperator(operatorButton);
        }
    });
});

equalButton.addEventListener('click', () => {
    if(regex1.test(displayContainer.textContent)) {
        getResult();   
    }
    equalButtonIsClicked = true;
});

clearButton.addEventListener('click',  () => {
    removeDisplay();
    digitsCounter = 0;
    symbolCounter = 0;
    pointButtonCounter = 0;
    equalButtonIsClicked = false;
});

decimalPointButton.addEventListener('click', (event) => {
    ++pointButtonCounter;
    if (pointButtonCounter < 2) {
        display(event);
    }
    ++pointButtonCounter;
});


// FUNCTIONS DECLARATIONS
function displayDigits(event) {
    if (equalButtonIsClicked) {
        removeDisplay();
        digitsCounter = 0;
        symbolCounter = 0;
        equalButtonIsClicked = false;
        display(event);
    } else if(digitsCounter < 12) {
        display(event);
    } else {
        return;
    }
}

function display(event) {
    digitDisplayed = event.target.textContent;
    displayContainer.textContent += digitDisplayed;
    digitsCounter++;
}

function displayOperator(operatorButton) {
    let symbol = operatorButton.textContent;
    displayContainer.textContent += symbol;
    
    symbolCounter++; 
    digitsCounter = 0;
    pointButtonCounter = 0;
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
            return (((operand1 * 10) + (operand2 * 10)) / 10);
        
        case '-': 
            return (((operand1 * 10) - (operand2 * 10)) / 10);

        case 'x': 
            return (((operand1 * 10) * (operand2 * 10)) / 100);

        case '/':
            return ((operand1 * 10) / (operand2 * 10));
    }
}

function roundResult(result) {
    const resultIsFloat = !Number.isInteger(result);
    let float = result.toString();

    if (resultIsFloat && (float.length > 12)) {  
        float = float.split('.');
        let positions = 12 - (float[0].length + 1);
        result = result.toFixed(positions);  
    } else {
        result = parseFloat(result);
    }
    
    return result;
}