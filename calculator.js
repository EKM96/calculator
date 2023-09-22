// VARIABLES
let operand1;
let operand2;
let operator;
let expression;
let digitsCounter = 0;
let symbolCounter = 0;

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
});


// FUNCTIONS DECLARATIONS
function displayDigits(event) {
    if(digitsCounter < 12) {
        digitDisplayed = event.target.textContent;
        displayContainer.textContent += digitDisplayed;
        digitsCounter++;
    } else {
        return;
    }
}

function displayOperator(operatorButton) {
    let symbol = operatorButton.textContent;
    displayContainer.textContent += symbol;
    
    symbolCounter++; 
    digitsCounter = 0;
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
        displayContainer.textContent = result;
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