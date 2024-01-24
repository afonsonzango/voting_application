var upperBar2 = document.getElementById('upperBar2');
var upperBar1 = document.getElementById('upperBar1');
var warier1 = document.getElementById('warier1');
var warier2 = document.getElementById('warier2');

socket.on('voteSettedTo', function (data){
    document.querySelectorAll('.voteSetter').forEach(function(element){
        const data_id = element.getAttribute('data-id')
        
        if(data.warierId == data_id){
            const xt = parseInt(element.value) + 1;
            element.value = xt;
            
            refreshChart(warier1, upperBar1);
            refreshChart(warier2, upperBar2);
        }
    });
});

function refreshChart(inputField, warier) {
    const i_value = inputField.value;
    warier.style.height = i_value*10+'px'
}

setTimeout(() => {
    refreshChart(warier1, upperBar1);
    refreshChart(warier2, upperBar2);
}, 1000);


//End the votation
var dataEndVotation = document.querySelector('[data-end-votation]');

//Send the sock to finish in back end
dataEndVotation.addEventListener('click', () => {
    socket.emit("endvotation");
});

//Receive the confirmation of the end of the process
socket.on('battlefinished', (data) => {
    changestatus(data)
});
//End the votation


const changestatus = (data) => {
    var current = document.querySelector('.votes-controllers');
    var setup = document.querySelector('.aftervote');

    document.querySelector('[data-bs-dismiss="modal"]').click();
    current.remove();

    if(data.forWr1 > data.forWr2) {
        document.querySelector('[data-person1]').classList.add("winner");
    } else if (data.forWr2 > data.forWr1) {
        document.querySelector('[data-person2]').classList.add("winner");
    } else {
    }

    document.querySelector('[data-voted1]').innerText = data.forWr1 
    document.querySelector('[data-voted2]').innerText = data.forWr2

    setup.style.display = "flex"
}