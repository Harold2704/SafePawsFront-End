const btn = document.getElementById("calcular") as HTMLButtonElement;
const input1 = document.getElementById("num1") as HTMLInputElement;
const input2 = document.getElementById("num2") as HTMLInputElement;
const resultado = document.getElementById("resultado") as HTMLParagraphElement;

btn.addEventListener("click", () => {
  const valor1 = parseFloat(input1.value);
  const valor2 = parseFloat(input2.value);
  const suma = valor1 + valor2;

  if (!isNaN(suma)) {
    resultado.textContent = `Resultado: ${suma}`;
  } else {
    resultado.textContent = "Por favor ingresa dos números válidos.";
  }
});
