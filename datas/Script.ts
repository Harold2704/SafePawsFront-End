
const nombreInput = document.getElementById("nombreInput") as HTMLInputElement;
const saludarBtn = document.getElementById("saludarBtn") as HTMLButtonElement;
const mensaje = document.getElementById("mensaje") as HTMLParagraphElement;

saludarBtn.addEventListener("click", () => {
  const nombre = nombreInput.value.trim();
  if (nombre) {
    mensaje.textContent = `¡Hola, ${nombre}! Bienvenido a TypeScript.`;
  } else {
    mensaje.textContent = "Por favor, ingresa tu nombre.";
  }
});
