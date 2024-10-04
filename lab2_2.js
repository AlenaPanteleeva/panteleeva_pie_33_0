let number = prompt("Введите целое положительное трехзначное число")

let lastNumber = number % 10; // последняя цифра
let middleNumber = Math.floor((number % 100) / 10); // средняя цифра

alert("Последняя цифра: " + lastNumber);
alert("Средняя цифра: " + middleNumber);


