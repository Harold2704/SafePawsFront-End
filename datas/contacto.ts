const btnEnviar = document.getElementById("enviarBtn")!;
btnEnviar.addEventListener("click", () => {
  const nombre = (document.getElementById("nombre") as HTMLInputElement).value;
  const correo = (document.getElementById("correo") as HTMLInputElement).value;
  const mensaje = document.getElementById("mensaje")!;
  mensaje.textContent = `Gracias, ${nombre}. Te responderemos pronto al correo ${correo}`;
});
