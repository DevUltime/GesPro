"use strict";

const showSecInscription = document.querySelector("#show-sec-inscription");
const showSecConnexion = document.querySelector("#show-sec-connexion");
const secInscription = document.querySelector(".inscription-sec");
const secConnexion = document.querySelector(".connexion-sec");
const dashboard = document.querySelector(".dashboard");

secConnexion.classList.add("secConnexionInvisible");
secInscription.classList.add("secInscriptionVisible");

//afficher et masquer les sections inscription et connexion
showSecConnexion.addEventListener("click", () => {
  showConnexionSection();
});

showSecInscription.addEventListener("click", () => {
  showInscriptionSection();
});

function showConnexionSection() {
  secInscription.classList.add("secInscriptionInvisible");
  secInscription.classList.remove("secInscriptionVisible");
  secConnexion.classList.add("secConnexionVisible");
  secConnexion.classList.remove("secConnexionInvisible");
}

function showInscriptionSection() {
  secConnexion.classList.add("secConnexionInvisible");
  secConnexion.classList.remove("secConnexionVisible");
  secInscription.classList.add("secInscriptionVisible");
  secInscription.classList.remove("secInscriptionInvisible");
}


//afficher et masquer les tooltips de la nav-bar

const notificationNavBar = document.querySelector(".notification-nav-bar");
const settingsNavBar = document.querySelector(".settings-nav-bar");
const userProfilNavBar = document.querySelector(".user-profil-nav-bar");
const userInfosNavBar = document.querySelector(".user-infos-nav-bar");
userInfosNavBar.addEventListener("click", (event) =>{
  const eltClique = event.target;
  if(!eltClique) return;
  const btnEltClique = event.target.closest("div") || event.target.closest("img")
    if(btnEltClique ===  notificationNavBar){
      notificationNavBar.classList.toggle("showTooltip")
    }
  })


document.addEventListener("click", (e) => {
  if (!userInfosNavBar.contains(e.target)) {
      if(notificationNavBar.classList.contains("showTooltip")) notificationNavBar.classList.remove("showTooltip");
    }

});

