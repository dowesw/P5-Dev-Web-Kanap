var str = window.location.href;
var url = new URL(str);
var search_params = new URLSearchParams(url.search);

let article = "";

const colorPicked = document.querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

if (search_params.has("id")) {
    var idProduct = search_params.get("id");
    console.log(idProduct);
    getArticle();
    addEventBoutton()
}


// Récup articles de l'API
function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
        .then((res) => {
            return res.json();
        })

    // Répartition des données de l'API dans le DOM
    .then(function(resultatAPI) {
            article = resultatAPI;
            console.table(article);
            if (article) {
                getPost(article);

            }
        })
        .catch((error) => {
            console.log("Erreur de la requête API");
        })
}


// Affichage des infos du produit récupéré

function getPost(article) {
    // Insertion de l'image
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    // Modif titre "h1"
    let productName = document.getElementById('title');
    productName.innerHTML = article.name;
    document.title = article.name

    // Modif prix
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    // Modif description
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;

    // options de couleurs
    for (let colors of article.colors) {
        console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }

    addToCart(article);

}


//Gestion du panier
function addToCart(article) {
    const btn_envoyerPanier = document.querySelector("#addToCart");

    //Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100
    btn_envoyerPanier.addEventListener("click", (event) => {
        event.preventDefault()
        if (colorPicked.value === "") {
            alert('veuillez choisir la couleur')
            return
        }
        if (quantityPicked.value < 1 || quantityPicked.value > 100) {
            alert('veuillez une quantité comprise entre 1 et 100')
            return
        }


        // Récup choix couleur et Quantité
        let choixCouleur = colorPicked.value;
        let choixQuantite = quantityPicked.value;

        //Récupération des options de l'article à ajouter au panier
        let optionsProduit = {
            produit: idProduct,
            couleur: choixCouleur,
            quantite: Number(choixQuantite),
        };

        //Initialisation du local storage
        let panier = JSON.parse(localStorage.getItem("panier"));


        if (!panier) {
            panier = []
        }

        const result = panier.find((p) => p.produit === optionsProduit.produit && p.couleur === optionsProduit.couleur)
        if (result) {
            result.quantite = Number(result.quantite) + Number(optionsProduit.quantite)
        } else {
            panier.push(optionsProduit);
        }
        localStorage.setItem("panier", JSON.stringify(panier))
        alert(`Votre commande de ${choixQuantite} ${article.name} ${choixCouleur} est ajoutée au panier
Pour consulter votre panier, cliquez sur OK`)

        //Importation dans le local storage
        //Si le panier comporte déjà au moins 1 article


    });
}