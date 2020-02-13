const Vector = {
    add: function(x,y){
        if(typeof x === "number" && typeof y === "number"){
            this.x += x;
            this.y += y;
        }else if(Vector.isPrototypeOf(x)){
            this.x += x.x;
            this.y += x.y;
        }
        return this;
    },
    sub: function(x,y){
        if(typeof x === "number" && typeof y === "number"){
            this.x -= x;
            this.y -= y;
        }else if(Vector.isPrototypeOf(x)){
            this.x -= x.x;
            this.y -= x.y;
        }
        return this;
    },
    mult: function(x,y){
        if(typeof x === "number" && typeof y === "number"){
            this.x *= x;
            this.y *= y;
        }else if(Vector.isPrototypeOf(x)){
            this.x *= x.x;
            this.y *= x.y;
        }
        return this;
    },
    set: function(x,y){
        if(Vector.isPrototypeOf(x)){
            this.x = x.x;
            this.y = x.y;
        } else {
            this.x = x || 0;
            this.y = y || 0;
        }
        return this;
    },
    limit: function(limit){
        if(this.magnitude > limit) this.magnitude = limit;
        return this;
    },
    copy: function(){
        return newVector(this);
    },
    set direction(direction){
        const magnitude = this.magnitude;
        this.x = Math.cos(direction) * magnitude;
        this.y = Math.sin(direction) * magnitude;
    },
    get direction(){
        return Math.atan2(this.y, this.x);
    },
    set magnitude(magnitude){
        const direction = this.direction; 
        this.x = Math.cos(direction) * magnitude;
        this.y = Math.sin(direction) * magnitude;
    },
    get magnitude(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}

function newVector(x,y){
    const vector = Object.create(Vector);
    if(Vector.isPrototypeOf(x)){
        vector.x = x.x;
        vector.y = x.y;
    } else {
        vector.x = x || 0;
        vector.y = y || 0;
    }

    return vector;
}

function degtoRad(deg){
    return deg * 0.0174532925;
}

export {newVector,degtoRad};