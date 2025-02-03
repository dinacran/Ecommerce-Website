function initMap() {
    var russia = { lat: 3.51602, lng: -2.1969 };
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 20, center: russia });
    var marker = new google.maps.Marker({ position: russia, map: map });
}


var MenuItems = document.getElementById("menu-items");

MenuItems.style.maxHeight = "0px";

function menutoggle() {
    if (MenuItems.style.maxHeight == "0") {
        MenuItems.style.maxHeight = "200px";
    } else {
        MenuItems.style.maxHeight = "0px";
    }
}

var col4s = document.querySelectorAll(".col-4");

col4s.forEach(function (col4) {
    col4.addEventListener("click", function () {
        var img = this.querySelector('img');
        var desc = this.getAttribute("desc");

        var modal = document.createElement('div');
        modal.id = 'myModal';
        modal.style.display = 'block';
        modal.style.position = 'fixed';
        modal.style.zIndex = '1';
        modal.style.left = '0';
        modal.style.top = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.overflow = 'hidden';
        modal.style.backgroundColor = 'rgba(0,0,0,0.4)';

        var modalContent = document.createElement('div');
        modalContent.style.display = 'grid';
        modalContent.style.gridTemplateColumns = '1fr 1fr 1fr';
        modalContent.style.position = 'relative';
        modalContent.style.backgroundColor = '#fefefe';
        modalContent.style.margin = '10% auto';
        modalContent.style.padding = '20px';
        modalContent.style.border = '1px solid #888';
        modalContent.style.width = '80%';
        modalContent.style.height = '550px';
        modalContent.style.borderRadius = '10px';
        modalContent.className = 'modal-content';

        var imageContainer = document.createElement('span');
        imageContainer.className = 'image-container';
        imageContainer.style.display = 'inline';
        imageContainer.style.vericalAlign = 'middle';
        imageContainer.style.maxWidth = 'fit-content';
        modalContent.appendChild(imageContainer);

        var modalImg = document.createElement('img');
        modalImg.id = 'modalImg';
        modalImg.src = img.src;
        modalImg.style.maxHeight = '500px';
        modalImg.style.maxWidth = '500px';
        imageContainer.appendChild(modalImg);

        var modalDesc = document.createElement('span');
        modalDesc.id = 'modalDesc';
        modalContent.appendChild(modalDesc);

        var title = document.createElement('h2');
        title.id = 'item-title';
        title.style.padding = '10px';
        title.innerHTML = this.querySelector('h5').innerHTML;
        modalDesc.appendChild(title);

        var descContent = document.createElement('p');
        descContent.id = 'item-desc';
        descContent.style.padding = '10px';
        descContent.style.color = 'black';
        descContent.innerHTML = desc;
        modalDesc.appendChild(descContent);


        var buttonsContainer = document.createElement('span');
        buttonsContainer.style.display = 'flex';
        buttonsContainer.style.flexDirection = 'column';
        buttonsContainer.style.alignItems = 'center';
        buttonsContainer.style.gap = '30px';
        buttonsContainer.style.marginTop = '30%';
        buttonsContainer.id = 'buttons-container';

        var addToCart = document.createElement('button');
        addToCart.classList.add('modal-button');
        addToCart.innerHTML = 'Add to cart';
        addToCart.id = 'addToCart';
        addToCart.onclick = function () {
            var cart = JSON.parse(localStorage.getItem('cart'));
            if (cart == null) {
                cart = [];
            }

            var itemAlreadyInCart = cart.find(function (item) {
                return item.name === title.innerHTML && item.desc === descContent.innerHTML && item.img === modalImg.src;
            });

            if (itemAlreadyInCart === undefined) {
            cart.push({
                name: title.innerHTML,
                desc: descContent.innerHTML,
                img: modalImg.src
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Item added to cart');
        }else {
            alert('Item already in cart');
        }
        };
        buttonsContainer.appendChild(addToCart);

        var buyNow = document.createElement('button');
        buyNow.classList.add('modal-button');

        buyNow.id = 'buyNow';
        buyNow.innerHTML = 'Buy Now';
        buttonsContainer.appendChild(buyNow);

        modalContent.appendChild(buttonsContainer);

        modal.appendChild(modalContent);

        document.body.appendChild(modal);

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.remove();
            }
        };
    });
});

