var x = Number(prompt("Введите число x"))
var a = 6.72
var b = 4.85
var y 
switch(x){
    case 1:
        y = 1 + Math.sqrt(a+(Math.abs(x)))
        alert("Значение функции 1: " + y)
        break
    case 7:
        y = 2 + Math.pow((a*x),2) + Math.pow(Math.E,x)
        alert("Значение функции 2: " + y)
        break
    case 5:
        y = x * Math.sqrt(1 + b* Math.log(Math.pow(a,2)*x))
        alert("Значение функции 3: " + y)
        break
    default: alert("вводимое значение не проходит по условиям")
}