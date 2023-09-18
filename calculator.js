let add = function (addend1, addend2) {
    let sum = addend1 + addend2;
    return sum;
};

let substract = function (minuend, subtrahend) {
    let difference = minuend - subtrahend;
    return difference;
};

let multiply = function(factor1, factor2) {
    let product = factor1 * factor2;
    return product;
}

let divide = function(dividend, divisor) {
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
let numberOfDigitsDisplayed = 0;

let getDisplay = function () {
    return (displayContainer.textContent);
}

function displayDigits(event) {
    if(numberOfDigitsDisplayed < 12) {
        digitDisplayed = event.target.textContent;
        displayContainer.textContent += digitDisplayed;
        numberOfDigitsDisplayed++;
    } else {
        return;
    }
}

digitsButtons.forEach((digitButton) => {
    digitButton.addEventListener('click', displayDigits);
    digitButton.addEventListener('click', getDisplay);
});








    
    



