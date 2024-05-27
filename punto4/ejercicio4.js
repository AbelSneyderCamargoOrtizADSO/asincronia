(async () => { // DEFINIMOS UNA FUNCIÓN ANÓNIMA AUTOEJECUTABLE Y LA DECLARAMOS COMO ASÍNCRONA
    try { // INICIAMOS UN BLOQUE TRY PARA MANEJAR POSIBLES ERRORES
        let respuesta = await fetch("../user.json"); // REALIZAMOS LA PETICION AL ARCHIVO USER.JSON Y ESPERAMOS SU RESPUESTA
        let usuarios = await respuesta.json(); // PARSEAMOS LA RESPUESTA A JSON Y LA ASIGNAMOS A LA VARIABLE USUARIOS
        let aprendices = usuarios.users.filter(usuario => usuario.aprendiz); // FILTRAMOS LOS USUARIOS QUE SON APRENDICES Y LOS ASIGNAMOS A LA VARIABLE APRENDICES
        
        let respositorios = [];  // CREAMOS UN ARRAY VACÍO PARA ALMACENAR LOS REPOSITORIOS DE LOS APRENDICES
        
        for (const aprendiz of aprendices) { // ITERAMOS SOBRE CADA APRENDIZ EN EL ARRAY DE APRENDICES 
            let response = await fetch(`https://api.github.com/users/${aprendiz.user}/repos`); // REALIZAMOS UNA PETICION A LA API DE GITHUB PARA OBTENER LOS REPOSITORIOS DEL APRENDIZ Y ESPERAMOS SU RESPUESTA
            let data = await response.json(); // PARSEAMOS LA RESPUESTA A JSON Y LA ASIGNAMOS A LA VARIABLE DATA
            
            respositorios.push({ // AÑADIMOS LOS DATOS (REPOSITORIOS) AL ARRAY RESPORITORIOS, PARA JUNTARLOS
                usuario: aprendiz.user,
                repositorios: data
            }); 
        }

        // A. FILTRAMOS LOS RESULTADOS QUE TENGAN MENOS DE 5 REPOSITORIOS PÚBLICOS Y MOSTRAMOS EN TABLA
        let menosDeCincoRepos = respositorios.filter(result => result.repositorios.length < 5); // FILTRAMOS EL ARRAY REPOSITORIOS PARA OBTENER SOLO AQUELLOS USUARIOS QUE TIENEN MENOS DE 5 REPOSITORIOS PUBLICOS
        console.log("---------------- RESULTADOS CON MENOS DE 5 REPOSITORIOS PÚBLICOS:"); // IMPRIMIMOS UN TITULO EN CONSOLA PARA LOS RESULTADOS CON MENOS DE 5 REPOSITORIOS PUBLICOS
        console.table(menosDeCincoRepos.map(user => ({ usuario: user.usuario, repositorios: user.repositorios }))); // IMPRIMIMOS EN FORMATO TABLA LOS USUARIOS FILTRADOS Y SUS REPOSITORIOS

        let reposConJavaScript = []; // CREAMOS UN ARRAY VACIO PARA ALMACENAR LOS REPOSITORIOS QUE CONTIENEN "JAVASCRIPT" EN SU NOMBRE
        respositorios.forEach(user => { // ITERAMOS SOBRE CADA USUARIO 
            let repos = user.repositorios.filter(repo => repo.name.toLowerCase().includes("javascript")); // FILTRAMOS SUS REPOSITORIOS QUE CONTENGAN JAVASCRIPT EN SU NOMBRE (SIN IMPORTAR MAYUSCULAS O MINUSCULAS)
            if (repos.length > 0) { // SI EL USUARIO TIENE REPOSITORIOS QUE CUMPLEN CON LA CONDICION, LOS AGREGAMOS AL ARRAY REPOSCONJAVASCRIPT
                reposConJavaScript.push({ // AGREGA AL ARRAY REPOSCONJAVASCRIPT
                    usuario: user.usuario, // DEFINIMOS EL NOMBRE DE USUARIO
                    repositorios: repos // Y LOS REPOSITORIOS
                });
            }
        });
        console.log("---------------- REPOSITORIOS QUE CONTIENEN 'JAVASCRIPT' EN SU NOMBRE:"); // IMPRIMIMOS UN TITULO EN CONSOLA PARA LOS REPOSITORIOS QUE CONTIENEN JAVASCRIPT EN SU NOMBRE
        reposConJavaScript.forEach(user => { // RECORREMOS LOS REPOSITORIOS DE LOS USUARIOS
            console.log(user.usuario); // IMPRIMIMOS EL NOMBRE DEL USUARIO EN CONSOLA
            console.log(user.repositorios); // IMPRIMIMOS LOS REPOSITORIOS DEL USUARIO QUE CONTIENEN JAVASCRIPT EN SU NOMBRE
        });

        let reposOrdenados = []; // CREAMOS UN ARRAY VACIO PARA ALMACENAR LOS REPOSITORIOS ORDENADOS
        respositorios.forEach(user => { // ITERAMOS SOBRE CADA USUARIO 
            let repos = user.repositorios.sort((a, b) => a.name.localeCompare(b.name)); // ORDENAMOS SUS REPOSITORIOS POR NOMBRE UTILIZANDO LOCALECOMPARE PARA COMPARAR LOS NOMBRES ALFABETICAMENTE
            reposOrdenados.push({ // AGREGAMOS AL ARRAY REPOSORDENADOS UN OBJETO CON EL NOMBRE DEL USUARIO Y SUS REPOSITORIOS ORDENADOS
                usuario: user.usuario,
                repositorios: repos
            });
        });

        console.log("---------------- REPOSITORIOS ORDENADOS POR NOMBRE:"); // IMPRIMIMOS UN TITULO EN CONSOLA PARA LOS REPOSITORIOS ORDENADOS POR NOMBRE
        reposOrdenados.forEach(user => {
            console.log(user.usuario); // IMPRIMIMOS EL NOMBRE DEL USUARIO EN CONSOLA
            console.log(user.repositorios); // IMPRIMIMOS LOS REPOSITORIOS DEL USUARIO ORDENADOS POR NOMBRE
        });

        let reposConMasDeCincoLetras = []; // CREAMOS UN ARRAY VACIO PARA ALMACENAR LOS REPOSITORIOS CON NOMBRES QUE TIENEN MAS DE CINCO LETRAS
        respositorios.forEach(user => { // ITERAMOS SOBRE CADA USUARIO 
            let repos = user.repositorios.filter(repo => repo.name.length > 5); // FILTRAMOS SUS REPOSITORIOS PARA OBTENER SOLO AQUELLOS CUYO NOMBRE TIENE MAS DE CINCO LETRAS
            if (repos.length > 0) { // SI EL USUARIO TIENE REPOSITORIOS QUE CUMPLEN CON LA CONDICION, LOS AGREGAMOS AL ARRAY 'REPOSCONMASDECINCOLETRAS'
                reposConMasDeCincoLetras.push({
                    usuario: user.usuario,
                    repositorios: repos
                });
            }
        });

        console.log("---------------- REPOSITORIOS CON MÁS DE CINCO LETRAS EN SU NOMBRE:"); // IMPRIMIMOS UN TITULO EN CONSOLA PARA LOS REPOSITORIOS CON NOMBRES QUE TIENEN MAS DE CINCO LETRAS
        reposConMasDeCincoLetras.forEach(user => {
            console.log(user.usuario); // IMPRIMIMOS EL NOMBRE DEL USUARIO EN CONSOLA
            console.log(user.repositorios); // IMPRIMIMOS LOS REPOSITORIOS DEL USUARIO CON NOMBRES QUE TIENEN MAS DE CINCO LETRAS
        });

        console.log("TODOS LOS REPOSITORIOS:", respositorios); // IMPRIMIMOS TODOS LOS REPOSITORIOS EN CONSOLA
    } catch (error) { // BLOQUE DE CAPTURA PARA MANEJAR ERRORES QUE PUEDAN OCURRIR DURANTE LA EJECUCION DEL CODIGO
        console.error("SE PRODUJO UN ERROR", error); // IMPRIMIMOS EN CONSOLA UN MENSAJE DE ERROR SI OCURRE ALGUNO
    }
})();
