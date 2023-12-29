var step1 = document.querySelector('#step-1');
var step2 = document.querySelector('#step-2');

document.getElementById('nextStep').addEventListener('click', function(){
    step1.style.opacity = '0';
    
    setTimeout(() => {
        step1.style.display = 'none';
        step2.style.display = 'block';    
    }, 400);
    
    setTimeout(() => {
        step2.style.opacity = '1';
    }, 600);
});