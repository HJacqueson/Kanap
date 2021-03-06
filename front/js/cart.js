fetch
("http://localhost:3000/api/products")
.then((res) => res.json())// Renvoi le résultat en JSON
.then((products) => {// Les données JSON sont applées products
    console.log(products);
    fillCart(products);// Appel de la fonction fillCart() prenant pour variable products
})
.catch((err) => console.log("Erreur fetch API" + err.message));

//** Variables de selection d'emplacements des paramètres des articles dans le html et initialisation des totaux **//
let articlePlace = document.getElementById("cart__items");
let totalPrice = document.getElementById("totalPrice");
let totalQuantity = document.getElementById("totalQuantity");
let totalPriceProducts = 0;
let totalQuantityProducts = 0;
//** Fonction fillCart de remplissage de panier (cart) **//
function fillCart(products) {
    const cart = getCart();// Appel de la fonction getCart() de récupération du panier
    console.log(cart);
    if (cart.length != 0) {
        for (let article of cart) {
            for (let i = 0, l = products.length; i < l; i++) {// Boucle de parcours de l'API pour trouver la correspondance entre id du panier et de l'article
                if(article._id === products[i]._id) {
                    article.price = products[i].price;// Attribut le prix du product de l'API correspondant, au prix de l'article //ci-dessous, Placement des propriétés de l'article dans le html
                    console.log(article);
                    articlePlace.innerHTML += `<article class="cart__item" data-id="${article._id}" data-color="${article.color}">
                    <div class="cart__item__img">
                      <img src="${article.img}" alt="Photographie d'un canapé">
                    </div>
                    <div class="cart__item__content">
                      <div class="cart__item__content__description">
                        <h2>${article.name}</h2>
                        <p>${article.color}</p>
                        <p>${article.price} €</p>
                      </div>
                      <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                          <p>Qté :</p>
                          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${article.quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                          <p class="deleteItem">Supprimer</p>
                        </div>
                      </div>
                    </div>
                  </article>`;
                totalPriceProducts += parseInt(article.price) * parseInt(article.quantity);// Incrémente le prix total par le prix de chaque articles en fonction de sa quantité
                totalPrice.textContent = totalPriceProducts;// Insère le nouveau prix total dans le html
                totalQuantityProducts += parseInt(article.quantity);// Incrémente la quantité totale par la quantité de chaque articles
                totalQuantity.textContent = totalQuantityProducts;// Insère la nouvelle quantité totale dans le html 
                }   
            }            
        }
    }else{
        articlePlace.innerHTML = "<p>Votre panier est vide !</p>";// Tableau panier (cart) vide
    }
    console.log(cart);
    modifyQuantity();// Appel de la fonction modifyQuantity() de modification de quantité de l'article
    deleteCart();// Appel de la fonction deleteCart() de suppression d'article du panier (cart)
}
//** Fonction getCart qui récupère le panier (cart) dans le localStorage **//
function getCart() {
    const cart = localStorage.getItem('cart');// Récupération du panier (cart) dans le localStorage
    if (cart === null) {
        return [];// Création d'un panier sous forme de tableau si panier (cart) inexistant 
    } 
    else {
        return JSON.parse(cart);// Récupération du panier (cart) sous forme de tableau JSON
    }
}
//** Fonction modifyQuantity de modification de quantité de l'article **//
function modifyQuantity() {
    const quantityArticle = document.querySelectorAll(".cart__item");// Constante de sélection de l'emplacement html de l'article
    quantityArticle.forEach((element) => {// Applique la fonction qui suit sur chaque élément du tableau panier (cart)
        element.addEventListener("change", e => { //** Écoute de l'évènement de changement de quantité **//
            let cart = JSON.parse(localStorage.getItem("cart"));// Récupération du tableau du panier
            for (article of cart) {
                if (article._id === element.dataset.id && article.color === element.dataset.color) { // Conditions de correspondance des paramètres
                    article.quantity = e.target.value; // Attribut la valeur de quantité rentrée à l'article
                    console.log(article.quantity);
                    if (article.quantity >= 1) {
                        localStorage.cart = JSON.stringify(cart);// Enregistrement du panier (cart) avec la nouvelle quantité
                        location.reload(true);// Rechargement de la page
                    } else {
                        alert("Veuillez saisir une valeur supérieure à 0 ou cliquer sur supprimer pour enlever l'article de votre panier");
                        location.reload(true);// Rechargement de la page
                    }
                }
            }      
        });
    });
}
//** Fonction deleteCart() de suppression d'un article du panier **//
function deleteCart() {
    const deleteArticle = document.querySelectorAll(".deleteItem"); // Constante de séléction de l'emplacement html du bouton supprimer
    deleteArticle.forEach ((element) => { // Applique la fonction qui suit sur chaque élément du tableau panier (cart)
    	element.addEventListener("click", () => { //** Écoute de l'évènement de changement de quantité **//
            let articleToDelete = element.closest("article");// Sélection de l'article à supprimer (le plus proche du bouton supprimer)
            let cart = JSON.parse(localStorage.getItem("cart")); // Récupération du tableau du panier (cart)
            for (article of cart) {
                if (article._id === articleToDelete.dataset.id && article.color === articleToDelete.dataset.color) { // Conditions de correspondance des paramètres
					console.log(article);
                    let indexProduct = cart.indexOf(article); // Récupération de l'index de l'article initial dans le panier (cart)
                    console.log(indexProduct);
                    if (indexProduct !== -1) {
                        cart.splice(indexProduct, 1); // Suppression de l'article initial du panier (cart)
						console.log(cart);
                        localStorage.cart = JSON.stringify(cart);// Enregistrement du panier (cart) sans l'article supprimé
                        location.reload(true);// Rechargemennt de la page
                    }
                }    
            }
        });
    });   
}
//** Expressions régulières acceptées dans les champs du formulaire **//
const regExpMail = new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$");
const regExpNameCity = new RegExp("^[A-Za-zàâäéèêëïîôöùûüç'-]+$");
const regExpAddress = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-A-Za-zàâäéèêëïîôöùûüç]+)+");
//** Constantes de séléction des emplacements html des valeurs du formulaire **//
const inputFirstName = document.getElementById("firstName");
const inputLastName = document.getElementById("lastName");
const inputAddress = document.getElementById("address");
const inputCity = document.getElementById("city");
const inputMail = document.getElementById("email");
//** Écoute de l'évènement input du prénom **//
inputFirstName.addEventListener("input", e => {
	let firstName = e.target.value;// Attribut la valeur du prénom de l'input rentrée à la variable firstName
	console.log(firstName);
	const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");// Constante de séléction de l'emplacement html pour prénom non valide
	if (regExpNameCity.test(firstName) == false) {// Condition d'erreur, test d'expression régulière
    	firstNameErrorMsg.innerHTML = "Veuillez saisir un nom de famille correct (sans espace)."// Message d'erreur
    	return false;
	} else {
    	firstNameErrorMsg.innerHTML = null;// Aucun message d'erreur
    	return true;
	}
});
 //** Écoute de l'évènement input du nom **// 
