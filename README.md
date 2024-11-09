Esta practica esta diseñada para evaluar las habilidades y conocimientos en HTML, CSS, JavaScript adquiridos incluyendo el uso de APIs de formularios.

Se creo una paguina funcional que integra los siguientes requisitos:

CSS:
/* style.css */

body {
    font-family: Arial, sans-serif;
    background-color: #946b9e;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: #070707;
}

h1 {
    margin-top: 20px;
    font-size: 28px;
    color: #111111;
}

.url-input {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

input[type="text"] {
    padding: 10px;
    width: 300px;
    font-size: 16px;
    border: 1px solid #0e0d0d;
    border-radius: 4px;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    margin-left: 10px;
    background-color: #055e40;
    color: #050505;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #5013df;
}

#player {
    margin-top: 20px;
    width: 640px;
    height: 360px;
    border: 1px solid #0f2fe4;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(10, 214, 214, 0.2);
    overflow: hidden;
    background-color: #613081;
}

#history {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 20px;
    max-width: 80%;
    justify-content: center;
}

.history-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    text-align: center;
}

.history-item img {
    width: 120px;
    height: auto;
    border-radius: 8px;
    margin-bottom: 5px;
    box-shadow: 0px 4px 8px rgb(238, 234, 237);
}

footer {
    margin-top: 20px;
    font-size: 14px;
    color: #000000;
    text-align: center;
    padding: 10px;
    width: 100%;
    background-color: #611b3e;
    border-top: 1px solid #218997;
}


JavaScript:
var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'rphsfqqa1u4',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {}

function loadVideo() {
    const url = document.getElementById('video-url').value;
    const videoId = extractVideoId(url);

    if (videoId) {
        player.loadVideoById(videoId);
        addToHistory(videoId);
    } else {
        alert("Ingresa una URL válida de YouTube");
    }
}

// Extrae el ID del video
function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// video  localStorage
function addToHistory(videoId) {
    let history = JSON.parse(localStorage.getItem('videoHistory')) || [];
    if (!history.includes(videoId)) {
        history.push(videoId);
        localStorage.setItem('videoHistory', JSON.stringify(history));
        updateHistoryUI();
    }
}


// Funcion para eliminar un video del historial
function deleteFromHistory(videoId) {
    let history = JSON.parse(localStorage.getItem('videoHistory')) || [];
    history = history.filter(id => id !== videoId); // Filtrar el ID que se va a eliminar
    localStorage.setItem('videoHistory', JSON.stringify(history));
    updateHistoryUI();
}

// Actualiza la interfaz de historial
function updateHistoryUI() {
    const historyContainer = document.getElementById('history');
    historyContainer.innerHTML = '';

    let history = JSON.parse(localStorage.getItem('videoHistory')) || [];
    history.forEach(videoId => {
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
        
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';

        // Configura el clic en la miniatura para cargar el video
        historyItem.onclick = () => player.loadVideoById(videoId);

        // Crear imagen de miniatura
        const img = document.createElement('img');
        img.src = thumbnailUrl;
        historyItem.appendChild(img);

        // Crear titulo del video
        const title = document.createElement('span');
        title.innerText = `Video ${videoId}`;
        historyItem.appendChild(title);

        // Crear boton de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.innerText = "X";
        deleteButton.onclick = (e) => {
            e.stopPropagation(); // Evita que se active la reproduccion al hacer clic en el boton
            deleteFromHistory(videoId);
        };
        historyItem.appendChild(deleteButton);

        historyContainer.appendChild(historyItem);
    });
}

// Inicializa el historial cuando la pagina carga
window.onload = updateHistoryUI;



HTML:





