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
        backgroundColor: "rgba(69, 177, 240, 0.5)",
        borderColor: "rgb(69, 177, 240)",  
        border: 1,
        label: "ventes",
        data: [20, 17, 30, 32, 10],
        tension: 0.4,
        fill: true,
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
        scales: {
      x: {
        grid: {
          color: "transparent",
          display: false,
        }
      },
      y: {
        grid: {
          color: "transparent",
          beginAtZero: true,
          display: false,
        }
      },      
    }
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

const myChartApercuVentes = document.querySelector("#chart-apercu-ventes");

const ctxApercuVentes = new Chart(myChartApercuVentes, {
  type: "bar",
  data: {
    labels: [
      "Alimentation",
      "électronique",
      "Automobile",
      "Vestimentaire",
      "Autres",
    ],
    datasets: [
      {
        data: [10, 20, 30, 5, 50],
        label: "categories",
      },
    ],
  },
  options: {
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          display: false,
      }
    ], 
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          display: false,
      }
    ],      
    }
  },
});

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
      ajouterProduit(produit);
      containerAjouterProduit.classList.remove("showFormAjouterProduit");
      formAjouterProduit.reset();
      textDefaultAjouterProduit.style.display = "none";

      Object.keys(formStateAjouterProduit).forEach((key) => {
        formStateAjouterProduit[key] = key === "etatStock" ? true : false;
      });
      initFormAjouterProduit();
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

//ajouter une commande

const btnAjouterCommande = document.querySelector(".btn-nav-commande-ajouter");
const formAjouterCommande = document.querySelector(".form-commande");
const containerAjouterCommande = document.querySelector(
  ".container-ajouter-commande",
);
const textDefaultAjouterCommande = document.querySelector(
  ".text-default-commande",
);
const nomClient = document.querySelector("#nom-client");
const idCommande = document.querySelector("#id-commande");
const btnAjouterCommandeForm = document.querySelector(".btn-ajouter-commande");
const tableCommandes = document.querySelector(".table-commande tbody");
const prixTotalCommande = document.querySelector("#prix-total");
const dateCommande = document.querySelector("#date-commande");
const produitAjouteListe = document.querySelector(".produits-ajoute-liste");
const BtnAjouterProduitListe = document.querySelector(
  ".btn-ajouter-produit-liste",
);
const tableCommande = document.querySelector(".table-commande tbody");
btnAjouterCommande.addEventListener("click", () => {
  containerAjouterCommande.classList.add("showFormAjouterCommande");
});

containerAjouterCommande.addEventListener("click", (e) => {
  if (e.target === containerAjouterCommande) {
    containerAjouterCommande.classList.remove("showFormAjouterCommande");
  }
});

const formStateAjouterCommande = {
  nomClient: false,
  idCommande: false,
  produitSelectionne: false,
  dateCommande: false,
};

class AjoutProduitListe {
  static nbreProduit = 0;
  static montantTotalCommande = 0;

  constructor(nomProduit, prixProduit) {
    this.nomProduit = nomProduit;
    this.prixProduit = prixProduit;
    this.quantite = 1;
    this.montantTotal = this.quantite * this.prixProduit;
    AjoutProduitListe.nbreProduit += 1;
    AjoutProduitListe.montantTotalCommande += this.montantTotal;
  }
  get nbreProduit() {
    return AjoutProduitListe.nbreProduit;
  }
  get montantTotalCommande() {
    return AjoutProduitListe.montantTotalCommande;
  }
  augmneterQuantite() {
    AjoutProduitListe.montantTotalCommande -= this.montantTotal;
    this.quantite += 1;
    this.montantTotal = this.prixProduit * this.quantite;
    AjoutProduitListe.montantTotalCommande += this.montantTotal;
  }
  diminuerQunatite() {
    AjoutProduitListe.montantTotalCommande -= this.montantTotal;
    this.quantite -= 1;
    this.montantTotal = this.prixProduit * this.quantite;
    AjoutProduitListe.montantTotalCommande += this.montantTotal;
  }
  reset() {
    AjoutProduitListe.montantTotalCommande -= this.montantTotal;
    AjoutProduitListe.nbreProduit -= 1;
    this.prixProduit = 0;
    this.quantite = 0;
    this.montantTotal = 0;
  }
}

