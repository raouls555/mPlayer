class Vector{
    constructor(x,y) {
        if(x instanceof Vector){
            this.x = x.x;
            this.y = x.y;
        } else {
            this.x = x || 0;
            this.y = y || 0;
        }
    }

    add(x,y){
        if(typeof x === "number" && typeof y === "number"){
            this.x += x;
            this.y += y;
        }else if(x instanceof Vector){
            this.x += x.x;
            this.y += x.y;
        }
        return this;
    }
    sub(x,y){
        if(typeof x === "number" && typeof y === "number"){
            this.x -= x;
            this.y -= y;
        }else if(x instanceof Vector){
            this.x -= x.x;
            this.y -= x.y;
        }
        return this;
    }
    mult(x,y){
        if(typeof x === "number" && typeof y === "number"){
            this.x *= x;
            this.y *= y;
        }else if(x instanceof Vector){
            this.x *= x.x;
            this.y *= x.y;
        }
        return this;
    }
    set(x,y){
        if(x instanceof Vector){
            this.x = x.x;
            this.y = x.y;
        } else {
            this.x = x || 0;
            this.y = y || 0;
        }
        return this;
    }
    limit(limit){
        if(this.magnitude > limit) this.magnitude = limit;
        return this;
    }
    copy(){
        return new Vector(this);
    }
    set direction(direction){
        const magnitude = this.magnitude;
        this.x = Math.cos(direction) * magnitude;
        this.y = Math.sin(direction) * magnitude;
    }
    get direction(){
        return Math.atan2(this.y, this.x);
    }
    set magnitude(magnitude){
        const direction = this.direction; 
        this.x = Math.cos(direction) * magnitude;
        this.y = Math.sin(direction) * magnitude;
    }
    get magnitude(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}