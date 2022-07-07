fetch("http://localhost:3000/api/products")//** Récupération de l'API via fetch() **//
.then((res) => res.json())// Renvoi le résultat en JSON
.then((products) => {// Les données JSON sont applées products
    console.log(products);
    productList(products);//Appel de la fonction producList() prenant pour variable products
})
.catch((err) => console.log("Erreur fetch API" + err.message));// En cas d'erreur la console affichera Erreur fetch APi suivi du message d'erreur
//** Fonction productList -> injecte les propriétés des articles de products dans le html **//
function productList(products) {
let articlePlace = document.getElementById('items');// Récupération de l'emplacement html des article
for (let article of products) {// Placement de l'id dans l'URL dans le lien vers la page product.html de l'article // Placement des paramètres de l'article dans le html
    articlePlace.innerHTML += `<a href="./product.html?_id=${article._id}">
    <article>
    <img src="${article.imageUrl}" alt="${article.altTxt}">
    <h3 class="productName">${article.name}</h3>
    <p class="productDescription">${article.description}</p>
    </article>
    </a>`;
}
};