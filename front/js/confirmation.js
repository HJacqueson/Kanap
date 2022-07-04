const searchParams = new URLSearchParams(document.location.search);
const id = searchParams.get("id");
console.log(id);
const orderId = document.getElementById("orderId");
orderId.innerHTML = id;