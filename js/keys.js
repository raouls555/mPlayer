const map = {};
const kDown = {};
const kFunctions = [];
document.addEventListener('keydown',function(e){
    if(!map[e.key]){
        if(kDown[e.key]){
            kDown[e.key](e.key);
        } else {
            for (let i = kFunctions.length - 1; 0 <= i; i--){
                if(kFunctions[i].function(e.key)) kFunctions[i].kDown(e.key);
            }
        }
    }
    map[e.key] = true;
});
document.addEventListener('keyup',function(e){
    map[e.key] = false;
});

function keydown(key,func){
    if(typeof key === 'string'){
        kDown[key] = func;
    } else if (typeof key === "function"){
        kFunctions.push({
            function: key,
            kDown: func
        });
    } else {
        for (let i = key.length - 1; i >= 0; i--){
            kDown[key[i]] = func;
        }
    }
}

function ingoreDefaultBehaviorOfKeys(keys){
    document.onkeydown = function(e){
        for(let i = keys.length - 1; i >= 0; i--){
            if(keys[i] === e.key) return false;
        }
    }
}

export {keydown,map,ingoreDefaultBehaviorOfKeys};