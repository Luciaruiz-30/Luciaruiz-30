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