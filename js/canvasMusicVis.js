class CanvasMusicVis {
    constructor(context,input, canvas,offset) {
        this.style = 0;
        this.col = 0;
        this.canvas = canvas;
        this.offset = offset || 0;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight - this.offset;
        window.addEventListener('resize', () => {this.updateSize()});
        this.atx = context;
        this.music = input;
        this.analyser = this.atx.createAnalyser();
        this.analyser.fftSize = 256;
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);

        this.balls = [];
        for (let i = 0; i < this.dataArray.length; i++) {
            this.balls.push(new Ball(this.canvas,this.ctx,i.map(0,this.dataArray.length,10,1)));
        }
        this.gain = this.atx.createGain();
        this.gain.gain.value = 1;
        this.music.connect(this.gain);
        this.gain.connect(this.analyser);
        this.analyser.connect(this.atx.destination);
    }

    updateSize(){
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight - this.offset;
        this.ctx.fillStyle = bgCol[this.col];
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    set activeStyle(s){
        if(s >= styleArray.length){
            this.style = 0;
        } else if(s < 0){
            this.style = styleArray.length - 1;
        } else {
            this.style = s;
        }
        this.ctx.fillStyle = bgCol[this.col];
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    get activeStyle(){
        return this.style;
    }

    set activeColor(c){
        if(c >= colors.length){
            this.col = 0;
        } else if(c < 0){
            this.col = colors.length - 1;
        } else {
            this.col = c;
        }
        this.ctx.fillStyle = bgCol[this.col];
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    get activeColor(){
        return this.col;
    }

    draw() {
        this.analyser.getByteFrequencyData(this.dataArray);
        styleArray[this.style](this);
        time++;
        if(time > 360) time = 0;
        requestAnimationFrame(this.draw.bind(this));
    }
}
let time = 0;
const styleArray = [
    function (thi){
        thi.ctx.fillStyle = bgCol[thi.col] + '33';
        thi.ctx.fillRect(0, 0, thi.canvas.width, thi.canvas.height);
        for (let i = 0; i < thi.dataArray.length; i++) {
            let h = 360 * thi.dataArray[i].map(0, 255, 0, 1);
            thi.ctx.fillStyle = colors[thi.col](h,i);
            thi.balls[i].vel.set(0,-thi.dataArray[i].map(0, 255, 0, 10));
            thi.balls[i].rad = thi.dataArray[i].map(0, 255, 0, 10);
            thi.balls[i].updateType2();
            thi.balls[i].draw();
        }
    },
    function (thi){
        thi.ctx.fillStyle = bgCol[thi.col] + '33';
        thi.ctx.fillRect(0, 0, thi.canvas.width, thi.canvas.height);
        for (let i = 0; i < thi.dataArray.length; i++) {
            let h = 360 * thi.dataArray[i].map(0, 255, 0, 1);
            thi.ctx.fillStyle = colors[thi.col](h,i);
            thi.balls[i].vel.magnitude = thi.dataArray[i].map(0, 255, 0, 10);
            thi.balls[i].rad = thi.dataArray[i].map(0, 255, 0, 10);
            thi.balls[i].updateType1();
            thi.balls[i].draw();
        }
    },
    function (thi){
        thi.ctx.fillStyle = bgCol[thi.col] + '33';
        thi.ctx.fillRect(0, 0, thi.canvas.width, thi.canvas.height);
        for (let i = 0; i < thi.dataArray.length; i++) {
            let h = 360 * thi.dataArray[i].map(0, 255, 0, 1);
            thi.ctx.fillStyle = colors[thi.col](h,i);
            thi.balls[i].vel.magnitude = thi.dataArray[i].map(0, 255, 0, 10);
            thi.balls[i].rad = thi.dataArray[i].map(0, 255, 0, 10);
            thi.balls[i].updateType3();
            thi.balls[i].draw();
        }
    },
    function (thi) {
        thi.dataF = thi.dataArray.filter((el) => el > 0);
        thi.ctx.fillStyle = bgCol[thi.col];
        thi.ctx.fillRect(0, 0, thi.canvas.width, thi.canvas.height);
        thi.ctx.save();
        thi.ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
        for (let i = 0; i < thi.dataF.length; i++) {
            let h = 360 * thi.dataF[i].map(0, 255, 0, 1);
            thi.ctx.fillStyle = colors[thi.col](h,i);
            thi.ctx.save();
            thi.ctx.rotate(i.map(0, thi.dataF.length, 0, Math.PI * 2));
            thi.ctx.fillRect(-1, 0, 1, thi.dataF[i].map(0, 250, 0, thi.canvas.height / 2 - 36));
            thi.ctx.restore();
        }
        thi.ctx.restore();
    },
    function (thi) {
        thi.dataF = thi.dataArray.filter((el) => el > 0);
        thi.ctx.fillStyle = bgCol[thi.col] + '11';
        thi.ctx.fillRect(0, 0, thi.canvas.width, thi.canvas.height);
        thi.ctx.strokeStyle = colors[thi.col](time,0);
        const width = thi.canvas.width / thi.dataF.length;
        thi.ctx.beginPath();
        for (let i = 0; i < thi.dataF.length - 1; i++) {
            thi.ctx.lineTo(i * width,thi.dataF[i].map(0, 250, thi.canvas.height,thi.canvas.height / 3 * 1));
        }
        if(thi.dataF.length !== 0)thi.ctx.lineTo(thi.canvas.width,thi.dataF[thi.dataF.length - 1].map(0, 250, thi.canvas.height,thi.canvas.height / 3 * 1));
        thi.ctx.stroke();
    },
    function (thi) {
        let map = thi.ctx.getImageData(0, 0, thi.canvas.width, thi.canvas.height);
        thi.ctx.putImageData(map, -10, -10);
        thi.dataF = thi.dataArray;
        thi.ctx.fillStyle = bgCol[thi.col] + '11';
        thi.ctx.fillRect(0, 0, thi.canvas.width, thi.canvas.height);
        const width = thi.canvas.width / thi.dataF.length;
        for (let i = 0; i < thi.dataF.length; i++) {
            let h = 360 * thi.dataF[i].map(0, 255, 0, 0.8);
            thi.ctx.fillStyle = colors[thi.col](h,i);
            thi.ctx.save();
            thi.ctx.fillRect(i * width, thi.canvas.height, width + 1, -thi.dataF[i].map(0, 250, 0, thi.canvas.height / 3 * 2));
            thi.ctx.restore();
        }
    },
    function (thi) {
        thi.ctx.fillStyle = bgCol[thi.col];
        thi.ctx.fillRect(0, 0, thi.canvas.width, thi.canvas.height);
        const circleSize = thi.canvas.height / 3 + 10;
        for (let i = 0; i < thi.dataArray.length - 5; i++) {
            let h = 360 * thi.dataArray[i].map(0, 255, 0, 1);
            thi.ctx.fillStyle = colors[thi.col](h,i,0.15);
            let rad = thi.dataArray[i].map(0, 250, 0, thi.canvas.height / 3);
            thi.ctx.beginPath();
            thi.ctx.arc(circleSize,circleSize,rad, rad, 0, 2 * Math.PI);
            thi.ctx.fill();
        }
        let imgData = thi.ctx.getImageData(0, 0, circleSize * 2, circleSize * 2);
        thi.ctx.fillStyle = bgCol[thi.col];
        thi.ctx.fillRect(0, 0, thi.canvas.width, thi.canvas.height);
        thi.ctx.putImageData(imgData, -circleSize,-circleSize);
        thi.ctx.putImageData(imgData, thi.canvas.width - circleSize,-circleSize);
        thi.ctx.putImageData(imgData, thi.canvas.width - circleSize,thi.canvas.height - circleSize);
        thi.ctx.putImageData(imgData, -circleSize,thi.canvas.height - circleSize);
    },
    function (thi){
        thi.ctx.fillStyle = bgCol[thi.col] + '01';
        thi.ctx.fillRect(0, 0, thi.canvas.width, thi.canvas.height);
        for (let i = 0; i < thi.dataArray.length; i++) {
            let h = 360 * thi.dataArray[i].map(0, 255, 0, 1);
            thi.ctx.fillStyle = colors[thi.col](h,i);
            thi.balls[i].vel.magnitude = thi.dataArray[i].map(0, 255, 0, 10);
            thi.balls[i].rad = thi.dataArray[i].map(0, 255, 0, 10);
            thi.balls[i].updateType3();
            thi.balls[i].draw();
        }
    },
    function (thi) {
        thi.dataF = thi.dataArray.filter((el) => el > 0);
        thi.ctx.fillStyle = bgCol[thi.col];
        thi.ctx.fillRect(0, 0, thi.canvas.width, thi.canvas.height);
        thi.ctx.save();
        thi.ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
        for (let i = 0; i < thi.dataF.length; i++) {
            let h = 360 * thi.dataF[i].map(0, 255, 0, 1);
            thi.ctx.fillStyle = colors[thi.col](h,i);
            thi.ctx.save();
            thi.ctx.rotate(i.map(0, thi.dataF.length, 0, Math.PI * 2));
            let r = thi.dataArray[i].map(0, 255, 0, 10);
            thi.ctx.beginPath();
            thi.ctx.ellipse(0,thi.dataF[i].map(0, 250, 0, thi.canvas.height / 2 - 36),r, r, 0, 0, 2 * Math.PI);
            thi.ctx.fill();
            thi.ctx.restore();
        }
        thi.ctx.restore();
    },
];
// let h = 50 * thi.dataF[i].map(0, thi.analyser.fftSize, 0, 0.8);
            // thi.ctx.fillStyle = `hsl(327.6,100%,${h + 40}%)`;

const colors = [
    (h,i,a) => `hsla(${h},100%,50%,${a||1})`,
    (h,i,a) => `hsla(9,100%,${h.map(0,360,0,50) + 40}%,${a||1})`,
    (h,i,a) => `hsla(${i.map(0,256,0,200)},100%,50%,${a||1})`,
    (h,i,a) => `#d3d3d3` + Number(a ? Math.round(a*255) : 255).toString(16),
    (h,i,a) => `#8a2be2` + Number(a ? Math.round(a*255) : 255).toString(16),
    (h,i,a)=> ['#E70000','#FF8C00','#FFEF00','#00811F','#0044FF','#760089'][i%6],// + Number(a ? Math.round(a*255) : 255).toString(16),
];

const bgCol = [
    '#000000',
    '#000000',
    '#000000',
    '#8a2be2',
    '#d3d3d3',
    '#ffffff',
]

//

//heeft moeite met スミソアエの子守歌 en トキメキ☆ララバイ Fountain of Dreams [Melee]
// N's Castle Medley
// Death Parade OP_ Opening 'Flyers' - BRADIO