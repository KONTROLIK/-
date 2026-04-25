// Список всех аудиофайлов
const audioFiles = [
    "222.mp3",
    "333.mp3",
    "Арсеев Сергей.ogg",
    "Аудитория 312 поток.mp3",
    "Бартинова Дарина.ogg",
    "БЕЛОВ добрыня.mp3",
    "Березин Максим.mp3",
    "Бойцов Матвей.mp3",
    "Бологов РС.mp3",
    "Бурдукова А.С..mp3",
    "Веселова Алина.mp3",
    "Вильчинский Вячеслав.mp3",
    "Волкова Екатерина.mp3",
    "Воронов Никита.mp3",
    "головин арсений.mp3",
    "Гошев Александр.mp3",
    "Гулин М.А..mp3",
    "Дворянкин Дмитрий.ogg",
    "Дементьев Эдуард.ogg",
    "Дементьева М.С.mp3",
    "Дмитриев Арсений.ogg",
    "Задорин Тимофей.ogg",
    "Иванов Иван.mp3",
    "иванова анастасия.mp3",
    "Иванова Дарья.mp3",
    "Ипатова Милана.mp3",
    "ищенко вадим.mp3",
    "Казакова Валерия.mp3",
    "Калинина Екатерина.mp3",
    "Каян СД.mp3",
    "квасников александр.mp3",
    "Козлов Егор.ogg",
    "кононова дарья.mp3",
    "Копылов АА.mp3",
    "Красичков Даниил.ogg",
    "Кузьмин ГА.mp3",
    "курдюкова вероника.mp3",
    "Лашов Никита.ogg",
    "Лебедев Егор.mp3",
    "Лихачев Андрей.mp3",
    "Люлев Артём.mp3",
    "Макарова Дарья.mp3",
    "малых валерия.mp3",
    "Мальцев ОС.mp3",
    "Манакова МД.mp3",
    "Маркин Глеб.mp3",
    "Митрофанов Даниил.mp3",
    "ммм.mp3",
    "Мокрецов Макар.ogg",
    "Налетов Денис.ogg",
    "некрасова дарья.mp3",
    "Низовцева Ирина.mp3",
    "обернихин илья.mp3",
    "Ожиганов Роман.mp3",
    "Паламодов БА.mp3",
    "Паутова Валерия.mp3",
    "плесовский захар.mp3",
    "Плотников Иван.mp3",
    "Поварова Алиса.ogg",
    "Попов АС.mp3",
    "Попова Полина.mp3",
    "поток 309.mp3",
    "Поток 311.mp3",
    "поток 410.mp3",
    "Романов Даниил.mp3",
    "РОМАНОВА КА.mp3",
    "Рудяшко АА.mp3",
    "самсоненко алёна.mp3",
    "Собашникова СМ.mp3",
    "Степура Евгения.ogg",
    "Теплых максим.mp3",
    "Тюкавин Кирилл.ogg",
    "ТюкавинаАИ.mp3",
    "Фролов Матвей.mp3",
    "Хамьянова Алина.mp3",
    "харионовская елизавета.mp3",
    "Харченко Максим.mp3",
    "Хлупин АА.mp3",
    "хомченко алёна.mp3",
    "Хомченко Иван.mp3",
    "Чернов Константин.mp3",
    "Шалак Андрей.ogg",
    "Шашерин Арсений.mp3",
    "Шиловский Василий.mp3",
    "Шнуров Назар.ogg",
    "Якимов Артём.mp3"
];

// Элементы DOM
const searchInput = document.getElementById('searchInput');
const audioList = document.getElementById('audioList');
const resultsCount = document.getElementById('resultsCount');
const playerContainer = document.getElementById('playerContainer');
const audioPlayer = document.getElementById('audioPlayer');
const currentTrack = document.getElementById('currentTrack');
const playPauseBtn = document.getElementById('playPause');
const rewindBtn = document.getElementById('rewind');
const forwardBtn = document.getElementById('forward');
const closePlayerBtn = document.getElementById('closePlayer');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const speedControl = document.getElementById('speedControl');
const speedValue = document.getElementById('speedValue');
const volumeControl = document.getElementById('volumeControl');
const volumeValue = document.getElementById('volumeValue');

