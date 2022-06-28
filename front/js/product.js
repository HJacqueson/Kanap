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
.catch((err) => console.log("Erreur fetch API"));

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
let cart = [addCart];
addCart._id = id;
console.log(addCart);

colorOption.addEventListener("input", e => {
    let productColor; 
    productColor = e.target.value;
    console.log('input');
    addCart.color = productColor;
    console.log(addCart);
});

let quantityChoice = document.querySelector("input#quantity");

quantityChoice.addEventListener("input", e => {
    let productQuantity;
    productQuantity = e.target.value;
    addCart.quantity = productQuantity;
    console.log(addCart);
});

const productChoice = document.getElementById('addToCart');

productChoice.addEventListener("click", () => {
    if (addCart.quantity < 1 || 
        addCart.quantity > 100 || 
        addCart.color === undefined || 
        addCart.color === "--SVP, choisissez une couleur --" || 
        addCart.quantity === undefined) {
        alert('Attention ! Vous devez selectionnez une couler et une quantité comprise entre 1 et 100 pour tout ajout au panier.');
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
        let indexProduct = cart.indexOf(registerProduct);
        console.log(indexProduct);
        if (indexProduct !== -1) {
            cart.splice(indexProduct, 1);
        }
        cart.push(addCart);
    }
    else {
        cart.push(addCart);
        console.log(cart);
        
    }
    localStorage.cart = JSON.stringify(cart);
}

function getCart() {

    let cart = localStorage.getItem("cart");
    if (cart === null) {
        return [];
    } 
    else {
        console.log(cart)
        return JSON.parse(cart);
    }
}