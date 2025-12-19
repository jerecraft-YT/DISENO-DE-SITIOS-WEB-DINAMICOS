        window.addEventListener("load", () => {
            const mensajeSaludo = document.getElementById("mensajeSaludo");
            const ultimoLogin = document.getElementById("ultimoLogin");
            const usuarioPerfil = document.getElementById("usuarioPerfil");
            const usuarioGuardado = localStorage.getItem("usuario");
            const loginTime = localStorage.getItem("loginTime");

            if (usuarioGuardado) {
                mensajeSaludo.textContent = `¡Hola, ${usuarioGuardado}! Bienvenido de nuevo.`;
                usuarioPerfil.textContent = usuarioGuardado;
                if (loginTime) {
                    const fecha = new Date(parseInt(loginTime));
                    ultimoLogin.textContent = `Último inicio de sesión: ${fecha.toLocaleString()}`;
                }
                console.log("Usuario encontrado en LocalStorage.");
            } else {
                window.location.href = "ejercicio_(LocalStorage)1.html";
            }

            const btnCerrar = document.getElementById("cerrarSesion");
            btnCerrar.addEventListener("click", () => {
                localStorage.removeItem("usuario");
                localStorage.removeItem("password");
                localStorage.removeItem("loginTime");
                window.location.href = "ejercicio_(LocalStorage)1.html";
            });
        });