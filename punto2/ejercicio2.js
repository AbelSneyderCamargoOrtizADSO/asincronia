function llamada() {
  fetch("../user.json") 
    .then(respuesta => respuesta.json())
    .then(datos => {
      let usuarios = datos.users;
      
      let aprendices = usuarios.filter(usuario => usuario.aprendiz);

      let nombres = aprendices.map(aprendiz => aprendiz.user);
      let avatares = aprendices.map(aprendiz => {
        return fetch(`https://api.github.com/users/${aprendiz.user}`)
          .then(response => response.json())
          .then(data => data.avatar_url);
      });

      Promise.all(avatares)
        .then(avatares => {
          let resultado = nombres.map((nombre, index) => {
            return { nombre: nombre, avatar: avatares[index] };
          });
          console.table(resultado);
        });
    })
}

llamada();
