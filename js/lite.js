import {Mplayer} from './Mplayer.js';
import {addButtonInput} from './inputs.js';

const currentSong = document.getElementById("currentSong");

const playlist = document.getElementById("playlist");

const playButton = addButtonInput('play',playClick);
const showBTN = addButtonInput('showPlaylist',()=>showPlaylist());
addButtonInput('upload',uploadClick);
addButtonInput('shuffle',()=>music.shuffle());
addButtonInput('remove',()=>music.remove());
addButtonInput('back',()=>music.currentFile--);
addButtonInput('forw',()=>music.currentFile++);
addButtonInput('hidePlaylist',()=>hidePlaylist());

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

function playClick(){
    if(playButton.innerText == "play"){
        music.m.play();
        playButton.innerText = "stop";
    } else{
        music.m.pause();
        playButton.innerText = "play";
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