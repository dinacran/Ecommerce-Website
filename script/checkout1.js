function getId(){
    return Math.floor(Math.random() * 900000000 + 100000000).toString();
}

function showAlert(message) {
    var alertContainer = document.getElementById('custom-alert-container');
    var alert = document.createElement('div');
    alert.className = 'alert alert-warning alert-dismissible fade show';
    alert.role = 'alert';
    alert.innerHTML = `
        ${message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    `;
    alertContainer.appendChild(alert);

    setTimeout(function() {
        alert.classList.remove('show');
        alert.addEventListener('transitionend', function() {
            alert.remove();
        });
    }, 5000);
}

function placeOrder(){
    var address = document.getElementById('address').value.trim();
    var city = document.getElementById('city').value.trim();
    var state = document.getElementById('state').value.trim();
    var zip = document.getElementById('zip').value.trim();

    if(address == "" || city == "" || state == "" || zip == ""){
        showAlert('Please fill in all the details');
        return;
    }

    showAlert(`Order placed successfully with id: ` + getId());
}
