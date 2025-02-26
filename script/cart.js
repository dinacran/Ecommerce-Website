var cartItems = JSON.parse(localStorage.getItem('cart'));
var cartTable = document.getElementById('cart-table');

    if (!cartItems || cartItems.length == 0) {
        var emptyCart = document.createElement('p');
        emptyCart.classList.add('empty-cart');
        emptyCart.style.textAlign = 'center';
        emptyCart.style.color = 'gray';
        emptyCart.style.fontStyle = 'italic';
        
        emptyCart.innerHTML = 'Nothing to show here &#128579;. Add items to your cart by clicking on the "Add to Cart" button on the product page.';
        document.getElementById('container').appendChild(emptyCart);
        document.getElementById('cart-table').style.display = 'none';
        document.getElementById('buy-now-btn').style.display = 'none';
    }
    cartItems.forEach(function (item) {

        var cartRow = document.createElement('tr');
        cartRow.style.borderRadius = '25px';
        cartRow.style.boxShadow = '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)';
        cartRow.style.maxWidth = 'fit-content';

        var cartItemImg = document.createElement('td');
        cartItemImg.id = 'img-container';
        var cartImg = document.createElement('img');
        cartImg.classList.add('cart-item-image');
        cartImg.src = item.img;
        cartItemImg.appendChild(cartImg);
        cartRow.appendChild(cartItemImg);

        var iteminfo = document.createElement('td');
        iteminfo.id= 'info-container';

        var details = document.createElement('div');

        details.classList.add('details');

        var cartItemName = document.createElement('h3');
        cartItemName.classList.add('cart-item-name');
        cartItemName.innerHTML = item.name;
        details.appendChild(cartItemName);

        var cartItemDesc = document.createElement('p');
        cartItemDesc.classList.add('cart-item-desc');
        cartItemDesc.innerHTML = item.desc;
        details.appendChild(cartItemDesc);

        var cartItemPrice = document.createElement('p');
        cartItemPrice.classList.add('cart-item-price');
        cartItemPrice.innerHTML = item.price;
        details.appendChild(cartItemPrice);

        var removeButton = document.createElement('span');
        removeButton.innerHTML = '―';
        removeButton.classList.add('remove-button');

        var endContainer = document.createElement('td');

        endContainer.id = 'end-container';


        removeButton.addEventListener('click', function () {
            var cartItems = JSON.parse(localStorage.getItem('cart'));
            var updatedCartItems = cartItems.filter(function (cartItem) {
                return cartItem.name !== item.name;
            });
            localStorage.setItem('cart', JSON.stringify(updatedCartItems));
            cartTable.removeChild(cartRow);
        });

        endContainer.appendChild(removeButton);
        

        iteminfo.appendChild(details);

        cartRow.appendChild(iteminfo);

        cartRow.appendChild(endContainer);

        cartTable.appendChild(cartRow);

    });

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
    