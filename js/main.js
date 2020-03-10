import { map } from './prototypes.js';
import { keydown } from './keys.js';
import { music } from './lite.js';
import { CanvasMusicVis } from './canvasMusicVis.js';

keydown('h',()=>{
    document.body.classList.toggle('hide')
    vis.offset = document.body.classList.contains('hide') ? 0 : 1.8;
    vis.updateSize();
});
keydown('d',()=>vis.activeStyle++);
keydown('a',()=>vis.activeStyle--);
keydown('c',()=>vis.activeColor++);
keydown('z',()=>vis.activeColor--);
keydown((key)=>parseInt(key) > 0,(key)=>vis.gain.gain.value = map(parseInt(key),0,9,0,1.8));

const context = new AudioContext();
const sauce = context.createMediaElementSource(music.m);
const vis = new CanvasMusicVis(context,sauce,document.querySelector('canvas'),13);
vis.draw();