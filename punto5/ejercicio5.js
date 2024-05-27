const handler = { // DEFINIMOS UN OBJETO HANDLER PARA MANEJAR LAS OPERACIONES DE PROXY
  set(target, property, value) { // DEFINIMOS EL METODO SET PARA CONTROLAR LAS ASIGNACIONES DE VALORES A LAS PROPIEDADES DEL OBJETO PROXY
    if (typeof value === 'string' && /^[A-Z ]+$/.test(value)) { // SI EL VALOR ES UNA CADENA DE TEXTO Y CONTIENE SOLO LETRAS MAYUSCULAS Y ESPACIOS
      target[property] = value; // ASIGNAMOS EL VALOR A LA PROPIEDAD DEL OBJETO TARGET
      return true; // DEVOLVEMOS TRUE PARA INDICAR QUE LA ASIGNACION FUE EXITOSA
    } else {
      throw new Error("EL NOMBRE DEBE CONTENER SOLO MAYUSCULAS Y ESPACIOS"); // LANZAMOS UN ERROR SI EL VALOR NO CUMPLE CON LOS REQUISITOS
    }
  }
};

async function llamada() { // DEFINIMOS LA FUNCION ASINCRONA LLAMADA()
  try { // INICIAMOS UN BLOQUE TRY PARA MANEJAR ERRORES
    let pedido = await fetch("../user.json"); // HACEMOS UNA PETICION FETCH AL ARCHIVO USER.JSON Y ESPERAMOS SU RESPUESTA
    let respuesta = await pedido.json(); // PARSEAMOS LA RESPUESTA A JSON Y LA ASIGNAMOS A LA VARIABLE RESPUESTA
    
    let usuarios = respuesta.users; // ASIGNAMOS EL ARRAY DE USUARIOS DE LA RESPUESTA JSON A LA VARIABLE RESPUESTA

    usuarios.forEach(usuario => { // ITERAMOS SOBRE CADA USUARIO EN EL ARRAY DE USUARIOS
      if (usuario.aprendiz && usuario.name.split(" ").length > 2 && usuario.user.includes("ADSO")) {  // SI EL USUARIO ES UN APRENDIZ, SU NOMBRE TIENE MAS DE DOS PALABRAS, Y SU USUARIO INCLUYE "ADSO"
        let usuarioProxy = new Proxy(usuario, handler); // CREAMOS UN PROXY PARA EL USUARIO USANDO EL HANDLER DEFINIDO

        try {
            usuarioProxy.name = usuario.name.toUpperCase(); // INTENTAMOS ASIGNAR EL NOMBRE DEL USUARIO EN MAYUSCULAS AL PROXY DEL USUARIO
        } catch (error) {
            console.error(error.message); // SI OCURRE UN ERROR, LO IMPRIMIMOS EN CONSOLA
        }
      }
    });

    console.log(respuesta); // IMPRIMIMOS EN CONSOLA LA RESPUESTA JSON CON LOS USUARIOS
  } catch (error) {
    console.error("HA OCURRIDO UN ERROR", error); // SI OCURRE UN ERROR DURANTE EL FETCH O EL PROCESO, LO IMPRIMIMOS EN CONSOLA
  }
}

llamada(); // LLAMAMOS O INVOCAMOS A LA FUNCION LLAMADA()