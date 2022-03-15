// init local storage
let panier = JSON.parse(localStorage.getItem("panier"));
const cartItem = document.querySelector("#cart__items");
let totalquantity = 0
let totalprice = 0

for (let i = 0; i < panier.length; i++) {

    getArticle(panier[i], i)
    totalquantity += Number(panier[i].quantite)

}

const totalquantite = document.getElementById('totalQuantity')
if (totalquantite) {
    totalquantite.innerHTML = totalquantity
}


function addEventDelete(i) {
    const btn_supprimer = document.getElementsByClassName('deleteItem')

    if (btn_supprimer) {
        console.log(btn_supprimer, btn_supprimer[i])


        btn_supprimer[i].addEventListener('click', deleteItem(i))


    }
}

function deleteItem(i) {
    cartItem.removeChild(cartItem.children[i])
    console.log(i)
}

function getArticle(produit, i) {
    fetch("http://localhost:3000/api/products/" + produit.produit)
        .then((res) => {
            return res.json();
        })

    // Répartition des données de l'API dans le DOM
    .then(function(article) {

            if (article) {
                totalprice += Number(produit.quantite) * Number(article.price)
                getCart(produit, article);
                addEventDelete(i)
                const totalPrice = document.getElementById('totalPrice')
                if (totalPrice) {
                    totalPrice.innerHTML = totalprice
                }
            }
        })
        .catch((error) => {
            console.log("Erreur de la requête API");
        })
}

// Si le panier est vide
function getCart(produit, article) {
    cartItem.innerHTML += ` <article class="cart__item" data-id="${article._id}" data-color="${produit.couleur}">
                <div class="cart__item__img">
                  <img src="${article.imageUrl}" alt="${article.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${article.name}</h2>
                    <p>${produit.couleur}</p>
                    <p>${article.price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produit.quantite}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`

}



/*
function getTotals() {

    // Récupération du total des quantités
    var elemsQtt = document.getElementsByClassName('itemQuantity');
    var myLength = elemsQtt.length,
        totalQtt = 0;

    for (var i = 0; i < myLength; ++i) {
        totalQtt += elemsQtt[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;
    console.log(totalQtt);

    // Récupération du prix total
    totalPrice = 0;

    for (var i = 0; i < myLength; ++i) {
        totalPrice += (elemsQtt[i].valueAsNumber * produitLocalStorage[i].prixProduit);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);
}
getTotals();

// Modification d'une quantité de produit
function modifyQtt() {
    let qttModif = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < qttModif.length; k++) {
        qttModif[k].addEventListener("change", (event) => {
            event.preventDefault();

            //Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantityModif = produitLocalStorage[k].quantiteProduit;
            let qttModifValue = qttModif[k].valueAsNumber;

            const resultFind = produitLocalStorage.find((el) => el.qttModifValue !== quantityModif);

            resultFind.quantiteProduit = qttModifValue;
            produitLocalStorage[k].quantiteProduit = resultFind.quantiteProduit;

            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

            // refresh rapide
            location.reload();
        })
    }
}
modifyQtt();

// Suppression d'un produit
function deleteProduct() {
    let btn_supprimer = document.querySelectorAll(".deleteItem");

    for (let j = 0; j < btn_supprimer.length; j++) {
        btn_supprimer[j].addEventListener("click", (event) => {
            event.preventDefault();

            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = produitLocalStorage[j].idProduit;
            let colorDelete = produitLocalStorage[j].couleurProduit;

            produitLocalStorage = produitLocalStorage.filter(el => el.idProduit !== idDelete || el.couleurProduit !== colorDelete);

            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

            //Alerte produit supprimé et refresh
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        })
    }
}
deleteProduct(); */