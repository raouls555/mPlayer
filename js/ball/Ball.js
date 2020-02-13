import { newVector } from "./vec.js";
import {map} from "../prototypes.js";

function Ball(c,ctx,rad){
    this.ctx = ctx;
    this.c = c;
    this.rad = rad;
    this.pos = newVector(Math.floor(Math.random() * this.c.width),Math.floor(Math.random() * this.c.height));
    this.vel = newVector();

    this.dir = newVector(1,0);
    this.dir.direction = Math.random() * 360;

    this.friction = newVector();
}

Ball.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.ellipse(this.pos.x,this.pos.y,this.rad, this.rad, 0, 0, 2 * Math.PI);
    this.ctx.fill();
}

Ball.prototype.updateType1 = function(){
    this.vel.direction = this.dir.direction;
    this.pos.add(this.vel);
    this.borders();
}

Ball.prototype.updateType3 = function(){
    this.vel.direction = this.dir.direction;
    this.pos.add(this.vel);
    this.dir.direction = this.dir.direction + map(this.vel.magnitude,0,5,-0.5,0.05);
    this.borders();
}

Ball.prototype.updateType2 = function(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    if(this.pos.y <= -this.rad){
        this.pos.y = this.c.height + this.rad;
        this.pos.x = Math.floor(Math.random() * this.c.width);
    }
}

Ball.prototype.borders = function(){
    if(this.pos.y >= this.c.height - this.rad){
        this.pos.y = this.c.height - this.rad;
        this.dir.y = -this.dir.y;
    } else if(this.pos.y <= this.rad){
        this.pos.y = this.rad;
        this.dir.y = -this.dir.y;
    }
    if(this.pos.x >= this.c.width - this.rad){
        this.pos.x = this.c.width - this.rad;
        this.dir.x = -this.dir.x;
    } else if(this.pos.x <= this.rad){
        this.pos.x = this.rad;
        this.dir.x = -this.dir.x;
    }
}

export {Ball}