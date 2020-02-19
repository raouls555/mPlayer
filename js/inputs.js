const buttons = {};
const buttonInputEvent = {};

function addButtonInput(key,func){
    buttonInputEvent[key] = func;
    buttons[key] = document.getElementById(key + '_btn');
    buttons[key].addEventListener('click',function(){
        buttonInputEvent[key]();
    });

    return buttons[key];
}

export {addButtonInput};