function llamada() { // DEFINIMOS LA FUNCION
  fetch("../user.json") // REALIZAMOS LA PETICION AL ARCHIVO USER.JSON, EL FETCH RETORNA UNA PROMESA
    .then(respuesta => respuesta.json()) // CONSUMIMOS CUANDO SE REALIZA LA PROMESA, LA RESPUESTA O DATOS RECIBIMOS LOS PARSEAMOS PARA QUE SE LEAN COMO JSON
    .then(datos => { // RECIBIMOS ESOS DATOS EN JSON
      let usuarios = datos.users; // ASIGNAMOS A LA VARIABLE USUARIOS EL ARRAR "USERS" QUE HAY EN EL ARCHIVO JSON
      
      let aprendices = usuarios.filter(usuario => usuario.aprendiz); // AHORA EL .FILTER NOS DEVUELVE UN ARRAY DONDE SOLO ESTAN LOS APRENDICES, LA CONDICION ES QUE APRENDIZ SEA TRUE. Y ESTE ARRAY LO ASIGNAMOS A LA VARIABLE APRENDICES

      let nombres = aprendices.map(aprendiz => aprendiz.user); // RECORREMOS CON EL MAP CADA APRENDIZ Y DEVOLVEMOS LOS USUARIOS DE CADA UNO, ESTO SE DEVUELVE EN UN ARRAY QUE ES ASIGNADO A LA VARIABLE NOMBRES

      let avatares = aprendices.map(aprendiz => { // LE ASIGNAMOS A LA VARIABLE AVATARES UN MAP DEL ARRAY APRENDICES
        return fetch(`https://api.github.com/users/${aprendiz.user}`) // ESTE MAP DEVUELVE UN FETCH QUE DEVUELVE UNA PROMESA, DONDE SE REALIZA LA PETICION AL API DE GITHUB Y SE INTERPOLA EL NOMBRE DEL USUARIO EN LA URL
          .then(response => response.json()) // RECIBIMOS CUANDO LA PROMESA SE RESUELVE Y LO PARSEAMOS PARA LEER EN JSON
          .then(data => data.avatar_url); // RECIBIMOS LOS DATOS Y RETORNAMOS LA URL DEL AVATAR DE CADA APRENDIZ DEEL ARRAY APRENDICES
      });

      Promise.all(avatares) // CON PROMISE.ALL ESPERAMOS A QUE TODAS LAS PROMESAS DEL ARRAY AVATARES SE RESUELVAN 
        .then(avatares => { // CUANDO SE RESUELVAN TODAS, NOS RETORNA UN ARRAY CON TODAS LAS URL DE LOS AVATARES DE CADA APRENDIZ
          let resultado = nombres.map((nombre, index) => { // ASIGNAMOS A LA VARIABLE RESULTADO UN METODO MAP DE LA VARIABLE NOMBRES, QUE RECORRE ESE ARRAY Y TOMA COMO PARAMETROS EL NOMBRE Y EL INDICE (YA QUE EL .MAP PASA EL INDICE DEL ELEMENTO COMO SEGUNDO ARGUMENTO)
            return { nombre: nombre, avatar: avatares[index] }; // POR CADA NOMBRE SE RETORNA UN OBJETO CON EL NOMBRE Y LA URL DEL AVATAR DE CADA APRENDIZ
          });
          console.table(resultado); // IMPRIMIMOS EN TABLA EL ARRAY QUE NOS DEVUELVE EL .MAP CON LOS OBJETOS (CADA OBJETO ES UN NOMBRE Y URL DE UN APRENDIZ) 
        });
    })
}

llamada(); // INVOCAMOS O LLAMAMOS LA FUNCION
