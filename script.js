"use strict";

const showSecInscription = document.querySelector("#show-sec-inscription");
const showSecConnexion = document.querySelector("#show-sec-connexion");
const secInscription = document.querySelector(".inscription-sec");
const secConnexion = document.querySelector(".connexion-sec");

secConnexion.classList.add("secConnexionInvisible");
secInscription.classList.add("secInscriptionVisible");

//afficher et masquer les sections inscription et connexion
showSecConnexion.addEventListener("click", () => {
  secInscription.classList.add("secInscriptionInvisible");
  secInscription.classList.remove("secInscriptionVisible");
  secConnexion.classList.add("secConnexionVisible");
  secConnexion.classList.remove("secConnexionInvisible");
});

showSecInscription.addEventListener("click", () => {
  secConnexion.classList.add("secConnexionInvisible");
  secConnexion.classList.remove("secConnexionVisible");
  secInscription.classList.add("secInscriptionVisible");
  secInscription.classList.remove("secInscriptionInvisible");
});

//afficher et masquer les tooltips de la nav-bar

const notificationNavBar = document.querySelector(".notification-nav-bar");
const settingsNavBar = document.querySelector(".settings-nav-bar");
const userProfilNavBar = document.querySelector(".user-profil-nav-bar");
const userInfosNavBar = document.querySelector(".user-infos-nav-bar");

const userInfosArray = [notificationNavBar, settingsNavBar, userProfilNavBar];

function showTooltipNavBar(eltClique) {
  for (let elt of userInfosArray) {
    if (elt !== eltClique) {
      if (elt.classList.contains("showTooltip")) {
        elt.classList.remove("showTooltip");
        elt.classList.remove("userInfosActif");
      }
    }
  }
  eltClique.classList.toggle("showTooltip");
  if (eltClique !== userInfosNavBar)
    eltClique.classList.toggle("userInfosActif");
}

userInfosNavBar.addEventListener("click", (e) => {
  e.stopPropagation();
  const eltClique = e.target.closest("div");
  if (!eltClique) return;
  showTooltipNavBar(eltClique);
});

document.addEventListener("click", (e) => {
  if (!userInfosNavBar.contains(e.target)) {
    for (let elt of userInfosArray) {
      if (elt.classList.contains("showTooltip")) {
        elt.classList.remove("showTooltip");
        elt.classList.remove("userInfosActif");
      }
    }
  }
});

//affichage du chart dans le canvas
const myChartVentes = document.querySelector("#chart-ventes");

