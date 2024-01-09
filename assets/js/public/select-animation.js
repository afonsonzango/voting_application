var step1 = document.querySelector('#step-1');
var step2 = document.querySelector('#step-2');

document.getElementById('nextStep').addEventListener('click', function () {
    step1.style.opacity = '0';

    setTimeout(() => {
        step1.style.display = 'none';
        step2.style.display = 'block';
    }, 400);

    setTimeout(() => {
        step2.style.opacity = '1';
    }, 600);
});


//------- Setting up the new vote from the user -------//

function captTheVote(element) {
    const warierId = element.querySelector('.warierPerson').value;
    const key_dom_id = document.getElementById('key_dom_id').value;
    const battle_id = document.getElementById('battle_id').value;

    const objectForVote = {
        warierId,
        key_dom_id,
        battle_id
    }

    socket.emit('setUpVote', objectForVote);
}

socket.on('voteSettedTo', function () {
    document.querySelector('.center-copper').style.opacity = '0';
    
    setTimeout(() => {
        const html = `
            <div class="lest-notive">
                <div class="title mb-3">
                    Obrigado!!!
                </div>
                <div class="desc mb-4">
                    Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Quibusdam ullam 
                    aspernatur iure rerum sit alias officia 
                </div>
                <div class="action">
                    <a href="/">Ok</a>
                </div>
            </div>
        `

        document.querySelector('.center-copper').innerHTML = html
        document.querySelector('.center-copper').style.opacity = '1';
    }, 400);
});