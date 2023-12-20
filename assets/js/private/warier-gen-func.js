var warier_gen_form = document.getElementById('warier-gen-form');
var alertValueInserting = document.getElementById('alert-value-inserting');

function setPrevireImage(imageInput) {
    console.log(imageInput);

    if (imageInput) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const imageUrl = e.target.result;
            document.getElementById('imageCopper').src = imageUrl
        };

        reader.readAsDataURL(imageInput);
    } else {
        console.log('No file selected.');
    }
}

warier_gen_form.addEventListener('submit', function (e) {
    e.preventDefault();

    const warierComponents = {
        image: e.target.imgWarier.files,
        name: e.target.warierName.value
    }

    socket.emit('setUpWarier', warierComponents.image[0], warierComponents.name);
    warier_gen_form.style.display = 'none'

    alertValueInserting.innerHTML = `
        <div class="alert alert-primary">
            Inserindo gladiador <b>${document.querySelector('#warierName').value}</b>
        </div>
    `
});

socket.on('warierInserted', function () {
    alertValueInserting.innerHTML = `
        <div class="alert alert-primary">
            <b>${document.querySelector('#warierName').value}</b> Inserido com sucesso!
        </div>
    `
    warier_gen_form.style.display = 'block'
    document.getElementById('imgWarier').value = null
    document.getElementById('warierName').value = ''
    document.getElementById('imageCopper').src = ''

    document.querySelector('#refreshing').innerHTML = `
        <a href="/dashboard/arquive-waries" class="btn btn-primary">Porfavor, reinicie a página</a>
    `
});

function deleteWarier(value) {
    socket.emit('deleteWarier', value.value);
}

socket.on('userDeleted', function (data) {
    console.log(data);
    removeDOMItem(data.data);
});

function removeDOMItem(id) {
    var allElementsRow = document.querySelectorAll('.warier-rep-item');

    allElementsRow.forEach(element => {
        const atb_t = element.getAttribute('data-id');

        if (atb_t == id) {
            element.remove();

            var verifyLength = document.querySelectorAll('.warier-rep-item');

            if (verifyLength.length == 0) {
                document.querySelector('.page-content').innerHTML = `
                    <div id="refreshing"></div>
                    
                    <div class="alert alert-primary">
                        Nenhum galdiador registrado.
                    </div>
                `
            }
        }
    });
}