function createProduitCommande(NomPrduitSelect, PrixProduitSelect) {
  const produit = new AjoutProduitListe(NomPrduitSelect, PrixProduitSelect);
  const divParent = document.createElement("div");
  divParent.classList.add("produit-ajoute");
  divParent.setAttribute("data-name", produit.nomProduit);

  const divInfosProduit = document.createElement("div");
  const spanNom = document.createElement("span");
  spanNom.textContent = produit.nomProduit;
  const spanPrix = document.createElement("span");
  spanPrix.textContent = produit.prixProduit;
  divInfosProduit.append(spanNom, spanPrix);
  divParent.appendChild(divInfosProduit);

  const divContainerBtns = document.createElement("div");
  const divContainerBtnsSet = document.createElement("div");
  const btnDiminuer = document.createElement("button");
  btnDiminuer.textContent = "-";
  btnDiminuer.classList.add("diminuerProduit");

  const nbreProduitSelect = document.createElement("span");
  nbreProduitSelect.textContent = produit.quantite;
  nbreProduitSelect.classList.add("produitQuantite");

  const btnAugmenter = document.createElement("button");
  btnAugmenter.textContent = "+";
  btnAugmenter.classList.add("augmenterProduit");

  divContainerBtnsSet.append(btnDiminuer, nbreProduitSelect, btnAugmenter);
  divContainerBtns.appendChild(divContainerBtnsSet);

  const montantTotalProduit = document.createElement("div");
  montantTotalProduit.textContent = produit.montantTotal;
  montantTotalProduit.classList.add("produitMontantTotal");

  const btnSupprimer = document.createElement("button");
  btnSupprimer.textContent = "X";
  btnSupprimer.classList.add("supprimerProduit");

  divContainerBtns.append(montantTotalProduit, btnSupprimer);
  divParent.appendChild(divContainerBtns);

  produitAjouteListe.prepend(divParent);
  return produit;
}

const ArrayProduitsSelectionnes = [];
const produitsCree = {};

const select = document.querySelector("#produits-commande");

function handleAjouterProduit() {
  const selectedOption = select.selectedOptions[0];
  if (!selectedOption) return;

  const nomProduit = selectedOption.value;
  const prixProduit = selectedOption.dataset.price || "0";

  if (!ArrayProduitsSelectionnes.includes(nomProduit) && prixProduit !== "0") {
    const produit = createProduitCommande(nomProduit, prixProduit);
    ArrayProduitsSelectionnes.push(nomProduit);
    document.querySelector(".text-default-produits-ajoute").style.display =
      "none";
    prixTotalCommande.textContent = AjoutProduitListe.montantTotalCommande;
    produitsCree[nomProduit] = produit;
    AjoutProduitListe.nbreProduit > 0
      ? (formStateAjouterCommande.produitSelectionne = true)
      : (formStateAjouterCommande.produitSelectionne = false);
    isValidFormCommande();
  }
}
BtnAjouterProduitListe.addEventListener("click", (e) => {
  e.preventDefault();
  handleAjouterProduit();
});

function updateProduitCommandeUI(parent, produit) {
  const qteSpan = parent.querySelector(".produitQuantite");
  const montantTotalProduit = parent.querySelector(".produitMontantTotal");
  if (qteSpan) qteSpan.textContent = produit.quantite;
  if (montantTotalProduit)
    montantTotalProduit.textContent = produit.montantTotal;
  prixTotalCommande.textContent = AjoutProduitListe.montantTotalCommande;
}

function removeProduitCommande(parent, produitName) {
  if (!parent) return;
  if (produitsCree[produitName]) {
    produitsCree[produitName].reset();
    delete produitsCree[produitName];
  }
  const index = ArrayProduitsSelectionnes.indexOf(produitName);
  if (index !== -1) ArrayProduitsSelectionnes.splice(index, 1);
  parent.remove();
  prixTotalCommande.textContent = AjoutProduitListe.montantTotalCommande;
  AjoutProduitListe.nbreProduit > 0
    ? (formStateAjouterCommande.produitSelectionne = true)
    : (formStateAjouterCommande.produitSelectionne = false);
  isValidFormCommande();
}

