const videoPlayer = document.querySelector('.viewer');
const toggleButton = document.querySelector(".toggle");
const progress = document.querySelector('.progress');
const playBar = document.querySelector('.progress__filled');
const volumeTrackBar = document.querySelector('input[name="volume"]');
const playbackTrackBar = document.querySelector('input[name="playbackRate"]');
const skipButtons = document.querySelectorAll('.player__button');
let isVideoPlaying = false;

// pause/play on click
toggleButton.addEventListener('click', togglePlay);
videoPlayer.addEventListener('click', togglePlay);

function togglePlay() {
    isVideoPlaying = !isVideoPlaying;
    isVideoPlaying ? videoPlayer.play() : videoPlayer.pause();
    isVideoPlaying ? toggleButton.innerHTML = ('| |') : toggleButton.innerHTML = ('►');
}

//set playbar width
videoPlayer.addEventListener('timeupdate', setPlayBarWidth);

function setPlayBarWidth () {
    playBar.style.width = (videoPlayer.currentTime  / videoPlayer.duration) * 100 + "%";
}

//set volume with input
volumeTrackBar.addEventListener('change', () => videoPlayer.volume = volumeTrackBar.value);
volumeTrackBar.addEventListener('mousemove', () => videoPlayer.volume = volumeTrackBar.value);

//set playback ration with input
playbackTrackBar.addEventListener('change', () => videoPlayer.playbackRate = playbackTrackBar.value);
playbackTrackBar.addEventListener('mousemove', () => videoPlayer.playbackRate = playbackTrackBar.value);

//skip buttons
skipButtons.forEach(button => {
   button.addEventListener('click', function () {
       let skipValue = +button.dataset['skip'];
       if (skipValue) {
           videoPlayer.currentTime = videoPlayer.currentTime + skipValue;
       }
   })
});

//progress bar click events
progress.addEventListener('click', function (e) {
    const percentagesClick = (e.offsetX / progress.offsetWidth) * videoPlayer.duration;
    playBar.style.width = percentagesClick * 100 + '%';
});

let mousedown = false;
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
