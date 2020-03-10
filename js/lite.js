import {Mplayer} from './Mplayer.js';
import {addButtonInput} from './inputs.js';
import { keydown,ingoreDefaultBehaviorOfKeys } from './keys.js';

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
ingoreDefaultBehaviorOfKeys([' '])
keydown(' ',()=>playClick(playButton));
keydown('ArrowRight',()=>music.currentFile++);
keydown('ArrowLeft',()=>music.currentFile--);
keydown('ArrowDown',()=>music.currentFile = music.currentFile);
keydown('s',()=>music.shuffle());

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

export{music}