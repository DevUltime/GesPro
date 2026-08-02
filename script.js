"use strict";
const showSecInscription = document.querySelector("#show-sec-inscription");
const showSecConnexion = document.querySelector("#show-sec-connexion");
const secInscription = document.querySelector(".inscription-sec");
const secConnexion = document.querySelector(".connexion-sec");

secConnexion.classList.add("secConnexionInvisible");
secInscription.classList.add("secInscriptionInvisible");

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

//afficher et masquer les sections de l'aside

const displayZoneArray = Array.from( document.querySelectorAll(".display-zone") );
const displayBtnsArray = Array.from( document.querySelectorAll(".display-btn") );
const BtnsAsideBar = document.querySelector(".btns-aside-bar");
const sectionActiveText = document.querySelector(".section-active-text")

//afficher le dashboard par defaut
displayZoneArray[0].classList.add("displayZoneActive");

function showDisplayZone(eltClique) {
  for (let elt of displayBtnsArray) {
    if (elt.getAttribute("aria-current")) {
      elt.setAttribute("aria-current", false);
      const posElt = displayBtnsArray.indexOf(elt)
      displayZoneArray[posElt].classList.remove("displayZoneActive")
    }
  }
  eltClique.setAttribute("aria-current", true);
  const posEltClique = displayBtnsArray.indexOf(eltClique);
  displayZoneArray[posEltClique].classList.add('displayZoneActive')
}

BtnsAsideBar.addEventListener("click", (e) => {
  e.stopPropagation();
  const eltClique = e.target.closest("button");
  if (!eltClique) return;
  sectionActiveText.textContent = eltClique.textContent;
  showDisplayZone(eltClique);
});
