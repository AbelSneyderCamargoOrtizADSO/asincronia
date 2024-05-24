const handler = {
  set(target, property, value) {
    if (typeof value === 'string' && /^[A-Z ]+$/.test(value)) {
      target[property] = value;
      return true;
    } else {
      throw new Error("EL NOMBRE DEBE CONTENER SOLO MAYUSCULAS Y ESPACIOS");
    }
  }
};

async function llamada() {
  try {
    let pedido = await fetch("../user.json");
    let respuesta = await pedido.json();
    
    let usuarios = respuesta.users;

    usuarios.forEach(usuario => {
      if (usuario.aprendiz && usuario.name.split(" ").length > 2 && usuario.user.includes("ADSO")) {
        let usuarioProxy = new Proxy(usuario, handler);

        try {
            usuarioProxy.name = usuario.name.toUpperCase();
        } catch (error) {
            console.error(error.message);
        }
      }
    });

    console.log(respuesta);
  } catch (error) {
    console.error("HA OCURRIDO UN ERROR", error);
  }
}

llamada();