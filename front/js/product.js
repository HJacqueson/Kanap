const searchParams = new URLSearchParams(document.location.search);
const id = searchParams.get("_id");
console.log(id);

fetch
("http://localhost:3000/api/products")
.then((res) => res.json())
.then((products) => {
    console.log(products);
    productList(products);
})
.catch((err) => console.log("Erreur fetch API" + err.message));

let srcAlt = document.querySelector('.item__img');
let title = document.getElementById('title');
let price = document.getElementById('price');
let description = document.getElementById('description');
let colorOption = document.querySelector('#colors');

function productList(products) {
    for (let article of products) {
        if (id === article._id) {
            srcAlt.innerHTML = `<img src="${article.imageUrl}" alt="${article.altTxt}">`;
            title.textContent = `${article.name}`;
            price.textContent = `${article.price}`;
            description.textContent = `${article.description}`;
            for (color of article.colors) {
                colorOption.innerHTML += `<option value="${color}">${color}</option>`;
            }
        }
    }
};

let addCart = {};
addCart._id = id;
console.log(addCart);

colorOption.addEventListener("input", e => {
    let productColor; 
    productColor = e.target.value;
    console.log('input');
    addCart.color = productColor;
    console.log(addCart);
});

let quantityPriceChoice = document.querySelector("input#quantity");

quantityPriceChoice.addEventListener("input", e => {
    let productQuantity;
    productQuantity = e.target.value;
    addCart.quantity = productQuantity;
    console.log(addCart);
    let priceChoice =  document.getElementById("price").textContent;
    productPrice = parseInt(priceChoice) * parseInt(productQuantity);
    addCart.price = productPrice;
    console.log (addCart);
});

const productChoice = document.getElementById('addToCart');

productChoice.addEventListener("click", () => {
    if (addCart.quantity < 1 || 
        addCart.quantity > 100 || 
        addCart.color === undefined || 
        addCart.color === "--SVP, choisissez une couleur --" || 
        addCart.quantity === undefined) {
        alert('Attention ! Vous devez selectionnez une couleur et une quantité comprises entre 1 et 100 pour tout ajout au panier.');
    }
    else {
        alert('Produit Ajouté !');
        productChoice.textContent = 'Produit Ajouté';
       addToCart();
    }
    console.log(addCart);
    console.log(cart);
    
});

function addToCart() {
    let cart = getCart();
    console.log(cart);
    let registerProduct = cart.find(cart => cart._id === id && cart.color === addCart.color);
    if (registerProduct != undefined) {
        addCart.quantity = parseInt(registerProduct.quantity) + parseInt(addCart.quantity);
        addCart.price = parseInt(registerProduct.price) + parseInt(addCart.price);
        let indexProduct = cart.indexOf(registerProduct);
        console.log(indexProduct);
        if (indexProduct !== -1) {
            cart.splice(indexProduct, 1);
        }
    }
    let imgChoice =  document.querySelector('.item__img > img').src;
    addCart.img = imgChoice;
    let nameChoice = document.getElementById('title').textContent;
    addCart.name = nameChoice;
    cart.push(addCart);
    localStorage.cart = JSON.stringify(cart);
    location.reload(true);
}

function getCart() {

    let cart = localStorage.getItem('cart');
    if (cart === null) {
        return [];
    } 
    else {
        console.log(cart)
        return JSON.parse(cart);
    }
}