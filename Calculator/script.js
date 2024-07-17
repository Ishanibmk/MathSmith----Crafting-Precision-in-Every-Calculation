const display = document.getElementById('display');
const history = document.getElementById('history');
const buttons = document.querySelectorAll('.button');
let displayValue = '';
let historyList = [];

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonId = button.id;
    if (buttonId === 'clear') {
      displayValue = '';
      updateDisplay('0');
    } else if (buttonId === 'delete') {
      displayValue = displayValue.slice(0, -1);
      if (displayValue === '') {
        updateDisplay('0');
      } else {
        updateDisplay(displayValue);
      }
    } else if (buttonId === 'equals') {
      try {
        const formattedValue = displayValue.replace(/%/g, '/100');
        const result = eval(formattedValue);
        updateHistory(displayValue + ' = ' + result);
        displayValue = result.toString();
        updateDisplay(displayValue);
      } catch {
        displayValue = 'Error';
        updateDisplay(displayValue);
      }
    } else {
      if (displayValue === '0' && buttonId !== 'decimal') {
        displayValue = '';
      }
      if (buttonId === 'percent') {
        displayValue += '%';
      } else if (buttonId === 'divide') {
        displayValue += '/';
      } else if (buttonId === 'multiply') {
        displayValue += '*';
      } else if (buttonId === 'subtract') {
        displayValue += '-';
      } else if (buttonId === 'add') {
        displayValue += '+';
      } else if (buttonId === 'decimal') {
        displayValue += '.';
      } else {
        displayValue += buttonId;
      }
      updateDisplay(displayValue);
    }
  });
});

function updateDisplay(value) {
  display.textContent = value;
}

function updateHistory(entry) {
  historyList.push(entry);
  if (historyList.length > 5) {
    historyList.shift();
  }
  history.innerHTML = historyList.join('<br>');
}
