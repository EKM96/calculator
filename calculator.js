let operand1;
let operand2;
let operator;
/*const operators = {
    'add': add(operand1, operand2),
    'substract': substract(operand1, operand2),
    'multiply': multiply(operand1, operand2),
    'divide': multiply(operand1, operand2),
};*/

let digitsButtons = document.querySelectorAll('.js-button-digit');
let displayContainer = document.querySelector('.js-display');
let digitsCounter = 0;

digitsButtons.forEach((digitButton) => {
    digitButton.addEventListener('click', displayDigits);
   
});

function displayDigits(event) {
    if(digitsCounter < 12) {
        digitDisplayed = event.target.textContent;
        displayContainer.textContent += digitDisplayed;
        digitsCounter++;
    } else {
        return;
    }
}



const operatorsButtons = document.querySelectorAll('.js-operator-button');
let operatorCounter = 0;

operatorsButtons.forEach((operatorButton) => {
    operatorButton.addEventListener('click', (event) => {
        operator = event.target.name;
        displayOperator(operatorButton);
    });
});

function displayOperator(operatorButton) {
    let operator = operatorButton.textContent;
    displayContainer.textContent += operator;
    
    operatorCounter++; 
    digitsCounter = 0;
    let clickedMoreThanOnce = operatorCounter > 1;

    if (clickedMoreThanOnce) {
        let displayed = displayContainer.textContent;
        let displayLength = displayContainer.textContent.length;

        displayContainer.textContent = displayed.substring(0, displayLength - 2);
        displayContainer.textContent += operator;
    }
}


const equalButton = document.querySelector('.js-equal-button');

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
        let result = operate(operator);
        displayContainer.textContent = result;
}

const add = function (addend1, addend2) {
    return addend1 + addend2;
};

const substract = function (minuend, subtrahend) {
    return minuend - subtrahend;
};

const multiply = function(factor1, factor2) {
    return factor1 * factor2;
}

const divide = function(dividend, divisor) {
    return dividend / divisor;
}

function operate(operator) {
    switch (operator) {
        case 'add':
            return add(operand1, operand2);
        
        case 'substract': 
            return substract(operand1, operand2);

        case 'multiply': 
            return multiply(operand1, operand2);

        case 'divide':
            return divide(operand1, operand2);
    }
}