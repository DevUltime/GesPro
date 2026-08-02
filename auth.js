const userName = document.querySelector("#name");
const userEmail = document.querySelector("#email");
const userPassword = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const checkTerms = document.querySelector("#check-terms");

const userEmailConnexion = document.querySelector("#connexion-email");
const userPasswordConnexion = document.querySelector("#connexion-password");

const btnInscription = document.querySelector(".btn-inscription");
const btnConnexion = document.querySelector(".btn-connexion");

const formInscription = document.querySelector(".formulaire-inscription");
const formConnexion = document.querySelector(".formulaire-connexion");

const formStateInscription = {
  name: false,
  email: false,
  password: false,
  confirmpassword: false,
  check: false,
};

const formStateConnexion = {
  email: false,
  password: false,
};

//vérifier le nom
function isValidName(state = formStateInscription) {
  const valid = userName.value.trim().length >= 3;
  const msgErreur = document.querySelector(".msg-erreur-name");
  valid
    ? msgErreur.classList.remove("showMsgErreur")
    : msgErreur.classList.add("showMsgErreur");
  state.name = valid;
  return valid;
}

//vérifier l'email
function isValidEmail(Email, state = formStateInscription) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const valid = emailRegex.test(Email.value.trim());
  const msgErreur = document.querySelector(".msg-erreur-email");
  valid
    ? msgErreur.classList.remove("showMsgErreur")
    : msgErreur.classList.add("showMsgErreur");
  state.email = valid;
  return valid;
}

//vérifier le mot de passe
function isValidPassword(Password, state = formStateInscription) {
  const valid = Password.value.trim().length >= 6;
  const msgErreur = document.querySelector(".msg-erreur-password");
  valid
    ? msgErreur.classList.remove("showMsgErreur")
    : msgErreur.classList.add("showMsgErreur");
  state.password = valid;
  return valid;
}

//vérifier la confirmation du mot de passe
function isValidConfirmPassword(ConfirmPassword, Password, state = formStateInscription) {
  const valid = ConfirmPassword.value.trim() === Password.value.trim();
  const msgErreur = document.querySelector(".msg-erreur-confirm-password");
  valid
    ? msgErreur.classList.remove("showMsgErreur")
    : msgErreur.classList.add("showMsgErreur");
  state.confirmpassword = valid;
  return valid;
}

//vérifier si le bouton est coché
function checkboxIsChecked(state = formStateInscription) {
  const valid = checkTerms.checked;
  state.check = valid;
  return valid;
}

//verification du formulaire inscription
function isValidFormInscription() {
  const valid =
    formStateInscription.name &&
    formStateInscription.email &&
    formStateInscription.password &&
    formStateInscription.check &&
    formStateInscription.confirmpassword;

  btnInscription.disabled = !valid;
  btnInscription.style.opacity = valid ? "1" : "0.8";
  return valid;
}

function initFormInscription() {
  btnInscription.style.opacity = ".8";
  btnInscription.disabled = true;

  userName.addEventListener("input", () => {
    isValidName(formStateInscription);
    isValidFormInscription();
  });

  userEmail.addEventListener("input", () => {
    isValidEmail(userEmail, formStateInscription);
    isValidFormInscription();
  });

  userPassword.addEventListener("input", () => {
    isValidPassword(userPassword, formStateInscription);
    isValidFormInscription();
  });

  confirmPassword.addEventListener("input", () => {
    isValidConfirmPassword(confirmPassword, userPassword, formStateInscription);
    isValidFormInscription();
  });

  checkTerms.addEventListener("change", () => {
    checkboxIsChecked(formStateInscription);
    isValidFormInscription();
  });

  formInscription.addEventListener("submit", (e) => {
    e.preventDefault();
    createUser();
    const texBtn = document.querySelector(".btn-inscription .text-btn")
    texBtn.textContent = "Creation en cours...";
    btnInscription.disabled = true;

    setTimeout(() => {

      if( validateEmail() ){
        createPopUp("inscription réussie", "popUpValid");
        formInscription.reset();
        secInscription.classList.add('secInscriptionInvisible');
        secInscription.classList.remove('secInscriptionVisible');
      }else{
        createPopUp("Cet email a déjà été utilisée", "popUpInvalid");
      }
        texBtn.textContent = "Créer un compte";
        btnInscription.disabled = false;
    }, 2000);

  });
}
initFormInscription();

function validateEmail(){
  const userEmailValue = userEmail.value;
  const valid = JSON.parse( localStorage.getItem(userEmailValue) || "null")
  return valid === null;
}

//formater les donnes pour stocker
function formatDatas(form) {
  const formData = new FormData(form);
  const userDatas = Object.fromEntries(formData);
  const userDataFormated = {
    nom: userDatas?.Nom?.trim(),
    prenom: userDatas?.Prenom?.trim(),
    email: userDatas.Email.trim(),
    password: userDatas.Password.trim(),
  };

  return userDataFormated;
}

//stockter l'utilisateur dans le stockage local
function createUser() {
  const userDatas = formatDatas(formInscription);
  localStorage.setItem(userDatas.email, JSON.stringify(userDatas));
}

function createPopUp(text, classe) {
  const div = document.createElement("div");
  div.classList.add(classe);
  div.textContent = text;
  document.body.appendChild(div);

  setTimeout(() =>{
    div.remove();
  },5000)

}

//gestion de connexion
function isValidFormConnexion() {
  const valid = formStateConnexion.email && formStateConnexion.password;
  btnConnexion.disabled = !valid;
  btnConnexion.style.opacity = valid ? "1" : "0.8";
  return valid;
}

//initialiser le formulaire
function initFormConnexion() {
  btnConnexion.disabled = true;
  btnConnexion.style.opacity = "0.8";

  userEmailConnexion.addEventListener("input", () => {
    isValidEmail(userEmailConnexion, formStateConnexion);
    isValidFormConnexion();
  });

  userPasswordConnexion.addEventListener("input", () => {
    isValidPassword(userPasswordConnexion, formStateConnexion);
    isValidFormConnexion();
  });

  formConnexion.addEventListener("submit", (e) => {
    e.preventDefault();
    const textBtn = document.querySelector(".btn-connexion .text-btn"); 
    textBtn.textContent = "Connexion en cours...";
    btnConnexion.disabled = true;
    setTimeout(() =>{
      if (checkUser()) {
        createPopUp("connexion réussie", "popUpValid");
        secConnexion.classList.remove('secConnexionVisible');
        secConnexion.classList.add('secConnexionInvisible');
      } else {
        createPopUp("Aucun compte trouvé, veuillez ressayer", "popUpInvalid");
      }
      textBtn.textContent = "Se connecter"
      formConnexion.reset()
    },2000)

  });
}

initFormConnexion();

//verifier si l'utilisateur est dans la base de données
function checkUser() {
  const userDatasFormated = formatDatas(formConnexion);
  const localDatas = JSON.parse(localStorage.getItem(userDatasFormated.email) || "null");

  if (localDatas !== null) {
    return (
      localDatas.email === userDatasFormated.email &&
      localDatas.password === userDatasFormated.password
    );
  }

  return false;
}