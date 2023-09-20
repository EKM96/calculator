const add = function (addend1, addend2) {
    let sum = addend1 + addend2;
    return sum;
};

const substract = function (minuend, subtrahend) {
    let difference = minuend - subtrahend;
    return difference;
};

const multiply = function(factor1, factor2) {
    let product = factor1 * factor2;
    return product;
}

const divide = function(dividend, divisor) {
    let quotient = dividend / divisor;
    return quotient;
}

let operand1;
let operand2;
const operators = [
    'add',
    'substract',
    'multiply',
    'divide',
];

function operator(operand1, operand2, operator) {
    switch (operator) {
        case 'add':
            add(operand1, operand2);
            break;
        
        case 'substract': 
            substract(operand1, operand2);
            break;

        case 'multiply': 
            multiply(operand1, operand2);
            break;

        case 'divide':
            divide(operand1, operand2);
            break;
    }
}



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
    operatorButton.addEventListener('click', () => {
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




    
    



