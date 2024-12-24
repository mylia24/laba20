let memoryValue = null;
let memoryOperator = null;
let displayValue = null;

const getDisplayValueString = () => displayValue.textContent.split(',').join('');

const countDIgits = (valueStr) => [...valueStr].filter(char => /\d/.test(char)).length;

const getDisplayValue = () => {
    return parseFloat(getDisplayValueString());
};

const setDisplayValue = (valueStr) => {
    const digitCount = countDIgits(valueStr);

    if (digitCount < 6) {
        displayValue.style.fontSize = '130px';
    } else if (digitCount === 6) {
        displayValue.style.fontSize = '120px';
    } else if (digitCount === 7) {
        displayValue.style.fontSize = '110px';
    } else if (digitCount === 8) {
        displayValue.style.fontSize = '100px';
    } else if (digitCount >= 9) {
        displayValue.style.fontSize = '90px';
    }

    if (valueStr[valueStr.length - 1] === '.') {
        displayValue.textContent += '.';
        return;
    }

    const [beforePoint, afterPoint] = valueStr.split('.');
    if (afterPoint) {
        displayValue.textContent = parseFloat(beforePoint).toString() + '.' + afterPoint;
    } else {
        displayValue.textContent = parseFloat(beforePoint).toString();
    }
};

const getOperationResult = () => {
    const currentValueNum = getDisplayValue();
    const valueNumInMemory = parseFloat(memoryValue);
    let newValueNum;
    if (memoryOperator === 'addition') {
        newValueNum = valueNumInMemory + currentValueNum;
    } else if (memoryOperator === 'subtraction') {
        newValueNum = valueNumInMemory - currentValueNum;
    } else if (memoryOperator === 'multiplication') {
        newValueNum = valueNumInMemory * currentValueNum;
    } else if (memoryOperator === 'division') {
        newValueNum = valueNumInMemory / currentValueNum;
    }

    return newValueNum.toString();
};

const operationHandler = (operation) => {
    const currentValueStr = getDisplayValueString();

    if (!memoryValue) {
        memoryValue = currentValueStr;
        memoryOperator = operation;
        setDisplayValue('0');
        return;
    }
    memoryValue = getOperationResult();
    memoryOperator = operation;
    setDisplayValue('0');
};


function setEventListener(element, className, text) {
    if (className.startsWith("function")) {
        let functionType = className.split(" ")[1]
        switch (functionType) {
            case "ac":
                element.addEventListener('click', () => {
                    setDisplayValue('0');
                    memoryValue = null;
                    memoryOperator = null;
                });
                break;
            case "pm":
                element.addEventListener('click', () => {
                    const currentValueNum = getDisplayValue();
                    const currentValueStr = getDisplayValueString();

                    if (currentValueStr === '-0') {
                        setDisplayValue('0');
                        return;
                    }
                    if (currentValueNum >= 0) {
                        setDisplayValue('-' + currentValueStr);
                    } else {
                        setDisplayValue(currentValueStr.substring(1));
                    }
                });
                break;
            case "percent":
                element.addEventListener('click', () => {
                    const currentValueNum = getDisplayValue();
                    const newValueNum = currentValueNum / 100;
                    setDisplayValue(newValueNum.toString());
                    memoryValue = null;
                    memoryOperator = null;
                });
                break;
            default:
                break;
        }
    } else if (className.startsWith("operator")) {
        let operatorType = className.split(" ")[1]
        if (operatorType == "equal") {
            element.addEventListener('click', () => {
                if (memoryValue) {
                    setDisplayValue(getOperationResult());
                    memoryValue = null;
                    memoryOperator = null;
                }
            });
        } else {
            element.addEventListener('click', () => {
                operationHandler(operatorType);
            });
        }


    } else if (className.startsWith("number")) {
        element.addEventListener('click', () => {
            ((numStr) => {
                const currentValueStr = getDisplayValueString();
                const currentValueCount = countDIgits(currentValueStr);

                if (currentValueCount >= 9) return;

                if (currentValueStr === '0') {
                    setDisplayValue(numStr);
                } else {
                    setDisplayValue(currentValueStr + numStr);
                }
            })(text);
        });
    } else if (className === 'decimal') {
        element.addEventListener('click', () => {
            const currentValueStr = getDisplayValueString();
            if (!currentValueStr.includes('.')) {
                setDisplayValue(currentValueStr + '.');
            }
        });
    }
}

function createCalculator() {
    const calculator = document.createElement('div');
    calculator.className = 'calculator';

    displayValue = document.createElement('div');
    displayValue.className = 'value';
    displayValue.textContent = '0';
    calculator.appendChild(displayValue);

    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons-container';
    calculator.appendChild(buttonsContainer);

    const buttons = [
        { className: 'function ac', text: 'AC' },
        { className: 'function pm', text: '±' },
        { className: 'function percent', text: '%' },
        { className: 'operator division', text: '÷' },
        { className: 'number-7', text: '7' },
        { className: 'number-8', text: '8' },
        { className: 'number-9', text: '9' },
        { className: 'operator multiplication', text: '×' },
        { className: 'number-4', text: '4' },
        { className: 'number-5', text: '5' },
        { className: 'number-6', text: '6' },
        { className: 'operator subtraction', text: '−' },
        { className: 'number-1', text: '1' },
        { className: 'number-2', text: '2' },
        { className: 'number-3', text: '3' },
        { className: 'operator addition', text: '+' },
        { className: 'number-zero', text: '0' },
        { className: 'decimal', text: '.' },
        { className: 'operator equal', text: '=' }
    ];

    buttons.forEach(button => {
        const buttonElement = document.createElement('div');
        buttonElement.className = `button ${button.className}`;
        buttonElement.textContent = button.text;
        buttonsContainer.appendChild(buttonElement);
        setEventListener(buttonElement, button.className, button.text)
    });

    document.body.appendChild(calculator);
}
function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        user-select: none;
      }

      body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-family: "Helvetica Neue", sans-serif;
      }

      .calculator {
        display: flex;
        flex-direction: column;
        align-self: center;
        background: black;
        color: white;
        padding: 40px;
        position: relative;
        width: 580px;
      }
      .value {
        font-size: 130px;
        font-weight: 100;
        height: 150px;
        margin-bottom: 20px;
        text-align: right;
        align-content: flex-end;
      }

      .buttons-container {
        display: grid;
        grid-gap: 20px;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(5, 1fr);
      }

      .button {
        align-items: center;
        background: #333;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        font-size: 45px;
        height: 110px;
        justify-content: center;
        transition: filter .3s;
        width: 110px;
      }

      .button.function {
        color: black;
        background: #a5a5a5;
      }

      .button.operator {
        background: #f1a33c;
      }

      .button.number-zero {
        border-radius: 55px;
        grid-column: 1 / span 2;
        justify-content: flex-start;
        padding-left: 43px;
        width: 250px;
      }

      .button:active,
      .button:focus {
        filter: brightness(150%);
      }
    `;
    document.head.appendChild(style);
}

addStyles();
createCalculator();