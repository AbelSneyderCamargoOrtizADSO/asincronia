(async () => {
    try {
        let respuesta = await fetch("../user.json");
        let usuarios = await respuesta.json();

        let aprendices = usuarios.users.filter(usuario => usuario.aprendiz);
        
        let respositorios = [];
        
        for (const aprendiz of aprendices) {
            console.log(aprendiz.user);
            let response = await fetch(`https://api.github.com/users/${aprendiz.user}/repos`);
            let data = await response.json();
            console.log(data);

            respositorios = respositorios.concat(data);
        }

        console.log("TODOS LOS REPOSITORIOS:", respositorios);
    } catch (error) {
        console.error("SE PRODUJO UN ERROR", error);
    }
})();