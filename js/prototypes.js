function map(val,in_min, in_max, out_min, out_max) {
    return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function setAttributes(obj,attrs) {
    for (let i in attrs){
        obj.setAttribute(i, attrs[i]);
    }
}

function removeExtention(str){
    return str.substring(0, str.lastIndexOf('.'));
}

export {map,setAttributes,removeExtention}