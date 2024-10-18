var number_one = Number(prompt('Введите первое целое положительное число'))
var number_two = Number(prompt('Введите второе положительное число'))

if ((number_one %2 !=0 && number_two %2 == 0) || (number_one %2 ==0 && number_two %2 != 0)) {
    alert ("Ровно одно из чисел нечетное")
}else if (number_one %2 ==0 && number_two %2 == 0)  {
    alert("Все числа четные")
}else {
    alert ("Все числа нечетные")
 }