const utilisateur = {
  totalProduits: 0,
  totalCommandes: 0,
  totalStocks: 0,
  totalVentes: 0,
  produits: [],
  commandes: [],
  stocks: [],
  ventes: [],
  clients: [],
  ventesRecentesDashboard: [],
  activiteRecentes: {
    stockTotal: 0,
    produitsTotal: 0,
    commandesTotal: 0,
    revenusTotal: 0,
  },
  inventaireMois: {
    quantiteTotale: 0,
    quantitevendue: 0,
  },
  produitsvendus: [],
  produitsPlusVendus: {},
  CategorieProduit: {
    alimentation: 0,
    electronique: 0,
    automobile: 0,
    vestimentaire: 0,
    autres: 0,
  },
  apercuStocks: {
    totalProduits: 0,
    totalVentes: 0,
    derniereVente: 0,
    ProduitsStocks: 0,
  },
  catergorieStock: {
    Électronique: 0,
    Alimentation: 0,
    Automobile: 0,
    Vestimentaire: 0,
    Autres: 0,
  },
  revenusRecents: {
    coutAchat: 0,
    revenus: 0,
  },
  updateProduits: function (nouveauProduit) {
    this.produits.push(nouveauProduit);
    const nbreProduits = document.querySelector(".btn-nav-produits-quantite");
    this.produits.length > 1
      ? (nbreProduits.textContent = `${this.produits.length} produits`)
      : (nbreProduits.textContent = `${this.produits.length} produit`);
  },

  updateCommandes: function (nouvelleCommande) {
    this.commandes.push(nouvelleCommande);
    const nbreCommandes = document.querySelector(".commande-total");
    this.commandes.length > 1
      ? (nbreCommandes.textContent = `${this.commandes.length} commandes`)
      : (nbreCommandes.textContent = `${this.commandes.length} commande`);
  },

  updateStocks: function () {
    const produits = this.produits;
    const produitsStock = produits.map((p) => ({
      nom: p.nom,
      categorie: p.categorie,
      prix: Number(p.quantite * p.prixAchat),
      stock: Number(p.quantite),
    }));
    this.stocks = [...produitsStock];
    return produitsStock;
  },
  updateVentesRecentesDashboard: function (vente) {
    if (this.ventesRecentesDashboard.length > 3) {
      this.ventesRecentesDashboard.pop();
      this.ventesRecentesDashboard.unshift(vente);
    } else {
      this.ventesRecentesDashboard.unshift(vente);
    }
    const tableVentesRecentes = document.querySelector(
      ".table-ventes-recentes tbody",
    );
    const textDefaultVentesdashboard = document.querySelector(
      ".text-default-vente-dashboard",
    );

    tableVentesRecentes.innerHTML = "";
    this.ventesRecentesDashboard.forEach((v) => {
      ajouterVente(v, tableVentesRecentes, textDefaultVentesdashboard);
    });
  },
  updateApercuStocks: function () {
    const totalProd = this.produits.reduce(
      (acc, produit) => acc + Number(produit["quantite"]),
      0,
    );
    this.apercuStocks["totalProduits"] = totalProd;
    this.apercuStocks["totalVentes"] = this.ventes.length;

    const indDernierElt = this.ventes.length - 1;
    this.apercuStocks["derniereVente"] =
      this.ventes[indDernierElt]?.prixTotal ?? 0;
    this.apercuStocks["produitsStock"] = this.stocks.length;

    const apercuTotalProduits = document.querySelector(
      "#apercu-total-produits",
    );
    const apercuTotalVentes = document.querySelector("#apercu-total-ventes");
    const apercuDerniereVente = document.querySelector(
      "#apercu-derniere-vente",
    );
    const apercuProduitsStock = document.querySelector(
      "#apercu-produits-stock",
    );

    apercuTotalProduits.textContent = this.apercuStocks["totalProduits"];
    apercuTotalVentes.textContent = this.apercuStocks["totalVentes"];
    apercuDerniereVente.textContent = this.apercuStocks["derniereVente"];
    apercuProduitsStock.textContent = this.apercuStocks["produitsStock"];
  },
  updateCategorieStock: function (stock) {
    
    this.catergorieStock[stock.categorie] += 1;
    const data = Object.values(this.catergorieStock);
    const dataBarVentes = [...data];
    addData(ctxApercuVentes, dataBarVentes);
    addData(ctxVentes, dataBarVentes);
  },
  updateRevenusRecents: function () {
    this.inventaireMois["quantitevendue"] = 0;
    this.produitsvendus = [];

    const prixAchat = this.ventes.reduce((acc, vente) => {
      const totalAchatVente = Object.entries(vente.infosProduits || {}).reduce(
        (somme, [nomProduit, quantite]) => {
          const produitReference = this.produits.find(
            (pp) => pp.nom === nomProduit,
          );
          if (!produitReference) return somme;

          const produitt = {};
          produitt[produitReference.nom] = quantite;

          this.produitsvendus.push(produitt);

          this.inventaireMois["quantitevendue"] += Number(quantite);

          return (
            somme + Number(quantite) * Number(produitReference.prixAchat || 0)
          );
        },
        0,
      );

      return acc + totalAchatVente;
    }, 0);

    const prixVente = this.ventes.reduce((acc, vente) => {
      return acc + Number(vente.prixTotal || 0);
    }, 0);

    this.revenusRecents["coutAchat"] = prixAchat;
    this.revenusRecents["revenus"] = prixVente - prixAchat;

    const coutAchatDom = document.querySelector("#cout-achat-dom");
    const revenusDom = document.querySelector("#revenus-dom");

    coutAchatDom.textContent = this.revenusRecents["coutAchat"];

    this.revenusRecents["revenus"] === 0
      ? (revenusDom.textContent = "00")
      : (revenusDom.textContent = this.revenusRecents["revenus"]);
  },
  updateActiviteRecente: function () {
    this.activiteRecentes["stockTotal"] = this.stocks.length;
    this.activiteRecentes["produitsTotal"] = this.apercuStocks["totalProduits"];
    this.activiteRecentes["commandesTotal"] = this.commandes.length;
    this.activiteRecentes["revenusTotal"] = this.revenusRecents["revenus"];

    const actStockTotal = document.querySelector("#act-stock-total");
    const actProduitTotal = document.querySelector("#act-produit-total");
    const actCommandesTotal = document.querySelector("#act-commandes-total");
    const actRevenusTotauux = document.querySelector("#act-revenus-totaux");

    actStockTotal.textContent = this.activiteRecentes["stockTotal"] ?? "00";
    actProduitTotal.textContent =
      this.activiteRecentes["produitsTotal"] ?? "00";
    actCommandesTotal.textContent =
      this.activiteRecentes["commandesTotal"] ?? "00";
    actRevenusTotauux.textContent =
      this.activiteRecentes["revenusTotal"] ?? "00";
  },

  updateInventaireMois: function () {
    this.inventaireMois["quantiteTotale"] = this.apercuStocks["totalProduits"];
    const invQuantiteTotal = document.querySelector("#inv-quantite-total");
    const invQuantiteVendue = document.querySelector("#inv-quantite-vendue");

    invQuantiteTotal.textContent = this.inventaireMois["quantiteTotale"];
    invQuantiteVendue.textContent = this.inventaireMois["quantitevendue"];
  },
  updateProduitsPlusVendus: function () {
    const produitsTotalQuantite = {};

    this.produitsvendus.forEach((produit) => {
      Object.entries(produit).forEach(([nom, quantite]) => {
        produitsTotalQuantite[nom] =
          (produitsTotalQuantite[nom] || 0) + Number(quantite);
      });
    });

    const quatrePlus = Object.entries(produitsTotalQuantite)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .reduce((obj, [nom, quantite]) => {
        obj[nom] = quantite;
        return obj;
      }, {});

    const nomQuatre = Object.keys(quatrePlus);
    const quantiteQuatre = Object.values(quatrePlus);
    this.produitsPlusVendus = { ...quatrePlus };
    addData(ctxPlusVentes, quantiteQuatre);
    addLabels(ctxPlusVentes, nomQuatre);
    ajouterProduitPlusvendus(nomQuatre, quantiteQuatre);
  },
};


