// ==========================================
//          MUSIC PLAYLIST
// ==========================================

const songs = [

    {
        title: "Who is the Loved One?",
        artist: "Sami Yusuf",
        file: "music/song1.mp3"
    },

    {
        title: "Balaghal Ula Bi Kamalihi",
        artist: "Amjad Sabri & Ali Zafar",
        file: "music/song2.mp3"
    },

    {
        title: "Janam Fida-e-Haideri",
        artist: "Sadiq Hussain",
        file: "music/song3.mp3"
    },

    {
        title: "Abbas Ka Nara",
        artist: "Nadeem Sarwar",
        file: "music/song4.mp3"
    },

    {
        title: "Wedding Nasheed",
        artist: "Maher Zain,Omar Esan & Mohd Ali Muqit",
        file: "music/song5.mp3"
    }

];


// ==========================================
//          HTML ELEMENTS
// ==========================================

const audio =
    document.getElementById("audio");

const songTitle =
    document.getElementById("song-title");

const artistName =
    document.getElementById("artist-name");

const playPauseButton =
    document.getElementById("play-pause");

const previousButton =
    document.getElementById("previous");

const nextButton =
    document.getElementById("next");

const progress =
    document.getElementById("progress");

const currentTime =
    document.getElementById("current-time");

const duration =
    document.getElementById("duration");

const volume =
    document.getElementById("volume");

const playlist =
    document.getElementById("playlist");


// ==========================================
//          VARIABLES
// ==========================================

let currentSongIndex = 0;


// ==========================================
//          LOAD SONG
// ==========================================

function loadSong(index) {

    const song = songs[index];

    songTitle.textContent = song.title;

    artistName.textContent = song.artist;

    audio.src = song.file;

    progress.value = 0;

    currentTime.textContent = "0:00";

    duration.textContent = "0:00";

    updatePlaylist();
}


// ==========================================
//          PLAY SONG
// ==========================================

function playSong() {

    audio.play()
        .then(() => {

            playPauseButton.innerHTML =
                '<i class="fa-solid fa-pause"></i>';

        })
        .catch(() => {

            console.log("Audio file could not be played.");

        });
}


// ==========================================
//          PAUSE SONG
// ==========================================

function pauseSong() {

    audio.pause();

    playPauseButton.innerHTML =
        '<i class="fa-solid fa-play"></i>';
}


// ==========================================
//          PLAY / PAUSE
// ==========================================

playPauseButton.addEventListener(
    "click",
    () => {

        if (audio.paused) {

            playSong();

        } else {

            pauseSong();

        }

    }
);


// ==========================================
//          NEXT SONG
// ==========================================

nextButton.addEventListener(
    "click",
    () => {

        currentSongIndex++;

        if (
            currentSongIndex >= songs.length
        ) {

            currentSongIndex = 0;

        }

        loadSong(currentSongIndex);

        playSong();

    }
);


// ==========================================
//          PREVIOUS SONG
// ==========================================

previousButton.addEventListener(
    "click",
    () => {

        currentSongIndex--;

        if (
            currentSongIndex < 0
        ) {

            currentSongIndex =
                songs.length - 1;

        }

        loadSong(currentSongIndex);

        playSong();

    }
);


// ==========================================
//          UPDATE PROGRESS
// ==========================================

audio.addEventListener(
    "timeupdate",
    () => {

        if (audio.duration) {

            const percentage =
                (audio.currentTime /
                audio.duration) * 100;

            progress.value = percentage;

            currentTime.textContent =
                formatTime(audio.currentTime);

        }

    }
);


// ==========================================
//          CHANGE SONG POSITION
// ==========================================

progress.addEventListener(
    "input",
    () => {

        if (audio.duration) {

            audio.currentTime =
                (progress.value / 100) *
                audio.duration;

        }

    }
);


// ==========================================
//          LOAD DURATION
// ==========================================

audio.addEventListener(
    "loadedmetadata",
    () => {

        duration.textContent =
            formatTime(audio.duration);

    }
);


// ==========================================
//          FORMAT TIME
// ==========================================

function formatTime(seconds) {

    if (isNaN(seconds)) {

        return "0:00";

    }

    const minutes =
        Math.floor(seconds / 60);

    const secondsRemaining =
        Math.floor(seconds % 60);

    return (
        minutes +
        ":" +
        String(secondsRemaining)
            .padStart(2, "0")
    );
}


// ==========================================
//          VOLUME CONTROL
// ==========================================

volume.addEventListener(
    "input",
    () => {

        audio.volume =
            volume.value;

    }
);


// ==========================================
//          AUTOPLAY
// ==========================================

audio.addEventListener(
    "ended",
    () => {

        currentSongIndex++;

        if (
            currentSongIndex >= songs.length
        ) {

            currentSongIndex = 0;

        }

        loadSong(currentSongIndex);

        const autoplay =
            document.getElementById("autoplay");

        if (autoplay.checked) {

            playSong();

        } else {

            pauseSong();

        }

    }
);


// ==========================================
//          CREATE PLAYLIST
// ==========================================

function createPlaylist() {

    playlist.innerHTML = "";

    songs.forEach(
        (song, index) => {

            const listItem =
                document.createElement("li");

            listItem.textContent =
                `${song.title} - ${song.artist}`;

            listItem.addEventListener(
                "click",
                () => {

                    currentSongIndex = index;

                    loadSong(currentSongIndex);

                    playSong();

                }
            );

            playlist.appendChild(
                listItem
            );

        }
    );
}


// ==========================================
//          UPDATE PLAYLIST
// ==========================================

function updatePlaylist() {

    const items =
        playlist.querySelectorAll("li");

    items.forEach(
        (item, index) => {

            if (
                index === currentSongIndex
            ) {

                item.classList.add("active");

            } else {

                item.classList.remove("active");

            }

        }
    );
}


// ==========================================
//          INITIALIZE
// ==========================================

createPlaylist();

loadSong(currentSongIndex);

audio.volume = 1;