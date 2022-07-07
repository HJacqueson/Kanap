const searchParams = new URLSearchParams(document.location.search);// Constante de fonction de recherche de paramètres dans l'URL
const id = searchParams.get("_id");// Constante de récupération de l'id dans l'URL
console.log(id);
//** Récupération de l'API via fetch() **//
fetch
("http://localhost:3000/api/products")
.then((res) => res.json())// Renvoi le résultat en JSON
.then((products) => { // Les données JSON sont applées products
    console.log(products);
    productList(products);// Appel de la fonction producList() prenant pour variable products
})
.catch((err) => console.log("Erreur fetch API" + err.message));// En cas d'erreur la console affichera Erreur fetch APi suivi du message d'erreur
//** Variables de selection d'emplacements des propriétés des products dans le html **//
let srcAlt = document.querySelector('.item__img');
let title = document.getElementById('title');
let price = document.getElementById('price');
let description = document.getElementById('description');
let colorOption = document.querySelector('#colors');
//** Fonction productList -> insère les propriétés des articles de products dans le html **//
function productList(products) {
    for (let article of products) {
        if (id === article._id) {
            srcAlt.innerHTML = `<img src="${article.imageUrl}" alt="${article.altTxt}">`;//Image et texte alternatif de l'article
            title.textContent = `${article.name}`;// Nom de l'article
            price.textContent = `${article.price}`;// Prix de l'article
            description.textContent = `${article.description}`;
            for (color of article.colors) {// Boucle pour afficher les différentes couleurs au choix 
                colorOption.innerHTML += `<option value="${color}">${color}</option>`;
            }
        }
    }
};

let article = {};// Déclaration de l'objet article
article._id = id;// insertion de l'id dans l'article
console.log(article);
//** Écoute de l'évènement de choix de couleurs **//
colorOption.addEventListener("input", e => {
    let productColor; 
    productColor = e.target.value; // Attribut la valeur de l'input à la variable productColor
    article.color = productColor; // Attribut la valeur productColor à la propriété color de l'article
    console.log(article);
});

let quantityPriceChoice = document.querySelector("input#quantity");// Sélection d'emplacement du choix de quantité
//** Écoute de l'évènement de choix de quantité **//
quantityPriceChoice.addEventListener("input", e => {
    let productQuantity;
    productQuantity = e.target.value;// Attribut la valeur de l'input à la variable productQuantity
    article.quantity = productQuantity;// Attribut la valeur productQuantity à la propriété quantity de l'article
    console.log(article);
    let priceChoice =  document.getElementById("price").textContent;// Prend pour valeur le prix en texte de la balise html ayant pour id price
    productPrice = parseInt(priceChoice) * parseInt(productQuantity);// Multiplie le prix du produit par sa quantité
    article.price = productPrice;// Attribut la valeur productPrice à la propriété price de l'article
    console.log (article);
});

const productChoice = document.getElementById('addToCart'); // Sélection de l'emplacement de la balise ayant pour id addToCart 
//** Écoute de l'évènement click de choix d'article **//
productChoice.addEventListener("click", () => {
    if (article.quantity < 1 || // Conditions de message d'alerte
        article.quantity > 100 || 
        article.color === undefined || 
        article.color === "--SVP, choisissez une couleur --" || 
        article.quantity === undefined) {
        alert('Attention ! Vous devez selectionnez une couleur et une quantité comprises entre 1 et 100 pour tout ajout au panier.');
    }
    else {
        alert('Produit Ajouté !');
        productChoice.textContent = 'Produit Ajouté';
       addToCart();// Appel de la fonction addToCart()
    } 
});
//** Fonction addToCart qui ajoute un article au panier (cart) **//
function addToCart() {
    let cart = getCart();// Appel de la fonction getCart()
    console.log(cart);
    let registerProduct = cart.find(cart => cart._id === id && cart.color === article.color);// Recherche d'un article similaire dans le panier (cart)
    if (registerProduct != undefined) { // Condition de présence d'un article similaire dans le panier (cart)
        article.quantity = parseInt(registerProduct.quantity) + parseInt(article.quantity);// Ajout de la nouvelle quantité à la quantité initiale de l'article
        console.log(article.quantity);
        article.price = parseInt(registerProduct.price) + parseInt(article.price);// Ajout du nouveau prix au prix initial de l'article
        console.log(article.price);
        let indexProduct = cart.indexOf(registerProduct);// Récupération de l'index de l'article initial dans le panier (cart)
        console.log(indexProduct);
        if (indexProduct !== -1) {
            cart.splice(indexProduct, 1);// Suppression de l'article initial du panier (cart)
            console.log(cart);
        }
    }
    let imgChoice =  document.querySelector('.item__img > img').src;// Récuperation de l'image du produit
    article.img = imgChoice;// Ajout de l'image à l'article du panier (cart)
    let nameChoice = document.getElementById('title').textContent; // Récupération du titre du produit
    article.name = nameChoice;// Ajout du titre à l'article du panier (cart)
    cart.push(article);// Article poussé dans le panier (cart)
    localStorage.cart = JSON.stringify(cart);// Enregistrement de l'article dans le localStorage du tableau JSON panier (cart)
    console.log(cart);
    location.reload(true);// Rechargement de la page
}
//** Fonction getCart qui récupère le panier (cart) dans le localStorage **//
function getCart() {
    let cart = localStorage.getItem('cart');// Récupération du panier (cart) dans le localStorage
    if (cart === null) {
        return [];// Création d'un panier sous forme de tableau si panier (cart) inexistant 
    } 
    else {
        return JSON.parse(cart);// Récupération du panier (cart) sous forme de tableau JSON
    }
}