//affichage du chart dans le canvas
const myChartVentes = document.querySelector("#chart-ventes");

const ctxVentes = new Chart(myChartVentes, {
  type: "bar",
  data: {
    labels: [
      "électronique",
      "Alimentation",
      "Automobile",
      "Vestimentaire",
      "Autres",
    ],
    datasets: [
      {
        backgroundColor: "rgba(69, 177, 240, 0.5)",
        borderColor: "rgb(69, 177, 240)",
        border: 1,
        label: "categories",
        data: [0, 0, 0, 0, 0],
        tension: 0.4,
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      y: {
        duration: 1000,
        easing: "easeOutQuart",
        from: (ctxVentes) => ctxVentes.chart.scales.y.bottom,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        display: false,
        beginAtZero: true,
      },
    },
  },
});

const myChartPlusVentes = document.querySelector("#chart-plus-ventes");

const ctxPlusVentes = new Chart(myChartPlusVentes, {
  type: "doughnut",
  data: {
    labels: ["", "", "", ""],
    datasets: [
      {
        data: [0, 0, 0, 0],
        label: "vendus",
      },
    ],
  },
  options: {
    animation: {
      animationRotate: true,
      numbers: {
        type: "number",
        duration: 1000,
        easing: "easeOutQuart",
        from: (ctxPlusVentes) => ctxPlusVentes.chart.scales.center,
      },
    },
    responsive: true,
    maintainAspectRatio: true,
  },
});

const myChartApercuVentes = document.querySelector("#chart-apercu-ventes");

const ctxApercuVentes = new Chart(myChartApercuVentes, {
  type: "bar",
  data: {
    labels: [
      "électronique",
      "Alimentation",
      "Automobile",
      "Vestimentaire",
      "Autres",
    ],
    datasets: [
      {
        data: [0, 0, 0, 0, 0],
        label: "categories",
      },
    ],
  },
  options: {
    animation: {
      y: {
        duration: 1000,
        easing: "easeOutQuart",
        from: (ctxApercuVentes) => ctxApercuVentes.chart.scales.y.bottom,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        display: false,
      },
    },
  },
});

function addData(chart, newData) {
  chart.data.datasets[0].data = [...newData];
  chart.update();
}

function addLabels(chart, newLabels) {
  chart.data.labels = [...newLabels];
  chart.update();
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
const PrixVente = document.querySelector("#prix-vente");
const prixAchat = document.querySelector("#prix-achat");
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
  prixAchat: false,
  prixVente: false,
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
    prixAchat: produitDatas["prix-achat"]?.trim(),
    prixVente: produitDatas["prix-vente"]?.trim(),
  };
  return produit;
}

