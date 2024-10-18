var number_one = Number(prompt("Введите первое целое положительное число"))
var number_two = Number(prompt("Введите второе целое положительное число"))

if (number_one != number_two){
    var summa = number_one + number_two
    number_one = summa
    number_two = summa
    alert ("Значение целого числа А:" + number_one +"  " + "Значение целого числа В:"+ number_two)
}else {
    number_one = 0
    number_two = 0
    alert ("Значение целого числа А:" + number_one + "  " + "Значение целого числа В:" + number_two)
}