inputLastName.addEventListener("input", e => {
	let lastName = e.target.value;//Attribut la valeur du nom de l'input rentrée à la variable lastName
	console.log(lastName);
	const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");// Constante de séléction de l'emplacement html pour nom non valide
	if (regExpNameCity.test(lastName) == false) {// Condition d'erreur, test d'expression régulière
    	lastNameErrorMsg.innerHTML = "Veuillez saisir un nom de famille correct (sans espace)."// Message d'erreur
    	return false;
	} else {
    	lastNameErrorMsg.innerHTML = null;// Aucun message d'erreur
    	return true;
	}
});
//** Écoute de l'évènement input de l'adresse **// 
inputAddress.addEventListener("input", e => {
	let address = e.target.value;//Attribut la valeur de l'adresse de l'input rentrée à la variable address
	console.log(address);
    const addressErrorMsg = document.getElementById("addressErrorMsg");// Constante de séléction de l'emplacement html pour adresse non valide
    if (regExpAddress.test(address) == false) {// Condition d'erreur, test d'expression régulière
        addressErrorMsg.innerHTML = "Veuillez rentrer une adresse correcte.";// Message d'erreur
        return false;
    } else {
        addressErrorMsg.innerHTML = null;// Aucun message d'erreur
        return true;
    }
});
//** Écoute de l'évènement input de la ville **// 
inputCity.addEventListener("input", e => {
	let city = e.target.value;//Attribut la valeur de la ville de l'input rentrée à la variable city
	console.log(city);
	const cityErrorMsg = document.getElementById("cityErrorMsg");// Constante de séléction de l'emplacement html pour ville non valide
	if (regExpNameCity.test(city) == false) {// Condition d'erreur, test d'expression régulière
    	cityErrorMsg.innerHTML = "Veuillez rentrer un nom de ville correct (sans espace).";// Message d'erreur
    	return false;
	} else {
    	cityErrorMsg.innerHTML = null;// Aucun message d'erreur
    	return true;
	}
});
//** Écoute de l'évènement input de l'email **// 
inputMail.addEventListener("input", e => {
	let mail = e.target.value;//Attribut la valeur de l'email de l'input rentrée à la variable mail
	console.log(mail);
    const emailErrorMsg = document.getElementById("emailErrorMsg");// Constante de séléction de l'emplacement html pour email non valide
    if (regExpMail.test(mail) == false) {// Condition d'erreur, test d'expression régulière
        emailErrorMsg.innerHTML = "Veuillez rentrer une adresse mail correcte.";// Message d'erreur
        return false;
    } else {
        emailErrorMsg.innerHTML = null;// Aucun message d'erreur
        return true;
    }
});
//** Écoute de l'évènement click du passage de commande **// 
const productOrder = document.getElementById("order");// Constante de séléction de l'emplacement html du bouton de commande
productOrder.addEventListener("click", e => submitForm(e));// Appel de la fonction d'envoi de formulaire
//** Fonction submitForm() d'envoi de formulaire **//
function submitForm(e) {
	e.preventDefault();// Empêche toute action si les évènement sont non géré
	//** Constantes de séléction des emplacements html des paramètres du formulaire **//
	const firstNameRes = document.getElementById("firstNameErrorMsg");
	const lastNameRes = document.getElementById("lastNameErrorMsg");
	const addressRes = document.getElementById("addressErrorMsg");
	const cityRes = document.getElementById("cityErrorMsg");
	const mailRes = document.getElementById("emailErrorMsg");
    const cart = getCart();
	
	if (cart.length === 0) {// Panier (cart) vide
		alert("Votre panier est vide")
	}else if (firstNameRes.textContent ==""// Conditions de création d'un tableau des id d'articles
		&& lastNameRes.textContent ==""
		&& addressRes.textContent =="" 
		&& cityRes.textContent =="" 
		&& mailRes.textContent =="" 
		&& inputFirstName.value !=""
		&& inputLastName.value !=""
		&& inputAddress.value !=""
		&& inputMail.value !="") {
		let cartId = [];// Création d'un tableau des id d'articles
			for (let i = 0; i<cart.length;i++) {// Condtions d'incrémentation du tableau des id d'articles
				cartId.push(cart[i]._id);// Récupération des id d'articles dans le panier (cart)
				console.log(cartId);
			}
		const order = {// Création de la constante order
			contact : {
				firstName: inputFirstName.value,// Prénom
				lastName: inputLastName.value,// Nom
				address: inputAddress.value,// Adress
				city: inputCity.value,// Ville
				email: inputMail.value,// Email
			},
			products: cartId,// Tableau des id d'articles
		} 
		//** Envoi de l'API order via la méthode POST **//
		fetch("http://localhost:3000/api/products/order", {// Récupération de l'adresse d'envoi
			method: "POST",
			body: JSON.stringify(order),// Corps du POST (order)
			headers: {
				"Accept": "application/json", 
				"Content-Type": "application/json" 
			},
		})
		.then((res) => res.json())// Renvoi le résultat en JSON
		.then((products) => {// Les données JSON sont applées products
			localStorage.clear();// Efface le localStorage
			document.location.href = `confirmation.html?id=${products.orderId}`;// Insère l'orderId des products dans l'URL de la page confirmation.html
		})
		.catch((err) => {
			alert ("Erreur fetch API " + err.message);// En cas d'erreur la console affichera Erreur fetch APi suivi du message d'erreur
		});
	} else {
		alert("Attention, votre formulaire contient des erreurs ! Veuillez suivre les instructions en dessous des champs et corriger ceux-ci.");// Message d'erreur en cas de formulaire mal rempli
	}	
}