const socket = io();

var btn_down = document.getElementById('btn-down');
var btn_up = document.getElementById('btn-up');
var actualValue = document.getElementById('actualValue');

function funcValue(up_or_down) {
    var inpValue = parseInt(actualValue.value);

    if(up_or_down === 'up'){
        actualValue.value = inpValue + 1
    }else{
        actualValue.value = inpValue - 1
    }
}


var genKeysForm = document.getElementById('genKeysForm');

var vactualTxt = document.getElementById('actual-txt');
var loader = document.getElementById('loader');

genKeysForm.addEventListener('submit', function(e){
    e.preventDefault();

    vactualTxt.style.display = 'none'
    loader.style.display = 'block'

    const gen_key_limit = e.target.actualValue.value;

    socket.emit('gen_key_limit', gen_key_limit);
    document.querySelector('#alertGenKey').innerHTML = `
        <div class="alert alert-primary">Aguarde... Isso pode levar algum tempo...</div>
    `
});

socket.on('erroGenNum', function(data){
    vactualTxt.style.display = 'block'
    loader.style.display = 'none'
    document.querySelector('#alertGenKey').innerHTML = `
        <div class="alert alert-danger">${data}</div>
    `
});

socket.on('done', function(){
    vactualTxt.style.display = 'block';
    loader.style.display = 'none';
    document.querySelector('#alertGenKey').innerHTML = ``;
    document.querySelector('#actualValue').value = `0`;
    document.querySelector('#dismis_btn').click();
});