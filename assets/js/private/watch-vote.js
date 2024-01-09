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