function getTextBoxValue() {
  const resultContainer = document.getElementById("resultContainer");
  const N = Number(document.getElementById("numberN").value);
  const K = Number(document.getElementById("numberK").value);
  let i = Number(document.getElementById("numberI").value);

  while (i <= N) {
    if (i < K) {
      resultContainer.textContent = "✅ TRUE";
      
      return;
    }
    i++;
  }

  resultContainer.textContent = "❌ FALSE";
 
}