produitAjouteListe.addEventListener("click", (event) => {
  event.preventDefault();
  const eltClique = event.target;
  const parent = eltClique.closest(".produit-ajoute");
  if (!parent) return;
  const parentName = parent.getAttribute("data-name");

  if (eltClique.classList.contains("supprimerProduit")) {
    removeProduitCommande(parent, parentName);
    return;
  }

  if (!produitsCree[parentName]) return;

  if (eltClique.classList.contains("augmenterProduit")) {
    produitsCree[parentName].augmneterQuantite();
    updateProduitCommandeUI(parent, produitsCree[parentName]);
    return;
  }

  if (eltClique.classList.contains("diminuerProduit")) {
    produitsCree[parentName].diminuerQunatite();
    if (produitsCree[parentName].quantite <= 0) {
      removeProduitCommande(parent, parentName);
    } else {
      updateProduitCommandeUI(parent, produitsCree[parentName]);
    }
    return;
  }
});

function isValidFormCommande() {
  const valid =
    formStateAjouterCommande.nomClient &&
    formStateAjouterCommande.idCommande &&
    formStateAjouterCommande.produitSelectionne &&
    formStateAjouterCommande.dateCommande;
  btnAjouterCommandeForm.disabled = !valid;
  btnAjouterCommandeForm.style.opacity = valid ? "1" : "0.5";
  return valid;
}

function initFormCommande() {
  btnAjouterCommandeForm.disabled = true;
  btnAjouterCommandeForm.style.opacity = ".5";

  idCommande.addEventListener("input", () => {
    isValidInput(idCommande, formStateAjouterCommande, "idCommande");
    isValidFormCommande();
    console.log(formStateAjouterCommande);
  });

  dateCommande.addEventListener("change", () => {
    formStateAjouterCommande.dateCommande = true;
    isValidFormCommande();
    console.log(formStateAjouterCommande);
  });

  nomClient.addEventListener("input", () => {
    isValidInput(nomClient, formStateAjouterCommande, "nomClient");
    isValidFormCommande();
  });
}

initFormCommande();

btnAjouterCommandeForm.addEventListener("click", (event) => {
  event.preventDefault();
  ajouterCommande();
  textDefaultAjouterCommande.style.display = "none";
  containerAjouterCommande.classList.remove("showFormAjouterCommande");
  resetFormCommande();
});

function ajouterCommande() {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${idCommande.value}</td>
    <td>${nomClient.value}</td>
    <td>${ArrayProduitsSelectionnes}</td>
    <td>${ArrayProduitsSelectionnes.length}</td>
    <td>${prixTotalCommande.textContent}</td>
    <td>${dateCommande.value}</td>
    <td>...</td>
  `;
  tableCommande.prepend(tr);
}

function resetFormCommande() {
  formAjouterCommande.reset();

  produitAjouteListe.innerHTML = "";
  const p = document.createElement("p");
  p.textContent = "Aucun produit ajouté";
  p.classList.add("text-default-produits-ajoute");
  produitAjouteListe.appendChild(p);

  ArrayProduitsSelectionnes.length = 0;
  Object.keys(produitsCree).forEach((key) => delete produitsCree[key]);

  AjoutProduitListe.nbreProduit = 0;
  AjoutProduitListe.montantTotalCommande = 0;

  formStateAjouterCommande.nomClient = false;
  formStateAjouterCommande.idCommande = false;
  formStateAjouterCommande.produitSelectionne = false;
  formStateAjouterCommande.dateCommande = false;

  prixTotalCommande.textContent = "0";
  btnAjouterCommandeForm.disabled = true;
  btnAjouterCommandeForm.style.opacity = "0.5";

  prixTotalCommande.textContent = "0.0";

  initFormCommande();
}
