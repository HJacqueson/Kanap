const productOrder = document.getElementById("order");
productOrder.addEventListener("click", e => submitForm(e));

let cart = getCart();

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

let articlePlace = document.getElementById("cart__items");
let totalPrice = document.getElementById("totalPrice");
let totalQuantity = document.getElementById("totalQuantity");
let totalPriceProducts = 0;
let totalQuantityProducts = 0;

fillCart();

function fillCart() {
    if(cart.length === 0) {
        articlePlace.innerHTML = "<p>Votre panier est vide !</p>";
    } else {
        for(article of cart) {
            increaseQuantityPrice();
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
          </article>`
        }
    }   
    modifyQuantity();
    deleteCart();
}

function modifyQuantity() {
    const quantityArticle = document.querySelectorAll(".cart__item");
    quantityArticle.forEach((element) => {
        element.addEventListener("change", e => { 
            let cart = JSON.parse(localStorage.getItem("cart"));
            for (article of cart) {
                if (article._id === element.dataset.id && article.color === element.dataset.color) {
                    article.price = parseInt(article.price) / parseInt(article.quantity);
                    article.quantity = e.target.value;
                    console.log(article.quantity);
                    if (article.quantity >= 1) {
                        article.price = parseInt(article.price) * parseInt(article.quantity);
                        localStorage.cart = JSON.stringify(cart);
                        location.reload(true);
                    } else {
                        alert("Veuillez saisir une valeur supérieure à 0 ou cliquer sur supprimer pour enlever l'article de votre panier");
                        location.reload(true);
                    }
                }
            }      
        });
    });
}

function deleteCart() {
    const deleteArticle = document.querySelectorAll(".deleteItem");
    deleteArticle.forEach ((element) => {
    	element.addEventListener("click", () => {
            let articleToDelete = element.closest("article");
            let cart = JSON.parse(localStorage.getItem("cart"));
            for (article of cart) {
                if (article._id === articleToDelete.dataset.id && article.color === articleToDelete.dataset.color) {
                    let indexProduct = cart.indexOf(article);
                    console.log(indexProduct);
                    if (indexProduct !== -1) {
                        cart.splice(indexProduct, 1);
                        localStorage.cart = JSON.stringify(cart);
                        location.reload(true);
                    }
                }    
            }
        });
    });   
}
  
function increaseQuantityPrice() {
    totalPriceProducts += parseInt(article.price);
    totalPrice.textContent = totalPriceProducts;
    totalQuantityProducts += parseInt(article.quantity);
    totalQuantity.textContent = totalQuantityProducts;
}

const regExpMail = new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$");
const regExpNameCity = new RegExp("^[A-Za-zàâäéèêëïîôöùûüç'-]+$");
const regExpAddress = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-A-Za-zàâäéèêëïîôöùûüç]+)+");

const inputFirstName = document.getElementById("firstName");
const inputLastName = document.getElementById("lastName");
const inputAddress = document.getElementById("address");
const inputCity = document.getElementById("city");
const inputMail = document.getElementById("email");

inputFirstName.addEventListener("input", e => {
	let firstName = e.target.value;
	const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
	if (regExpNameCity.test(firstName) == false) {
    	firstNameErrorMsg.innerHTML = "Veuillez saisir un nom de famille correct (sans espace)."
    	return false;
	} else {
    	firstNameErrorMsg.innerHTML = null;
    	return true;
	}
});
  
inputLastName.addEventListener("input", e => {
	let lastName = e.target.value;
	const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
	if (regExpNameCity.test(lastName) == false) {
    	lastNameErrorMsg.innerHTML = "Veuillez saisir un nom de famille correct (sans espace)."
    	return false;
	} else {
    	lastNameErrorMsg.innerHTML = null;
    	return true;
	}
});
    
inputAddress.addEventListener("input", e => {
	let address = e.target.value;
    const addressErrorMsg = document.getElementById("addressErrorMsg");
    if (regExpAddress.test(address) == false) {
        addressErrorMsg.innerHTML = "Veuillez rentrer une adresse correcte.";
        return false;
    } else {
        addressErrorMsg.innerHTML = null;
        return true;
    }
});

inputCity.addEventListener("input", e => {
	let city = e.target.value;
	const cityErrorMsg = document.getElementById("cityErrorMsg");
	if (regExpNameCity.test(city) == false) {
    	cityErrorMsg.innerHTML = "Veuillez rentrer un nom de ville correct (sans espace).";
    	return false;
	} else {
    	cityErrorMsg.innerHTML = null;
    	return true;
	}
});

inputMail.addEventListener("input", e => {
	let mail = e.target.value; 
    const emailErrorMsg = document.getElementById("emailErrorMsg");
    if (regExpMail.test(mail) == false) {
        emailErrorMsg.innerHTML = "Veuillez rentrer une adresse mail correcte.";
        return false;
    } else {
        emailErrorMsg.innerHTML = null;
        return true;
    }
});



function submitForm(e) {
	e.preventDefault();

	const firstNameRes = document.getElementById("firstNameErrorMsg");
	const lastNameRes = document.getElementById("lastNameErrorMsg");
	const addressRes = document.getElementById("addressErrorMsg");
	const cityRes = document.getElementById("cityErrorMsg");
	const mailRes = document.getElementById("emailErrorMsg");
	
	if (cart.length === 0) {
		alert("Votre panier est vide")
	}else if (firstNameRes.textContent ==""
		&& lastNameRes.textContent ==""
		&& addressRes.textContent =="" 
		&& cityRes.textContent =="" 
		&& mailRes.textContent =="" 
		&& inputFirstName.value !=""
		&& inputLastName.value !=""
		&& inputAddress.value !=""
		&& inputMail.value !="") {
		let cartId = [];
			for (let i = 0; i<cart.length;i++) {
				console.log(cartId);
				cartId.push(cart[i]._id);
				console.log(cartId);
			}
		const order = {
			contact : {
				firstName: inputFirstName.value,
				lastName: inputLastName.value,
				address: inputAddress.value,
				city: inputCity.value,
				email: inputMail.value,
			},
			products: cartId,
		} 
		
		fetch("http://localhost:3000/api/products/order", {
			method: "POST",
			body: JSON.stringify(order),
			headers: {
				"Accept": "application/json", 
				"Content-Type": "application/json" 
			},
		})
		.then((res) => res.json())
		.then((data) => {
			localStorage.clear();
			document.location.href = `confirmation.html?id=${data.orderId}`;
		})
		.catch((err) => {
			alert ("Erreur fetch API " + err.message);
		});
	} else {
		alert("Attention, votre formulaire contient des erreurs ! Veuillez suivre les instructions en dessous des champs et corriger ceux-ci.");
	}	
}
