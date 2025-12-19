        window.addEventListener("load", () => {
            const usuarioGuardado = localStorage.getItem("usuario");
            const passwordGuardado = localStorage.getItem("password");

            if (usuarioGuardado) {
                document.getElementById("usuario").value = usuarioGuardado;
            }
            if (passwordGuardado) {
                document.getElementById("password").value = passwordGuardado;
            }
        });

        function login() {
            const usuario = document.getElementById("usuario").value.trim();
            const password = document.getElementById("password").value.trim();
            const mensaje = document.getElementById("mensaje");

            const userCorrecto = "Johendrick";
            const passCorrecto = "0812";

            if (usuario === userCorrecto && password === passCorrecto) {
                localStorage.setItem("usuario", usuario); // Guardar usuario
                localStorage.setItem("password", password); // Guardar contraseña
                localStorage.setItem("loginTime", Date.now()); // Guardar tiempo de login
                console.log("Usuario y contraseña guardados en LocalStorage.");
                mensaje.style.color = "green";
                mensaje.textContent = "¡Inicio de sesión exitoso!";

                setTimeout(() => {
                    window.location.href = "ejercicio_(LocalStorage)2.html";
                }, 1000);
            } else {
                mensaje.style.color = "red";
                mensaje.textContent = "Usuario o contraseña incorrectos.";
            }
        }

        function limpiarCampos() {
            document.getElementById("usuario").value = "";
            document.getElementById("password").value = "";
            document.getElementById("mensaje").textContent = "";
        }

        function limpiarLocalStorage() {
            localStorage.clear();
            document.getElementById("mensaje").style.color = "blue";
            document.getElementById("mensaje").textContent = "LocalStorage limpiado.";
        }