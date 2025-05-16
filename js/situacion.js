document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario');
  const registros = JSON.parse(localStorage.getItem('EnviarCorreo')) || [];

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!nombre || !email || !message) {
      Swal.fire('Campos incompletos', 'Por favor completa todos los campos.', 'warning');
      return;
    }

    const fecha = new Date().toLocaleDateString();
    const hora = new Date().toLocaleTimeString();

    const confirmacion = await Swal.fire({
      icon: 'question',
      title: '¿Deseas enviar esta información?',
      html: `
        <p><b>Nombre:</b> ${nombre}</p>
        <p><b>Correo:</b> ${email}</p>
        <p><b>Mensaje:</b> ${message}</p>
        <p><b>Fecha:</b> ${fecha}</p>
        <p><b>Hora:</b> ${hora}</p>
      `,
      showCancelButton: true,
      confirmButtonText: 'Sí, enviar',
      cancelButtonText: 'Cancelar'
    });

    if (!confirmacion.isConfirmed) return;

    Swal.fire({
      title: 'Enviando...',
      didOpen: () => Swal.showLoading(),
      allowOutsideClick: false
    });

    const datosForm = new FormData(form);
    datosForm.append('fecha', fecha);
    datosForm.append('hora', hora);

    try {
      await fetch(form.action, { method: 'POST', body: datosForm });

      const nuevo = { nombre, email, message, fecha, hora };
      registros.push(nuevo);
      localStorage.setItem('EnviarCorreo', JSON.stringify(registros));

      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        html: `
          <p><b>Nombre:</b> ${nombre}</p>
          <p><b>Correo:</b> ${email}</p>
          <p><b>Mensaje:</b> ${message}</p>
          <p><b>Fecha:</b> ${fecha}</p>
          <p><b>Hora:</b> ${hora}</p>
          <br>
          <p>Gracias por registrarte. ¡Buena suerte!</p>
        `
      });

      form.reset();

    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo enviar la información.', 'error');
    }
  });
});