function isValidFormAjouterProduit() {
  const valid =
    formStateAjouterProduit.nom &&
    formStateAjouterProduit.prixVente &&
    formStateAjouterProduit.quantite &&
    formStateAjouterProduit.categorie &&
    formStateAjouterProduit.prixAchat &&
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
    <td>${produit.prixAchat}</td>
    <td>${produit.prixVente}</td>
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
  PrixVente.addEventListener("input", () => {
    isValidInput(PrixVente, formStateAjouterProduit, "prixVente");
    isValidFormAjouterProduit();
  });
  prixAchat.addEventListener("input", () => {
    isValidInput(prixAchat, formStateAjouterProduit, "prixAchat");
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

      ajouterProduitSelect(produit);

      containerAjouterProduit.classList.remove("showFormAjouterProduit");

      formAjouterProduit.reset();

      textDefaultAjouterProduit.style.display = "none";

      utilisateur.updateProduits(produit);

      createStock();

      utilisateur.updateApercuStocks();

      utilisateur.updateActiviteRecente();

      Object.keys(formStateAjouterProduit).forEach((key) => {
        formStateAjouterProduit[key] = false;
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

function ajouterProduitSelect(produit) {
  const listeProduits = document.querySelector("#produits-commande");
  const option = document.createElement("option");
  option.textContent = `${produit.nom}  ${produit.prixVente}`;
  option.value = `${produit.nom}`;
  option.setAttribute("data-price", `${produit.prixVente}`);
  listeProduits.appendChild(option);
}

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
const infosProduitsCree = {};
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

    infosProduitsCree[nomProduit] = produit.quantite;

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
    checkStockQuantity(
      ArrayProduitsSelectionnes,
      infosProduitsCree,
      utilisateur.stocks,
    );
    return;
  }

  if (!produitsCree[parentName]) return;

  if (eltClique.classList.contains("augmenterProduit")) {
    produitsCree[parentName].augmneterQuantite();

    infosProduitsCree[parentName] += 1;

    updateProduitCommandeUI(parent, produitsCree[parentName]);
    checkStockQuantity(
      ArrayProduitsSelectionnes,
      infosProduitsCree,
      utilisateur.stocks,
    );
    return;
  }

  if (eltClique.classList.contains("diminuerProduit")) {
    produitsCree[parentName].diminuerQunatite();
    if (produitsCree[parentName].quantite <= 0) {
      removeProduitCommande(parent, parentName);
      delete infosProduitsCree[parentName];
    } else {
      updateProduitCommandeUI(parent, produitsCree[parentName]);
      infosProduitsCree[parentName] -= 1;
      checkStockQuantity(
        ArrayProduitsSelectionnes,
        infosProduitsCree,
        utilisateur.stocks,
      );
    }
    return;
  }
});

function checkStockQuantity(
  produitsAjoutes,
  quantiteProduitsAjoutes,
  produitsEnStock,
) {
  const existingMessage = formAjouterCommande.querySelector(".invalidProd");
  if (existingMessage) {
    existingMessage.remove();
    BtnAjouterProduitListe.disabled = false;
    BtnAjouterProduitListe.style.opacity = "1";
    formStateAjouterCommande.produitSelectionne = true;
    isValidFormCommande()
  }
  produitsAjoutes.forEach((prod) => {
    const produit = produitsEnStock.find((p) => p.nom === prod);
    const quantiteDemandee = Number(quantiteProduitsAjoutes[prod]);
    const stockDisponible = Number(produit?.stock);

    if (quantiteDemandee > stockDisponible) {
      const texte = document.createElement("p");
      texte.classList.add("invalidProd");
      texte.textContent = `Dépassement de quantité pour le produit ${prod} (disponible : ${stockDisponible}, demandé : ${quantiteDemandee}`;
      formAjouterCommande.insertBefore(
        texte,
        produitAjouteListe.nextElementSibling,
      );
      BtnAjouterProduitListe.disabled = true;
      btnAjouterCommandeForm.disabled = true;
      BtnAjouterProduitListe.style.opacity = "0.5";
      btnAjouterCommandeForm.style.opacity = "0.5";
      formStateAjouterCommande.produitSelectionne = false;
      isValidFormCommande()
    }
  });
}


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
  });

  dateCommande.addEventListener("change", () => {
    formStateAjouterCommande.dateCommande = true;
    isValidFormCommande();
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

  const commande = createCommande();

  utilisateur.updateCommandes(commande);

  utilisateur.updateActiviteRecente();

  textDefaultAjouterCommande.style.display = "none";
  containerAjouterCommande.classList.remove("showFormAjouterCommande");
  resetFormCommande();
});

