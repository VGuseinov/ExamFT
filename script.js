const baseURL = 'http:/127.0.0.1:8080';

async function loadVideos() {
    const resp = await fetch(`${baseURL}/video`);
    const videos = await resp.json();
    showVideos(videos);
} 

function showVideos(videos) {
    videos.forEach((v) => {
        const card = document.createElement('div');
        card.addEventListener('click', () => {
            openPlayer(v.id, v.name);
        });
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = v.preview;

        const name = document.createElement('div');
        name.classList.add('name');
        name.innerText = v.name;

        const dur = document.createElement('div');
        dur.classList.add('duration');
        // TODO: перевести секyнды в формат ММ:СС
        dur.innerText = v.duration;

        card.append(img, name, dur);
        document.body.appendChild(card);
    })
}

loadVideos();

/*
    <div class="overlay">
        <div class="dialog">
            <video controls src="http://127.0.0.1:8080/stream/1.mp4"></video>
            <div>video</div>
            <div>4567</div>
            <button>x</button>
        </div>
    </div>
 */


async function openPlayer(id, name) {
    const resp = await fetch(`${baseURL}/video/${id}`);
    const info = await resp.json();

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const dialog = document.createElement('div');
    dialog.classList.add('dialog');

    const video = document.createElement('video');
    video.src = info.url;
    video.controls = true;

    /* Добавить теги для названия и кол-ва просмотров */
    const closeBtn = document.createElement('button');
    closeBtn.innerText = 'x';
    closeBtn.addEventListener('click', () => {
        overlay.remove();
    });

    dialog.append(video, closeBtn);
    overlay.append(dialog);
    document.body.appendChild(overlay);
}