var x = Number(prompt("Введите число х"))
var a = 6.72
var y
if (x <= 1){
    y = 1 + Math.sqrt(a + (Math.abs(x)))
    alert("Значение функции 1: " + y)
}
if (x > 6){
    y = 2 + a*Math.pow(x,2) + Math.pow(Math.E,x)
    alert("Значение функции 2: " + y)
}
var b = 4.85
if (1 <= x && x <= 6){
    y = x*Math.sqrt(1+b*Math.log(Math.pow(a,2)*x))
    alert("Значение функции 3: " + y)
}