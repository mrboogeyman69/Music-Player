document.addEventListener("DOMContentLoaded", function () {
    const audioPlayer = document.getElementById("audioPlayer");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const stopBtn = document.getElementById("stopBtn");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const progress = document.getElementById("progress");
    const currentTimeDisplay = document.getElementById("current-time");
    const durationDisplay = document.getElementById("duration");
    const volumeControl = document.getElementById("volume");
    const muteBtn = document.getElementById("muteBtn");
    const playlist = document.querySelectorAll(".playlist li");

    let currentSongIndex = 0;
    let isPlaying = false;

    function playPause() {
        if (isPlaying) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
        isPlaying = !isPlaying;
        updatePlayPauseButton();
    }

    function updatePlayPauseButton() {
        playPauseBtn.textContent = isPlaying ? "Pause" : "Play";
    }

    function stop() {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        isPlaying = false;
        updatePlayPauseButton();
    }

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong();
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong();
    }

    function loadSong() {
        const selectedSong = playlist[currentSongIndex];
        audioPlayer.src = selectedSong.dataset.src;
        audioPlayer.load();
        playPause();
    }

    function updateProgress() {
        const progressPercentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progress.style.width = progressPercentage + "%";
        currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
        durationDisplay.textContent = formatTime(audioPlayer.duration);
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function updateVolume() {
        audioPlayer.volume = volumeControl.value;
    }

    function toggleMute() {
        audioPlayer.muted = !audioPlayer.muted;
        muteBtn.textContent = audioPlayer.muted ? "Unmute" : "Mute";
    }

    function handlePlaylistClick(event) {
        const clickedIndex = Array.from(playlist).indexOf(event.currentTarget);
        if (clickedIndex !== -1) {
            currentSongIndex = clickedIndex;
            loadSong();
        }
    }

    playPauseBtn.addEventListener("click", playPause);
    stopBtn.addEventListener("click", stop);
    nextBtn.addEventListener("click", nextSong);
    prevBtn.addEventListener("click", prevSong);
    volumeControl.addEventListener("input", updateVolume);
    muteBtn.addEventListener("click", toggleMute);

    playlist.forEach(song => {
        song.addEventListener("click", handlePlaylistClick);
    });

    audioPlayer.addEventListener("timeupdate", updateProgress);
    audioPlayer.addEventListener("ended", nextSong);
});
