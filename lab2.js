// Ввод чисел
let number_one = parseFloat(prompt("Введите первое ненулевое число"));
let number_two = parseFloat(prompt("Введите второе ненулевое число"));

// Вычисления
let sumOfSquares = (number_one * number_one) + (number_two * number_two);
let differenceOfSquares = (number_one * number_one) - (number_two * number_two);
let multiplicationOfSquares = (number_one * number_one) * (number_two * number_two);
let quotientOfSquares = (number_one * number_one) / (number_two * number_two);

// Вывод результатов
alert("Сумма квадратов чисел: " + sumOfSquares);
alert("Разность квадратов чисел: " + differenceOfSquares);
alert("Произведение квадратов чисел: " + multiplicationOfSquares);
alert("Частное квадратов чисел: " + quotientOfSquares);
