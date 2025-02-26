

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
        var itemPrice = this.querySelector("p");

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

        var price = document.createElement('p');
        price.id = 'item-price';
        price.style.padding = '10px';
        price.innerHTML = itemPrice.innerHTML;
        modalDesc.appendChild(price);


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
                img: modalImg.src,
                price: itemPrice.innerHTML
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            showAlert('Item added to cart');
        }else {
            showAlert('Item already in cart');
        }
        };
        buttonsContainer.appendChild(addToCart);

        var buyNow = document.createElement('button');
        buyNow.classList.add('modal-button');

        buyNow.id = 'buyNow';
        buyNow.onclick = function () {
            window.open('checkout1.html', '_self');
        };
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

