import {setAttributes,map,removeExtention} from './prototypes.js';
const playButton = document.getElementById("play_btn");
class Mplayer{
    constructor(sliderCon){
        const root = this;

        //creates and appends custom slider
        let durCon = document.createElement("div");
        durCon.id = "slider";
        this.dur = document.createElement("div");
        this.dur.id = "dur";
        durCon.appendChild(this.dur);
        sliderCon.appendChild(durCon);
        this.dur.parentElement.onmousedown = function(e){
            if(root.files.length !== 0) root.m.currentTime = map(e.pageX - this.offsetLeft,0,root.width,0,root.m.duration);
        }
        requestAnimationFrame(this.draw.bind(root));

        this.widthCalc();

        this.files = [];
        this.current = 0;
        this.playlistEL = document.getElementById("pItems");

        this.m = new Audio("");
        this.m.onended = () => this.currentFile++;

        this.fileSelector = document.createElement("input");
        setAttributes(this.fileSelector,{"type":"file","multiple":""});
        this.fileSelector.onchange = function(e) {
            for(let i = 0;i < this.files.length;i++){
                const element = document.createElement("div");
                
                element.innerText = removeExtention(this.files[i].name);
                element.classList.add("pItem");
                element.onclick = function(){
                    root.currentFile = this.fileNumb;
                }
                element.oncontextmenu = function(){
                    root.remove(this.fileNumb);
                    return false;
                }
                root.playlistEL.appendChild(element);
                root.files.push({"file":this.files[i],"element": element});
                element.fileNumb = root.files.length - 1;
            }
            //handles first time of loading files in
            if(root.m.src == window.location){
                root.updateSrc();
                root.files[root.current].element.classList.add("selected");
                root.m.play();
            }
        }
    }

    set currentFile(v){
        if(this.files.length !== 0){
            if(this.files[this.current]) this.files[this.current].element.classList.remove("selected");
            this.current = v;
            if(this.current >= this.files.length) this.current = 0;
            if(this.current < 0) this.current = this.files.length - 1;
            this.files[this.current].element.classList.add("selected");
            this.m.pause();
            this.m.currentTime = 0;
            this.updateSrc();
            this.m.play();
            playButton.innerText = "stop";
        } else {
            this.m.pause();
            this.m.src = '';
            currentSong.innerText = '';
            document.title = 'Mplayer';
        }
    };
    
    get currentFile(){
        return this.current;
    }

    updateSrc(){
        if(!this.files[this.current].file.type.includes('audio')){
            console.log('ge');
        } else {
            this.m.src = URL.createObjectURL(this.files[this.current].file);
            currentSong.innerText = removeExtention(this.files[this.current].file.name);
            document.title = currentSong.innerText;
        }
    }

    draw(){
        this.dur.style.width = map(this.m.currentTime,0,this.m.duration,0,this.width) + "px";
        requestAnimationFrame(this.draw.bind(this));
    }

    widthCalc(){
        let calcCss = getComputedStyle(this.dur.parentElement);
        this.width = parseInt(calcCss.width);
    }
    
    shuffle(){
        const newFileList = [];
        this.playlistEL.innerHTML = "";
        newFileList.push(this.files[this.current]);
        this.files[this.current].element.fileNumb = this.current;
        this.playlistEL.appendChild(this.files[this.current].element);
        this.files.splice(this.current,1);
        this.current = 0;
    
        while(this.files.length != 0){
            const rand = Math.floor(Math.random() * this.files.length);
            newFileList.push(this.files[rand]);
            this.playlistEL.appendChild(newFileList[newFileList.length - 1].element);
            this.files.splice(rand,1);
        }
    
        for(let i = 0; i < this.playlistEL.children.length; i++){
            this.playlistEL.children[i].fileNumb = i;
        }
    
        this.files = newFileList;
    }

    remove(numb){
        if(this.files.length === 0) return;
        let remove = numb === undefined ? this.current : numb;
        const currentCheck = numb === undefined || numb === this.current;
        let tempMemory;
        if(!currentCheck) tempMemory = this.playlistEL.children[this.current];
        this.files.splice(remove,1);
        this.playlistEL.removeChild(this.playlistEL.children[remove]);

        if(currentCheck) this.currentFile = this.current;

        for(let i = 0; i < this.playlistEL.children.length; i++){
            this.playlistEL.children[i].fileNumb = i;
        }
        if(!currentCheck) this.current = tempMemory.fileNumb;
    }
}

export {Mplayer}