const ctxVentes = new Chart(myChartVentes, {
  type: "line",
  data: {
    labels: ["janvier", "fevrier", "mars", "avril", "mai"],
    datasets: [
      {
        backgroundColor: "#d75b95",
        border: 1,
        label: "ventes",
        data: [20, 17, 30, 32, 10],
        tension: 0.4,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: "easeInOutQuart",
    },
  },
});

if (ctxVentes) {
  ctxVentes.resize();
  ctxVentes.update();
}
const myChartPlusVentes = document.querySelector("#chart-plus-ventes");

const ctxPlusVentes = new Chart(myChartPlusVentes, {
  type: "doughnut",
  data: {
    labels: ["Poduit 1", "produit 2", "produit 3", "produit 4"],
    datasets: [
      {
        data: [10, 20, 30, 7],
        label: "vendus",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
});
if (ctxPlusVentes) {
  ctxPlusVentes.resize();
  ctxPlusVentes.update();
}

//afficher et masquer les sections de l'aside
const displayZoneArray = Array.from(document.querySelectorAll(".display-zone"));
const displayBtnsArray = Array.from(document.querySelectorAll(".display-btn"));
const BtnsAsideBar = document.querySelector(".btns-aside-bar");
const sectionActiveText = document.querySelector(".section-active-text");

//afficher le dashboard par defaut
displayZoneArray[0].classList.add("displayZoneActive");


function showDisplayZone(eltClique) {
  for (let elt of displayBtnsArray) {
    if (elt.getAttribute("aria-current")) {
      elt.setAttribute("aria-current", false);
      const posElt = displayBtnsArray.indexOf(elt);
      displayZoneArray[posElt].classList.remove("displayZoneActive");
      if (posElt === 0) {
        ctxVentes.resize();
        ctxVentes.update();
      }
      if (posElt === 0) {
        ctxPlusVentes.resize();
        ctxPlusVentes.update();
      }
    }
  }
  eltClique.setAttribute("aria-current", true);
  const posEltClique = displayBtnsArray.indexOf(eltClique);
  displayZoneArray[posEltClique].classList.add("displayZoneActive");
}

BtnsAsideBar.addEventListener("click", (e) => {
  e.stopPropagation();
  const eltClique = e.target.closest("button");
  if (!eltClique) return;
  sectionActiveText.textContent = eltClique.textContent;
  showDisplayZone(eltClique);
});

//ajouter un produit

const btnAjouterProduit = document.querySelector(".btn-nav-produits-ajouter");
const formAjouterProduit = document.querySelector(".form-ajouter-produit");
const containerAjouterProduit = document.querySelector(
  ".container-ajouter-produit",
);
const textDefaultAjouterProduit = document.querySelector(
  ".text-default-ajouter-produit",
);
const NomProduit = document.querySelector("#nom-produit");
const PrixUnitaire = document.querySelector("#prix-unitaire");
const QuantiteProduit = document.querySelector("#quantite-produit");
const CategorieProduit = document.querySelector("#categorie-produit");
const EtatStockProduit = document.querySelector("#etat-stock");
const idProduit = document.querySelector("#id-produit");
const btnAjouterProduitForm = document.querySelector(".btn-ajouter-produit");
const tableProduits = document.querySelector(".table-produits tbody");
const formStateAjouterProduit = {
  nom: false,
  id: false,
  categorie: false,
  quantite: false,
  etatStock: true,
  prixUnitaire: false,
};

function isValidInput(input, formState, key) {
  if (input.value.trim() === "") {
    formState[key] = false;
    input.classList.remove("validInput");
    return false;
  }
  formState[key] = true;
  input.classList.add("validInput");
  return true;
}

function createProduit() {
  const formData = new FormData(formAjouterProduit);
  const produitDatas = Object.fromEntries(formData);

  const produit = {
    nom: produitDatas["nom-produit"]?.trim(),
    id: produitDatas["id-produit"]?.trim(),
    categorie: produitDatas["categorie-produit"]?.trim(),
    quantite: produitDatas["quantite-produit"]?.trim(),
    etatStock: produitDatas["etat-stock"]?.trim(),
    prixUnitaire: produitDatas["prix-unitaire"]?.trim(),
  };
  return produit;
}

function isValidFormAjouterProduit() {
  const valid =
    formStateAjouterProduit.nom &&
    formStateAjouterProduit.prixUnitaire &&
    formStateAjouterProduit.quantite &&
    formStateAjouterProduit.categorie &&
    formStateAjouterProduit.etatStock &&
    formStateAjouterProduit.id;
  btnAjouterProduitForm.disabled = !valid;
  btnAjouterProduitForm.style.opacity = valid ? "1" : "0.5";
  return valid;
}

function ajouterProduit(produit) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${produit.nom}</td>
    <td>${produit.id}</td>
    <td>${produit.categorie}</td>
    <td>${produit.quantite}</td>
    <td>${produit.etatStock}</td>
    <td>${produit.prixUnitaire}</td>
  `;
  tableProduits.prepend(tr);
}

function initFormAjouterProduit() {

  btnAjouterProduitForm.disabled = true;
  btnAjouterProduitForm.style.opacity = "0.5";

  NomProduit.addEventListener("input", () => {
    isValidInput(NomProduit, formStateAjouterProduit, "nom");
    isValidFormAjouterProduit();
  });
  PrixUnitaire.addEventListener("input", () => {
    isValidInput(PrixUnitaire, formStateAjouterProduit, "prixUnitaire");
    isValidFormAjouterProduit();
  });
  QuantiteProduit.addEventListener("input", () => {
    isValidInput(QuantiteProduit, formStateAjouterProduit, "quantite");
    isValidFormAjouterProduit();
  });
  CategorieProduit.addEventListener("input", () => {
    isValidInput(CategorieProduit, formStateAjouterProduit, "categorie");
    isValidFormAjouterProduit();
  });
  idProduit.addEventListener("input", () => {
    isValidInput(idProduit, formStateAjouterProduit, "id");
    isValidFormAjouterProduit();
  });

  formAjouterProduit.addEventListener("submit", (e) => {
    e.preventDefault();
    if (isValidFormAjouterProduit()) {
      const produit = createProduit();
      console.log(produit);
      ajouterProduit(produit);
      containerAjouterProduit.classList.remove("showFormAjouterProduit");
      formAjouterProduit.reset();
      textDefaultAjouterProduit.style.display = "none";
      
      Object.keys(formStateAjouterProduit).forEach((key) => {
        if (key !== "etatStock") {
          formStateAjouterProduit[key] = false;
        }
      });
    }
  });
}

initFormAjouterProduit();

btnAjouterProduit.addEventListener("click", () => {
  containerAjouterProduit.classList.add("showFormAjouterProduit");
});

containerAjouterProduit.addEventListener("click", (e) => {
  if (e.target === containerAjouterProduit) {
    containerAjouterProduit.classList.remove("showFormAjouterProduit");
    textDefaultAjouterProduit.style.display = "block";
  }
});
