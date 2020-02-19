import {Mplayer} from './Mplayer.js';
import {addButtonInput} from './inputs.js';
import { CanvasMusicVis } from './canvasMusicVis.js';
import { keydown } from './keys.js';
import { map } from './prototypes.js';

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
keydown(' ',()=>playClick(playButton));
keydown('ArrowRight',()=>music.currentFile++);
keydown('ArrowLeft',()=>music.currentFile--);
keydown('ArrowDown',()=>music.currentFile = music.currentFile);
keydown('s',()=>music.shuffle());
keydown('h',()=>document.body.classList.toggle('hide'));
keydown('d',()=>vis.activeStyle++);
keydown('a',()=>vis.activeStyle--);
keydown('c',()=>vis.activeColor++);
keydown('z',()=>vis.activeColor--);
keydown('h',()=>{
    vis.offset = document.body.classList.contains('hide') ? 0 : 1.8;
    vis.updateSize();
});
keydown((key)=>parseInt(key) > 0,(key)=>vis.gain.gain.value = map(parseInt(key),0,9,0,1.8));

function playClick(){
    if(playButton.innerText == "play"){
        music.m.play();
        playButton.innerText = "stop";
    } else{
        music.m.pause();
        playButton.innerText = "play";
    }
}
let vis;
function uploadClick(){
    music.fileSelector.click();
    if(vis) return;
    let context = new AudioContext();
    let sauce = context.createMediaElementSource(music.m);
    vis = new CanvasMusicVis(context,sauce,document.querySelector('canvas'),13);
    vis.draw();
}

function showPlaylist(){
    showBTN.style.display = "none";
    playlist.style.display = "block";
}

function hidePlaylist(){
    showBTN.style.display = "block";
    playlist.style.display = "none";
}