const input = document.getElementById("celsius") as HTMLInputElement;
const btn = document.getElementById("convertir")!;
const output = document.getElementById("farenheit")!;
btn.addEventListener("click", () => {
  const f = (parseFloat(input.value) * 9/5) + 32;
  output.textContent = `${f.toFixed(2)}° F`;
});
