<script>
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
</script>

<template>
    <div id="app">
        <h1>Сложение комплексных чисел</h1>
        <input type="text" id="a" placeholder="Действительная часть первого числа">
        <input type="text" id="b" placeholder="Мнимая часть первого числа">
        <input type="text" id="c" placeholder="Действительная часть второго числа">
        <input type="text" id="d" placeholder="Мнимая часть второго числа">
        <button id="calculate">Сложить</button>

        <!-- <div id="logs">
            <h2>Логи</h2>
            <button id="clearLogs">Очистить логи</button>
            <ul>
                <li v-for="(log, index) in logs.slice(-10)" :key="index">{{ log }}</li>
            </ul>
        </div> -->

        <p id="error"></p>
        <p id="result"></p>
    </div>
</template>

<style scoped>
body {
    font-family: Arial, sans-serif;
}

#app {
    width: 300px;
    margin: 0 auto;
}

input[type="number"] {
    display: block;
    margin-bottom: 10px;
    padding: 5px;
    width: 100%;
}

button {
    padding: 10px 20px;
    background-color: #e78bbc;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #d8b6c8;
}

.error {
    border: 1px solid red;
}

input[type="text"] {
    display: block;
    margin-bottom: 10px;
    padding: 5px;
    width: 100%;
    margin-top: 10px; 
}

</style>
