let operand1;
let operand2;
let operator;

const digitsButtons = document.querySelectorAll('.js-button-digit');
const displayContainer = document.querySelector('.js-display');
const equalButton = document.querySelector('.js-equal-button');
const operatorsButtons = document.querySelectorAll('.js-operator-button');


digitsButtons.forEach((digitButton) => {
    digitButton.addEventListener('click', displayDigits);
   
});

let digitsCounter = 0;
function displayDigits(event) {
    if(digitsCounter < 12) {
        digitDisplayed = event.target.textContent;
        displayContainer.textContent += digitDisplayed;
        digitsCounter++;
    } else {
        return;
    }
}


operatorsButtons.forEach((operatorButton) => {
    operatorButton.addEventListener('click', getOperator);
    operatorButton.addEventListener('click', () => 
        displayOperator(operatorButton));
    
});
    
function getOperator(event) {
    return operator = event.target.name;
}

let symbolCounter = 0;
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


equalButton.addEventListener('click', validate);

function validate () {
    const regex = /^\d{1,12}[\+\-x\/]\d{1,12}$/;
    getOperands(displayContainer.textContent, regex);
    removeDisplay(displayContainer.textContent, regex);
    
}
 
function removeDisplay (displayContent, regex) {
    if (regex.test(displayContent)) {
        displayContainer.textContent = '';
        displayResult();
    };
}

function getOperands(displayContent, regex) {
    if (regex.test(displayContent)) {
        let expression = displayContent.slice();
        let operands = expression.split(/[\+\-x\/]/);
        operand1 = +operands[0];
        operand2 = +operands[1];
    };
}

function displayResult() {
        let result = operate(operator, operand1, operand2);
        displayContainer.textContent = result;
        symbolCounter = 0;
}

function operate(operator, operand1, operand2) {
    switch (operator) {
        case 'add':
            return (operand1 + operand2);
        
        case 'substract': 
            return (operand1 - operand2);

        case 'multiply': 
            return (operand1 * operand2);

        case 'divide':
            return (operand1 / operand2);
    }
}