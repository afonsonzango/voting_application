var inputSeachItem = document.getElementById('inputSeachItem');

inputSeachItem.addEventListener('input', function () {
    if (this.value == '') {
        document.getElementById('palet_el').innerHTML = ''
    } else {
        socket.emit('getWariersBySearch', this.value);
    }
});

socket.on('setResults', function (data_array) {
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

    if (data_array.length == 0) {
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
    document.querySelectorAll('.s-warier-item').forEach(function (element) {
        element.addEventListener('click', function () {
            const userID = element.getAttribute('data-value');

            socket.emit('getWarierInformations', userID);
        });
    });
}

socket.on('setUpWarier', function (data) {
    setWarierField(data);
});

function setWarierField(data) {
    var wElement = document.querySelectorAll('.w-element');
    var data = data[0];

    if (!wElement[0].querySelector('input').value) {
        wElement[0].querySelector('.warierSetUp').value = data.id;
        wElement[0].querySelector('img').src = data.img;
        wElement[0].querySelector('.profile-name').innerHTML = data.nome;
    } else if (!wElement[1].querySelector('input').value) {
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
document.getElementById('formSubmitElement').addEventListener('submit', function (e) {
    e.preventDefault();

    // Obter todos os elementos de select
    var selects = document.querySelectorAll('[data-select]');

    // Array para armazenar os valores dos selects
    var values = [];

    // Flag para verificar se há algum valor duplicado
    var hasDuplicates = false;

    // Percorrer os selects
    selects.forEach((select, index) => {
        // Obter o valor do select atual
        var value = select.value;

        // Verificar se o valor já está presente no array, permitindo valores vazios
        if (values.includes(value) && value !== "") {
            hasDuplicates = true;
            // Adicionar uma lógica para lidar com a duplicata, se necessário
            // Por exemplo, exibir uma mensagem de erro ou impedir o envio do formulário
            console.log('Duplicata encontrada: ' + value);
        } else {
            // Adicionar o valor ao array
            values.push(value);
        }

        // Se for o primeiro select e estiver vazio
        if (index === 0 && value === "") {
            hasDuplicates = true;
            // Adicionar uma lógica para lidar com o primeiro select vazio, se necessário
            // Por exemplo, exibir uma mensagem de erro ou impedir o envio do formulário
            console.log('O primeiro select não pode ser vazio.');
        }
    });

    // Se não houver duplicatas, você pode prosseguir com o envio do formulário
    if (!hasDuplicates) {
        // Lógica para enviar o formulário ou realizar outras ações
        console.log('Formulário enviado com sucesso!');
        const warObject = {
            warier1: e.target[1].value,
            warier2: e.target[2].value,
            keySeries1: e.target[3].value,
            keySeries2: e.target[4].value,
            keySeries3: e.target[5].value,
            keySeries4: e.target[6].value,
        }
    
        document.getElementById('absolute-loader').innerHTML = `
            <div class="spin-ld"></div>
        `
        socket.emit('setUpNewBattle', warObject);
        // document.querySelector("#formSubmitElement").submit(); // Se desejar enviar o formulário automaticamente
    } else {
        // Exibir um alerta informando que o formulário não está bom
        alert('O formulário não está válido. Verifique os selects.');
    }
});

socket.on('removeLoader', function () {

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

socket.on('battleStatusResponse', function (battle) {
    if (battle.length == 1) {
        document.getElementById('setBattleButtonActivity').innerHTML = `
            <div class="btn-group">
                <a href="/dashboard/arquive-votation/watch" class="black-activity-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-line" viewBox="0 0 16 16">
                        <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1zm1 12h2V2h-2zm-3 0V7H7v7zm-5 0v-3H2v3z"/>
                    </svg>

                    Votação em curso
                </a>
            </div>
        `
    }
});