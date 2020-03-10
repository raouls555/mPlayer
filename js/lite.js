import { keydown,ingoreDefaultBehaviorOfKeys } from './keys.js';
import {addButtonInput} from './inputs.js';
import {Mplayer} from './Mplayer.js';

function addButtonAndKey(btnName,keyName,func){
    keydown(keyName,func);
    return addButtonInput(btnName,func);
}

const music = new Mplayer(document.getElementById("sliderCon"),document.getElementById("gui"));

ingoreDefaultBehaviorOfKeys([' ']);

const playButton = addButtonAndKey('play',' ',playClick);
const showBTN = addButtonInput('showPlaylist',()=>togglePlaylist(true));
addButtonInput('hidePlaylist',()=>togglePlaylist(false));
keydown('ArrowDown',()=>music.currentFile = music.currentFile);

addButtonAndKey('upload','u',()=>music.fileSelector.click());
addButtonAndKey('shuffle','s',()=>music.shuffle());
addButtonAndKey('remove','r',()=>music.remove());
addButtonAndKey('back','ArrowLeft',()=>music.currentFile--);
addButtonAndKey('forw','ArrowRight',()=>music.currentFile++);

window.addEventListener('resize',()=>music.widthCalc());

function playClick(){
    if(music.m.paused){
        music.m.play();
        playButton.innerText = "stop";
    } else {
        music.m.pause();
        playButton.innerText = "play";
    }
}

function togglePlaylist(show){
    showBTN.style.display = show ? "none" : "block";
    document.getElementById("playlist").style.display = show ? "block" : "none";
}

export{music}