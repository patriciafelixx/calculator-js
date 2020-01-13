const storage = [];
const limit = 8;
let operator = null;
let newNumber = false;
let block = true;

const display = document.querySelector('#display');
const audio = document.querySelector('audio');
const error = document.querySelector('.error');

function allClear() {
    block = false;
    audio.play();
    display.value = 0;
    storage[0] = 0;
    storage[1] = null;
    operator = null;
    error.style.visibility = 'hidden';
}

function turnOff() {
    block = true;
    display.value = '';
    error.style.visibility = 'hidden';
}

function insert(x) {
    if (block) return;
    if (display.value.length >= limit && !newNumber) return;
    audio.play();
    newNumber || (display.value == 0 && !display.value.includes('.')) ? display.value = x : display.value += x;
    newNumber = false;
}

function point() {
    if (block) return;
    if (display.value.length >= limit && !newNumber) return;
    audio.play();
    if (!display.value.includes('.') || newNumber) {
        if (display.value == '' || newNumber) {
            display.value = '0.';
        } else {
            display.value += '.';
        }
    }
    newNumber = false;
}

function operation(op) {
    if (block) return;
    audio.play();
    if (!operator) {
        storage[0] = Number(display.value);
    } else {
        storage[1] = Number(display.value);
        calculate();
    }   

    if (storage[0].toString().length > limit && !storage[0].toString().includes('.')) {
        block = true;
        error.style.visibility = 'visible';
    } else {
        operator = op;
    }
    display.value = Number(storage[0].toString().substring(0, limit));
    newNumber = true;
}

function calculate() {
    switch (operator) {
        case '+': storage[0] += storage[1];
            break;
        case '-': storage[0] -= storage[1];
            break;
        case '×': storage[0] *= storage[1];
            break;
        case '÷': storage[0] /= storage[1];
            break;
        case '=': storage[0] = storage[1];
    }
}