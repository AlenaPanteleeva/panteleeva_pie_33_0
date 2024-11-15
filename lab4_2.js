function getTextBoxValue() {
    const resultContainer = document.getElementById("resultContainer");
    const errorContainer = document.getElementById("errorContainer");
    const N = Number(document.getElementById("numberN").value);
  
    if (errorContainer && N <= 0) {
      resultContainer.textContent = '';
      errorContainer.textContent = 'Введите число > 0';
      return;
    }
  
    let sum = 0;

    for (let i = 1; i <= N; i++) {
      sum += 1 / i;
    }
    // Выводим результат
    errorContainer.textContent = '';
    resultContainer.textContent = sum;
  }