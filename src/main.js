//import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

// функция для сложения двух комплексных чисел
function addComplexNumbers(complexNumber1, complexNumber2) {
    var realPart = complexNumber1.real + complexNumber2.real;
    var imaginaryPart = complexNumber1.imaginary + complexNumber2.imaginary;
    return [realPart, imaginaryPart];
}

// основной цикл программы
document.getElementById('calculate').addEventListener('click', function() {
    // создание объектов для комплексных чисел
    var complexNumber1 = {
        real: parseFloat(document.getElementById('a').value),
        imaginary: parseFloat(document.getElementById('b').value)
    };
    
    var complexNumber2 = {
        real: parseFloat(document.getElementById('c').value),
        imaginary: parseFloat(document.getElementById('d').value)
    };
    
    // проверка на корректность введенных данных
    if (isNaN(complexNumber1.real) || isNaN(complexNumber1.imaginary) || isNaN(complexNumber2.real) || isNaN(complexNumber2.imaginary)) {
        document.getElementById('error').innerText = "Одно или несколько введенных значений некорректны. Пожалуйста, введите числа.";
        ['a', 'b', 'c', 'd'].forEach(function(id) {
            //сброс предыдущего результата в сообщении
            document.getElementById(id).addEventListener('input', function() {
                if (!isNaN(document.getElementById(id).value)) {
                    document.getElementById(id).classList.remove('error');
                }

                document.getElementById('result').innerText = '';
            });

            // горячая клавиша
            document.getElementById(id).addEventListener('keydown', function(event) {
                if (event.code == 'Enter') {
                    document.getElementById('calculate').click();
                }
            });

            if (isNaN(document.getElementById(id).value)) {
                document.getElementById(id).classList.add('error');
            } else {
                document.getElementById(id).classList.remove('error');
            }
        });
        return;
    } else {
        document.getElementById('error').innerText = "";
    }
    
    // вызов функции
    var result = addComplexNumbers(complexNumber1, complexNumber2);
    
    // вывод результата
    document.getElementById('result').innerText = "Результат сложения: " + result[0] + " + " + result[1] + "i";
});


// назначение горячих клавиш
document.addEventListener('keydown', function(event) {
    if (event.code == 'Enter') {
        document.getElementById('calculate').click();
    }
});

// вывод веселого сообщения после 1 минуты неактивности
var timer = null;
var messageShown = false; //переменная - было ли сообщение
var message = null; // 2 - неактивность на активность

window.onload = resetTimer;
document.onkeydown = resetTimer;

function logout() {
    if (!messageShown) { // проверка, было ли уже показано сообщение
        message = document.createElement('p');
        message.innerText = 'Вы были неактивны в течение 1 минуты, поэтому вот веселое сообщение для вас!';
        document.getElementById('app').appendChild(message);
        messageShown = true; // установка переменной в true после показа сообщения
    }
}

function resetTimer() {
    clearTimeout(timer);
    timer = setTimeout(logout, 60000)

    if (messageShown) { // если сообщение было показано
        document.getElementById('app').removeChild(message); // удалить сообщение
        messageShown = false; // сбросить переменную обратно в false
    }
}



