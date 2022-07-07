const searchParams = new URLSearchParams(document.location.search);// Constante de fonction de recherche de paramètres dans l'URL
const id = searchParams.get("id");// Constante de récupération de l'id dans l'URL
console.log(id);
const orderId = document.getElementById("orderId");// Récupération de l'emplacement html du numéro de commande
orderId.innerHTML = id;// Insértion du texte du numéro de commande dans le html