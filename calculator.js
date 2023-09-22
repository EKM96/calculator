// VARIABLES
let operand1;
let operand2;
let operator;
let expression;
let digitsCounter = 0;
let symbolCounter = 0;

const digitsButtons = document.querySelectorAll('.js-button-digit');
const expressionContainer = document.querySelector('.js-expression-container');
const equalButton = document.querySelector('.js-equal-button');
const operatorsButtons = document.querySelectorAll('.js-operator-button');
//const regex = /^\d{1,12}[\+\-x\/]\d{1,12}$/;
const secondaryContainer = document.querySelector('.js-secondary-container');



// EVENTS
/*digitsButtons.forEach((digitButton) => {
    digitButton.addEventListener('click', displayDigits);
});*/
digitsButtons.forEach((digitButton) => {
    digitButton.addEventListener('click', (digitButton) => {
        const regex = /^\d{1,10}[\+\-x\/]$/;
        if(regex.test(expressionContainer.textContent)) {
            displayInSecondaryContainer();
            displayDigits(digitButton);
        } else {
            displayDigits(digitButton);
        }
    })
});

function displayInSecondaryContainer() {
    expression = expressionContainer.textContent;
    expressionContainer.textContent = '';
    secondaryContainer.textContent += expression;
}

/*operatorsButtons.forEach((operatorButton) => {
    operatorButton.addEventListener('click', () => {
        if(regex.test(expressionContainer.textContent)) {     
            getResult();
            displayOperator(operatorButton); 
        } else {
            displayOperator(operatorButton);
        }
    });
});
*/

operatorsButtons.forEach((operatorButton) => {
    operatorButton.addEventListener('click', () => {
        const regex = /^\d{1,10}[\+\-x\/]$/;
        if(regex.test(secondaryContainer.textContent)) {     
            //getResult();
            //displayOperator(operatorButton); 
            displayInSecondaryContainer();
        } else {
            displayOperator(operatorButton);
        }
    });
});



equalButton.addEventListener('click', () => {
    const regex = /^\d{1,12}[\+\-x\/]\d{1,12}$/;
    if(regex.test(expressionContainer.textContent)) {
        getResult();
    }
});


// FUNCTIONS DECLARATIONS
function displayDigits(event) {
    if(digitsCounter < 10) {
        digitDisplayed = event.target.textContent;
        expressionContainer.textContent += digitDisplayed;
        digitsCounter++;
    } else {
        return;
    }
}

function displayOperator(operatorButton) {
    let symbol = operatorButton.textContent;
    expressionContainer.textContent += symbol;
    
    symbolCounter++; 
    digitsCounter = 0;
    dotCounter = 0;
    let isClickedMoreThanOnce = symbolCounter > 1;

    if (isClickedMoreThanOnce) {
        let displayed = expressionContainer.textContent;
        let displayLength = expressionContainer.textContent.length;

        expressionContainer.textContent = displayed.substring(0, displayLength - 2);
        expressionContainer.textContent += symbol;
    }
}
/*
function getResult () { 
    getOperator();
    getOperands();
    removeDisplay();
    displayResult();
}

function getOperator() { 
    expression = expressionContainer.textContent;
    const operators = /[\+\-x\/]/;
    let operatorIndex = expression.search(operators);
    operator = expression.substring(operatorIndex, operatorIndex + 1);
}
 
function getOperands() {
    expression = expressionContainer.textContent;
    let operands = expression.split(/[\+\-x\/]/);
    operand1 = +operands[0];
    operand2 = +operands[1];
};

function removeDisplay() {
    expressionContainer.textContent = '';
};

function displayResult() {
        let result = calculate(operator, operand1, operand2);
        expressionContainer.textContent = result;
        symbolCounter = 0;
}
*/



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