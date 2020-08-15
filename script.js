const img = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design'
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design'
    }
]

// Check if playin
let isPlaying = false;

// PLAY
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// PAUSE
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.displayName;
    music.src = `music/${song.name}.mp3`;
    img.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
    songIndex --;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }    
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong() {
    songIndex ++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }    
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select first song
loadSong(songs[songIndex]);

// Update progress bar & time
function updateProgressBar(e) {
    if(isPlaying) {
        // console.log(e);
        const { duration, currentTime } = e.srcElement;
        // console.log(duration, currentTime);
        // UPDATE PROGRESS BAR WIDTH
        const progressPercent = (currentTime / duration) * 100;
        // console.log(progressPercent);
        progress.style.width = `${progressPercent}%`;
        // CALCULATE DISPLAY FOR DURATION
        const durationMinutes = Math.floor(duration / 60);
        // console.log('minutes: ', durationMinutes);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // console.log('seconds: ', durationSeconds);        
        // DELAY SWITCHING DURATION ELEMENT TO AVOID NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // CALCULATE DISPLAY FOR CURRENT TIME
        const currentMinutes = Math.floor(currentTime / 60);
        // console.log('minutes: ', currentMinutes);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        // console.log('seconds: ', currentSeconds);        
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        
    }
}

// Set Progress Bar
function setProgressBar(e) {
    //console.log(e);
    const width = this.clientWidth;
    // console.log('width: ', width);
    const clickX = e.offsetX;
    // console.log('ofsetX: ', clickX);
    const { duration } = music;
    // console.log(clickX / width);
    // console.log((clickX / width) * duration);
    music.currentTime = (clickX / width) * duration; 
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);