var cart = document.getElementById('cart');

cart.addEventListener('click', function () {

    var cartModal = document.createElement('div');
    cartModal.id = 'myModal';
    cartModal.style.display = 'block';
    cartModal.style.position = 'fixed';
    cartModal.style.zIndex = '1';
    cartModal.style.left = '0';
    cartModal.style.top = '0';
    cartModal.style.width = '100%';
    cartModal.style.height = '100%';
    cartModal.style.backgroundColor = 'rgba(0,0,0,0.4)';

    var cartModalContent = document.createElement('div');
    cartModalContent.style.display = 'grid';
    cartModalContent.style.gridTemplateColumns = '1fr 1fr 1fr';
    cartModalContent.style.position = 'relative';
    cartModalContent.style.backgroundColor = '#fefefe';
    cartModalContent.style.margin = '10% auto';
    cartModalContent.style.padding = '20px';
    cartModalContent.style.border = '1px solid #888';
    cartModalContent.style.width = '80%';
    cartModalContent.style.height = '700px';
    cartModalContent.style.overflow = 'scroll';

    cartModalContent.style.borderRadius = '10px';
    cartModalContent.className = 'modal-content';

    var cartItems = JSON.parse(localStorage.getItem('cart'));

    cartItems.forEach(function (item) {
        var cartItem = document.createElement('div');
        cartItem.style.display = 'flex';
        cartItem.style.justifyContent = 'space-between';
        cartItem.style.padding = '10px';
        cartItem.style.border = '1px solid black';

        var cartItemRemove = document.createElement('span');
        cartItemRemove.innerHTML = 'Remove';
        cartItemRemove.style.backgroundColor = 'red';
        cartItemRemove.style.color = 'white';
        cartItemRemove.style.padding = '5px';
        cartItemRemove.style.borderRadius = '5px';
        cartItemRemove.style.border = 'none';
        cartItemRemove.style.height = '35px';

        var cartItemImg = document.createElement('img');
        cartItemImg.src = item.img;
        cartItemImg.style.maxHeight = '100px';
        cartItemImg.style.maxWidth = '100px';
        cartItem.appendChild(cartItemImg);

        var cartItemDesc = document.createElement('div');
        cartItemDesc.style.display = 'flex';
        cartItemDesc.style.flexDirection = 'column';
        cartItemDesc.style.justifyContent = 'space-between';

        var cartItemTitle = document.createElement('h2');
        cartItemTitle.style.fontSize = '20px';
        cartItemTitle.innerHTML = item.name;
        cartItemDesc.appendChild(cartItemTitle);

        var cartItemDescContent = document.createElement('p');
        cartItemDescContent.innerHTML = item.desc;
        cartItemDesc.appendChild(cartItemDescContent);

        var cartItemPrice = document.createElement('p');
        cartItemPrice.innerHTML = 'Rs. 1000';
        cartItemDesc.appendChild(cartItemPrice);

        cartItem.appendChild(cartItemDesc);

        cartItem.appendChild(cartItemRemove);

        cartModalContent.appendChild(cartItem);

        cartItemRemove.onclick = function () {
            var cart = JSON.parse(localStorage.getItem('cart'));
            cart = cart.filter(function (cartItem) {
                return cartItem.name !== item.name && cartItem.desc !== item.desc && cartItem.img !== item.img;
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            cartModalContent.removeChild(cartItem);
        };
    });
    cartModal.appendChild(cartModalContent);

    var buttonContainer = document.createElement('span');
    buttonContainer.style.display = 'block';
    buttonContainer.style.justifyContent = 'space-between';
    buttonContainer.style.padding = '10px';
    buttonContainer.style.height = '30px';
    buttonContainer.style.float = 'right';

    buttonContainer.style.justifyContent = 'flex-end';

    var buyNow = document.createElement('button');
    buyNow.classList.add('modal-button');
    buyNow.id = 'buyNow';
    buyNow.innerHTML = 'Buy Now';
    buttonContainer.appendChild(buyNow);
    cartModalContent.appendChild(buttonContainer);

    buyNow.onclick = function () {

    };
    document.body.appendChild(cartModal);

    window.onclick = function(event) {
        if (event.target == cartModal) {
            cartModal.remove();
        }
    };


});