let currentPlayingItem = null;

// Функция для отображения списка аудио
function displayAudioList(files) {
    audioList.innerHTML = '';
    
    if (files.length === 0) {
        audioList.innerHTML = '<p style="text-align: center; color: #999;">Ничего не найдено</p>';
        resultsCount.textContent = '';
        return;
    }
    
    resultsCount.textContent = `Найдено: ${files.length} файл(ов)`;
    
    files.forEach(file => {
        const item = document.createElement('div');
        item.className = 'audio-item';
        item.textContent = file.replace(/\.(mp3|ogg)$/, '');
        item.dataset.file = file;
        
        item.addEventListener('click', () => playAudio(file, item));
        
        audioList.appendChild(item);
    });
}

// Функция поиска
function searchAudio(query) {
    const filtered = audioFiles.filter(file => 
        file.toLowerCase().includes(query.toLowerCase())
    );
    displayAudioList(filtered);
}

// Функция воспроизведения
function playAudio(fileName, itemElement) {
    const audioPath = `УСТНЫЙ РУССКИЙ/${encodeURIComponent(fileName)}`;
    audioPlayer.src = audioPath;
    currentTrack.textContent = fileName.replace(/\.(mp3|ogg)$/, '');
    
    // Показываем плеер
    playerContainer.style.display = 'block';
    
    // Обновляем активный элемент
    if (currentPlayingItem) {
        currentPlayingItem.classList.remove('active');
    }
    itemElement.classList.add('active');
    currentPlayingItem = itemElement;
    
    // Воспроизводим
    audioPlayer.play();
    playPauseBtn.textContent = '⏸️';
}

// Форматирование времени
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// События поиска
searchInput.addEventListener('input', (e) => {
    searchAudio(e.target.value);
});

// События плеера
playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = '⏸️';
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = '▶️';
    }
});

rewindBtn.addEventListener('click', () => {
    audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 10);
});

forwardBtn.addEventListener('click', () => {
    audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 10);
});

closePlayerBtn.addEventListener('click', () => {
    audioPlayer.pause();
    playerContainer.style.display = 'none';
    if (currentPlayingItem) {
        currentPlayingItem.classList.remove('active');
        currentPlayingItem = null;
    }
    playPauseBtn.textContent = '▶️';
});

// Обновление прогресс-бара
audioPlayer.addEventListener('timeupdate', () => {
    if (audioPlayer.duration) {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress;
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    }
});

audioPlayer.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audioPlayer.duration);
});

// Перемотка через прогресс-бар
progressBar.addEventListener('input', (e) => {
    const time = (e.target.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = time;
});

// Управление скоростью
speedControl.addEventListener('input', (e) => {
    const speed = parseFloat(e.target.value);
    audioPlayer.playbackRate = speed;
    speedValue.textContent = `${speed.toFixed(1)}x`;
});

// Управление громкостью
volumeControl.addEventListener('input', (e) => {
    const volume = parseInt(e.target.value);
    audioPlayer.volume = volume / 100;
    volumeValue.textContent = `${volume}%`;
});

// Автовоспроизведение следующего трека
audioPlayer.addEventListener('ended', () => {
    playPauseBtn.textContent = '▶️';
});

// Клавиатурные сокращения
document.addEventListener('keydown', (e) => {
    if (playerContainer.style.display === 'none') return;
    
    switch(e.code) {
        case 'Space':
            e.preventDefault();
            playPauseBtn.click();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            rewindBtn.click();
            break;
        case 'ArrowRight':
            e.preventDefault();
            forwardBtn.click();
            break;
        case 'ArrowUp':
            e.preventDefault();
            volumeControl.value = Math.min(100, parseInt(volumeControl.value) + 5);
            volumeControl.dispatchEvent(new Event('input'));
            break;
        case 'ArrowDown':
            e.preventDefault();
            volumeControl.value = Math.max(0, parseInt(volumeControl.value) - 5);
            volumeControl.dispatchEvent(new Event('input'));
            break;
    }
});

// Инициализация - показываем все файлы
displayAudioList(audioFiles);
