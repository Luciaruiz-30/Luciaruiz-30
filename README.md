

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Reproductor de Video con Formulario</title>
    <link rel="stylesheet" href="css/estilo.css">
</head>
<body>

    <h1>Reproductor De Video LGRN</h1>

    <!-- Reproductor de video -->
    <div class="url-input">
        <input type="text" id="video-url" placeholder="Porfavor, ingresa el URL">
        <button onclick="loadVideo()">Reproducir</button>
    </div>

    <div id="player"></div>

    <!-- Historial de videos -->
    <h2>Historial De Reproduccion</h2>
    <div id="history"></div>

    <!-- Formulario para capturar datos -->
    <h2>Infromacion De Contacto</h2>
    <form id="userForm" onsubmit="saveToSessionStorage(event)">
        <label>Nombre: <input type="text" id="nombre" required></label><br>
        <label>Contacto: <input type="text" id="contacto" required></label><br>
        <label>Edad: <input type="number" id="edad" required></label><br>
        <label>Sexo:
            <select id="sexo" required>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
            </select>
        </label><br>
        <button type="submit">Listo</button>
    </form>

    <footer>
        <audio autoplay controls="controls"> <source src="insertar ruta de musica " type="audio/mp3" /> </audio> 
    </footer>

    <script src="https://www.youtube.com/iframe_api"></script>
    <script src="js/script.js"></script>
</body>
</html>