function createCommande() {
  const commande = {
    idCommande: idCommande.value.trim(),
    nomClient: nomClient.value.trim(),
    produitsCommande: [...ArrayProduitsSelectionnes],
    quantite: ArrayProduitsSelectionnes.length,
    prixTotal: prixTotalCommande.textContent,
    dateCommande: dateCommande.value,
    infosProduits: { ...infosProduitsCree },
  };
  return commande;
}

function ajouterCommande() {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${idCommande.value}</td>
    <td>${nomClient.value}</td>
    <td>${ArrayProduitsSelectionnes.join(",")}</td>
    <td>${ArrayProduitsSelectionnes.length}</td>
    <td>${prixTotalCommande.textContent}</td>
    <td>${dateCommande.value}</td>
    <td> <button  class="btn-action-commande" data-parent = ${idCommande.value.trim()} >. . .</button> </td>
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
  Object.keys(infosProduitsCree).forEach(
    (key) => delete infosProduitsCree[key],
  );

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

//modifier une commande
tableCommande.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-action-commande");
  if (!btn) return;

  const openMenus = document.querySelectorAll(".action-commande-menu");
  openMenus.forEach((menu) => {
    if (!btn.contains(menu)) menu.remove();
  });

  const existing = btn.querySelector(".action-commande-menu");
  if (existing) {
    existing.remove();
    return;
  }

  const div = document.createElement("div");
  div.classList.add("action-commande-menu");
  const validerCommande = document.createElement("div");
  const validerCommandeText = document.createElement("span");
  const imgValiderCommade = document.createElement("img");
  imgValiderCommade.setAttribute("src", "icons/valider.png");
  validerCommande.classList.add("valider-commande");
  validerCommandeText.textContent = "valider";
  validerCommande.append(validerCommandeText, imgValiderCommade);

  const annulerCommande = document.createElement("div");
  const annulerCommandeText = document.createElement("span");
  const imgAnnulerCommande = document.createElement("img");
  imgAnnulerCommande.setAttribute("src", "icons/annuler.png");
  annulerCommandeText.textContent = "Annuler";
  annulerCommande.classList.add("annuler-commande");
  annulerCommande.append(annulerCommandeText, imgAnnulerCommande);

  div.append(validerCommande, annulerCommande);
  btn.parentElement.appendChild(div);
});

document.addEventListener("click", (e) => {
  if (
    e.target.closest(".btn-action-commande") ||
    e.target.closest(".action-commande-menu")
  )
    return;
  const openMenus = document.querySelectorAll(".action-commande-menu");
  openMenus.forEach((menu) => menu.remove());
});

//ajouter un stock

function createStock() {
  const produitsStock = utilisateur.updateStocks();
  const tableStocks = document.querySelector(".table-stocks tbody");
  const dernierElt = produitsStock.length - 1;
  const produit = produitsStock[dernierElt];
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${produit.nom}</td>
    <td>${produit.categorie}</td>
    <td>${produit.prix}</td>
    <td>${produit.stock}</td>
    `;
  tableStocks.prepend(tr);

  utilisateur.updateCategorieStock(produit);

  utilisateur.updateActiviteRecente();

  utilisateur.updateInventaireMois();

  document.querySelector(".text-default-stocks").style.display = "none";
}

//ajouter une vente

function createVente(elementCommande, idParent) {
  const commande = utilisateur.commandes.find(
    (cmd) => cmd.idCommande === idParent,
  );
  const vente = {
    date: commande.dateCommande,
    nomclient: commande.nomClient,
    produits: [...commande.produitsCommande],
    quantite: commande.quantite,
    prixTotal: commande.prixTotal,
    infosProduits: { ...commande.infosProduits },
  };
  elementCommande.classList.add("commandeValide");
  utilisateur.ventes.push(vente);
  utilisateur.updateVentesRecentesDashboard(vente);

  updateStockAfterSale(vente);

  const tableVentes = document.querySelector(".table-ventes tbody");
  const textDefaultVentes = document.querySelector(".text-default-ventes");

  ajouterVente(vente, tableVentes, textDefaultVentes);

  utilisateur.updateRevenusRecents();

  utilisateur.updateActiviteRecente();

  utilisateur.updateProduitsPlusVendus();
  return commande;
}

function updateStockAfterSale(vente) {
  if (!vente.infosProduits || Object.keys(vente.infosProduits).length === 0) {
    return;
  }

  Object.entries(vente.infosProduits).forEach(([nomProduit, quantiteVendue]) => {
    const produitIndex = utilisateur.produits.findIndex(
      (p) => p.nom === nomProduit
    );

    if (produitIndex !== -1) {
      const quantiteActuelle = Number(utilisateur.produits[produitIndex].quantite);
      const newQuantite = Math.max(0, quantiteActuelle - quantiteVendue);
      utilisateur.produits[produitIndex].quantite = String(newQuantite);

      updateProduitTableQuantity(nomProduit, newQuantite);
      updateStockTableQuantity(nomProduit, newQuantite);
    }
  });

  utilisateur.updateStocks();
}

function updateProduitTableQuantity(nomProduit, quantite) {
  const rows = document.querySelectorAll(".table-produits tbody tr");
  rows.forEach((row) => {
    const nameCell = row.querySelector("td:first-child");
    if (nameCell && nameCell.textContent.trim() === nomProduit) {
      const quantityCell = row.querySelectorAll("td")[3];
      if (quantityCell) {
        quantityCell.textContent = quantite;
      }
    }
  });
}

function updateStockTableQuantity(nomProduit, quantite) {
  const rows = document.querySelectorAll(".table-stocks tbody tr");
  rows.forEach((row) => {
    const nameCell = row.querySelector("td:first-child");
    if (nameCell && nameCell.textContent.trim() === nomProduit) {
      const quantityCell = row.querySelectorAll("td")[3];
      if (quantityCell) {
        quantityCell.textContent = quantite;
      }
    }
  });
}

function ajouterVente(vente, table, text) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${vente.date}</td>
    <td>${vente.nomclient}</td>
    <td>${vente.produits.join(", ")}</td>
    <td>${vente.quantite}</td>
    <td>${vente.prixTotal}</td>
    `;
  table.prepend(tr);
  text.style.display = "none";
}

