$(document).ready(function() {
    let currentOperand = '0';
    let previousOperand = '';
    let operator = null;

    function updateDisplay() {
        $('.current-operand').text(currentOperand);
        $('.previous-operand').text(previousOperand + (operator != null ? operator : ''));
    }

    function clearDisplay() {
        currentOperand = '0';
        previousOperand = '';
        operator = null;
        updateDisplay();
    }

    function deleteLast() {
        if (currentOperand.length > 1) {
            currentOperand = currentOperand.toString().slice(0, -1);
        } else {
            currentOperand = '0';
        }
        updateDisplay();
    }

    function appendNumber(number) {
        if (number === '.' && currentOperand.includes('.')) return;
        if (currentOperand === '0' && number !== '.') {
            currentOperand = number;
        } else {
            currentOperand = currentOperand.toString() + number.toString();
        }
        updateDisplay();
    }

    function chooseOperator(op) {
        if (currentOperand === '') return;
        if (previousOperand !== '') {
            compute();
        }
        operator = op;
        previousOperand = currentOperand;
        currentOperand = '';
        updateDisplay();
    }

    function formatResult(result) {
        if (Number.isInteger(result)) {
            return result.toString();
        } else {
            return parseFloat(result.toFixed(8)).toString();
        }
    }

    function compute() {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }

        currentOperand = formatResult(computation);
        operator = null;
        previousOperand = '';
        updateDisplay();
    }

    $('.numbers').on('click', function() {
        appendNumber($(this).text());
    });

    $('.operators').on('click', function() {
        const operatorText = $(this).text();
        if (operatorText === 'AC') {
            clearDisplay();
        } else if (operatorText === 'DEL') {
            deleteLast();
        } else if (operatorText === '=') {
            compute();
        } else {
            chooseOperator(operatorText);
        }
    });

    updateDisplay();
});
