Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

Element.prototype.setAttributes = function (attrs) {
    for (let i in attrs){
        this.setAttribute(i, attrs[i]);
    }
}

function removeExtention(str){
    return str.substring(0, str.lastIndexOf('.'));
}

