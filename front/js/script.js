fetch("http://localhost:3000/api/products")
.then((res) => res.json())
.then((products) => {
    console.log(products);
    productList(products);
})
.catch((err) => console.log("Erreur fetch API" + err.message));

function productList(products) {
let articlePlace = document.getElementById('items');
for (let article of products) {
    articlePlace.innerHTML += `<a href="./product.html?_id=${article._id}">
    <article>
    <img src="${article.imageUrl}" alt="${article.altTxt}">
    <h3 class="productName">${article.name}</h3>
    <p class="productDescription">${article.description}</p>
    </article>
    </a>`;
}
};