tableCommande.addEventListener("click", (e) => {
  const validerElt = e.target.closest(".valider-commande");
  const annulerElt = e.target.closest(".annuler-commande");
  const actionCommandeMenu = e.target.closest(".action-commande-menu");
  if (!validerElt && !annulerElt) return;

  const parentTr = e.target.closest("tr");
  if (!parentTr) return;

  const actionBtn = parentTr.querySelector(".btn-action-commande");
  const idParent = actionBtn?.dataset?.parent;
  if (!idParent) return;

  if (validerElt) {
    createVente(parentTr, idParent);
    parentTr.classList.add("commandeValide");
    actionBtn.disabled = true;
    actionCommandeMenu.remove();

    utilisateur.updateApercuStocks();

    utilisateur.updateInventaireMois();
    return;
  }

  if (annulerElt) {
    const idx = utilisateur.commandes.findIndex(
      (c) => c.idCommande === idParent,
    );
    if (idx !== -1) utilisateur.commandes.splice(idx, 1);
    parentTr.remove();

    const nbreCommandes = document.querySelector(".commande-total");
    utilisateur.commandes.length > 1
      ? (nbreCommandes.textContent = `${utilisateur.commandes.length} commandes`)
      : (nbreCommandes.textContent = `${utilisateur.commandes.length} commande`);
    return;
  }
});

function ajouterProduitPlusvendus(tabNom, tabValeur) {
  const table = document.querySelector(".table-produits-plus-vendus tbody");
  table.innerHTML = "";
  if (tabNom.length === 0) return;
  for (let i = 0; i < tabNom.length; i++) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${tabNom[i]}</td>
    <td>${tabValeur[i]}</td>
    `;
    table.appendChild(tr);
  }
  document.querySelector(".text-default-produits-plus-vendus").style.display =
    "none";
}


//se deconnecter

const btnGetOut =  document.querySelector(".btn-get-out");
const seDecconnecterSec = document.querySelector(".se-deconnecter-sec");
btnGetOut.addEventListener("click", () =>{
  seDecconnecterSec.classList.add("showSecGetOut");
})

seDecconnecterSec.addEventListener("click", (event) =>{


  if(event.target === seDecconnecterSec){
    seDecconnecterSec.classList.remove("showSecGetOut");
    return
  }

  const btnClique = event.target.closest("button");
  if(!btnClique) return;

console.log(btnClique)
  if( btnClique.classList.contains("btn-se-deconnecter-annuler") ){
    seDecconnecterSec.classList.remove("showSecGetOut");
    return
  }

  if( btnClique.classList.contains("btn-se-deconnecter-ok") ){
      seDecconnecterSec.classList.remove("showSecGetOut");
      secConnexion.classList.add('secConnexionVisible');
      secConnexion.classList.remove('secConnexionInvisible');
      dashboard.classList.remove("showDashboard")
      return
  }
})



