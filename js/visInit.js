let vis;

function visInit(){
    let context = new AudioContext();
    let sauce = context.createMediaElementSource(music.m);
    vis = new CanvasMusicVis(context,sauce,document.querySelector('canvas'),13);
    vis.draw();
    window.addEventListener('keydown',function(e){
        if(e.key === 'd') vis.activeStyle++;
        else if(e.key === 'a') vis.activeStyle--;
        else if(e.key === 'c') vis.activeColor++;
        else if(e.key === 'z') vis.activeColor--;
        else if(e.key === 'h'){
            vis.offset = document.body.classList.contains('hide') ? 0 : 1.8;
            vis.updateSize();
        } 
        else if(parseInt(e.key) > 0) vis.gain.gain.value = parseInt(e.key).map(0,9,0,1.8);
        else return false;
    
        return false;
    });
}
// 256 * 32