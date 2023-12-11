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


});
