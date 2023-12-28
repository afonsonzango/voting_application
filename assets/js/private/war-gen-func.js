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

socket.on('battleStatusResponse', function(battle){
    if(battle.length == 1) {
        document.getElementById('setBattleButtonActivity').innerHTML = `
            <div class="btn-group">
                <a href="" data-bs-toggle="dropdown" aria-expanded="false" class="black-activity-button">
                    <svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve">
                        <path class="linesandangles_een" d="M28.414,24l-3-3l2.293-2.293l-1.414-1.414l-2.236,2.236l-3.588-4.186L25,11.46V6h-5.46L16,10.13
                        L12.46,6H7v5.46l4.531,3.884l-3.588,4.186l-2.236-2.236l-1.414,1.414L6.586,21l-3,3L7,27.414l3-3l2.293,2.293l1.414-1.414
                        l-2.237-2.237L16,19.174l4.53,3.882l-2.237,2.237l1.414,1.414L22,24.414l3,3L28.414,24z M6.414,24L8,22.414L8.586,23L7,24.586
                        L6.414,24z M9,10.54V8h2.54l3.143,3.667l-1.85,2.159L9,10.54z M20.46,8H23v2.54L10.053,21.638l-0.69-0.69L20.46,8z M18.95,16.645
                        l3.688,4.302l-0.69,0.69l-4.411-3.781L18.95,16.645z M25,24.586L23.414,23L24,22.414L25.586,24L25,24.586z" />
                    </svg>

                    Gladiadores
                </a>
            </div>
        `
    }
});