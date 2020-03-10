function map(val,in_min, in_max, out_min, out_max) {
    return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function removeExtention(str){
    return str.substring(0, str.lastIndexOf('.'));
}

export {map,removeExtention}