const c = document.getElementById("container");
const playButton = document.getElementById("b");
const dur = document.getElementById("dur");
const currentSong = document.getElementById("currentSong");

const showBTN = document.getElementById("showPlaylistBtn");
const playlist = document.getElementById("playlist");

const music = new Mplayer(document.getElementById("sliderCon"),document.getElementById("gui"));

window.onresize = function() {
    music.widthCalc();
};
window.onkeydown = (e) => e.key !== ' ';
window.addEventListener('keydown',function(e){
         if(e.key === ' ') playClick(playButton);
    else if(e.key === 'ArrowRight') music.currentFile++;
    else if(e.key === 'ArrowLeft') music.currentFile--;
    else if(e.key === 'ArrowDown') music.currentFile = music.currentFile;
    else if(e.key === 's') music.shuffle();
    else if(e.key === 'h') document.body.classList.toggle('hide');
    else return false;

    return false;
});

function playClick(e){
    if(e.innerText == "play"){
        music.m.play();
        e.innerText = "stop";
    } else{
        music.m.pause();
        e.innerText = "play";
    }
}

function uploadClick(){
    music.fileSelector.click();
}

function showPlaylist(){
    showBTN.style.display = "none";
    playlist.style.display = "block";
}

function hidePlaylist(){
    showBTN.style.display = "block";
    playlist.style.display = "none";
}