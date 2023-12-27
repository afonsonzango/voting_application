var inputSeachItem = document.getElementById('inputSeachItem');

inputSeachItem.addEventListener('input', function() {
    if(this.value == ''){
        document.getElementById('palet_el').innerHTML = ''
    }else{   
        socket.emit('getWariersBySearch', this.value);
    }
});

socket.on('setResults', function(data_array){
    document.getElementById('palet_el').innerHTML = ''

    data_array.forEach(element => {
        const myHtml = `
            <div class="warier s-warier-item" data-value="${element.id}">
                <div class="photo"><img src="${element.img}" alt=""></div>
                <div class="name">${element.nome}</div>
            </div>
        `

        document.getElementById('palet_el').innerHTML += myHtml

        setWarierItem();
    });

    if(data_array.length == 0){
        const myHtml = `
            <div class="warier no-warier">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-frown" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5"/>
                </svg>
                
                Nada encontrado
            </div>
        `

        document.getElementById('palet_el').innerHTML = myHtml
    }
});

function setWarierItem() {
    document.querySelectorAll('.s-warier-item').forEach(function(element){
        element.addEventListener('click', function(){
            const userID = element.getAttribute('data-value');

            socket.emit('getWarierInformations', userID);
        });
    });
}

socket.on('setUpWarier', function(data){
    setWarierField(data);
});

function setWarierField(data) {
    var wElement = document.querySelectorAll('.w-element');
    var data = data[0];

    if(!wElement[0].querySelector('input').value){
        wElement[0].querySelector('.warierSetUp').value = data.id;
        wElement[0].querySelector('img').src = data.img;
        wElement[0].querySelector('.profile-name').innerHTML = data.nome;
    }else if(!wElement[1].querySelector('input').value){
        wElement[1].querySelector('.warierSetUp').value = data.id;
        wElement[1].querySelector('img').src = data.img;
        wElement[1].querySelector('.profile-name').innerHTML = data.nome;    
        
        document.querySelector('.warier-select').style.display = 'none'
        document.getElementById('formSubmitElement').innerHTML += `
            <input type="submit" value="Criar batalha" class="submit_battle">
        `
        document.getElementById('selectAbleSection').style.display = 'block'
    }

    inputSeachItem.value = ''
    document.getElementById('palet_el').innerHTML = ''
}



//---------------- Enviar dados à DB -----------------//

//Edvitar refresh
document.getElementById('formSubmitElement').addEventListener('submit', function(e) {
    e.preventDefault();

    const warObject = {
        warier1: e.target[1].value,
        warier2: e.target[2].value,
        keySeries1: e.target[3].value,
        keySeries2: e.target[4].value,
        keySeries3: e.target[5].value,
        keySeries4: e.target[6].value,
    }

    document.getElementById('absolute-loader').innerHTML = `
        <div class="spin-ld">
            Spining
        </div>
    `
    socket.emit('setUpNewBattle', warObject);
});

socket.on('removeLoader', function(){

    setTimeout(() => {
        document.getElementById('absolute-loader').innerHTML = `
            <div class="final-ld">
                <div>
                    Batalha criada com sucesso! Clique aqui para visualizar.
                    <br>
                    <a href="" class="btn btn-primary">Ok</a>
                </div>
            </div>
        `
    }, 2000);
});


//------------------ Verificar de há batalhas online -----------------

socket.emit('verfifyActiveBattle');

socket.on('verfifyActiveBattle', function(){
    
});