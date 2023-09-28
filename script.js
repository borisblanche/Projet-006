async function getProjets() {
  const response = await fetch("http://localhost:5678/api/works");
  const projets = await response.json();
  return projets;
}

async function afficherProjets() {
  console.log("page chargée");

  const projets = await getProjets();

  const sectionGallery = document.querySelector(".gallery");
  sectionGallery.innerHTML = "";

  for (let i = 0; i < projets.length; i++) {
    const mesProjet = projets[i];

    const projetElement = document.createElement("figure");

    const imageElement = document.createElement("img");
    imageElement.src = mesProjet.imageUrl;

    const nomElement = document.createElement("p");
    nomElement.innerText = mesProjet.title;

    sectionGallery.appendChild(projetElement);
    projetElement.appendChild(imageElement);
    projetElement.appendChild(nomElement);
  }
}
afficherProjets();

async function afficherProjetsObjets() {
  const projets = await getProjets();

  const projetsObjets = projets.filter(function (projet) {
    return projet.category.name === "Objets";
  });

  const sectionGallery = document.querySelector(".gallery");
  sectionGallery.innerHTML = "";

  for (let i = 0; i < projetsObjets.length; i++) {
    const mesProjet = projetsObjets[i];

    const projetElement = document.createElement("figure");

    const imageElement = document.createElement("img");
    imageElement.src = mesProjet.imageUrl;

    const nomElement = document.createElement("p");
    nomElement.innerText = mesProjet.title;

    sectionGallery.appendChild(projetElement);
    projetElement.appendChild(imageElement);
    projetElement.appendChild(nomElement);
  }
}

async function afficherAppartements() {
  const projets = await getProjets();

  const projetAppartements = projets.filter(function (projet) {
    return projet.category.name === "Appartements";
  });

  const sectionGallery = document.querySelector(".gallery");
  sectionGallery.innerHTML = "";
  for (let i = 0; i < projetAppartements.length; i++) {
    const mesProjet = projetAppartements[i];

    const projetElement = document.createElement("figure");

    const imageElement = document.createElement("img");
    imageElement.src = mesProjet.imageUrl;

    const nomElement = document.createElement("p");
    nomElement.innerText = mesProjet.title;

    sectionGallery.appendChild(projetElement);
    projetElement.appendChild(imageElement);
    projetElement.appendChild(nomElement);
  }
}

async function afficherHotels() {
  const projets = await getProjets();

  const projetHotels = projets.filter(function (projet) {
    return projet.category.name === "Hotels & restaurants";
  });

  const sectionGallery = document.querySelector(".gallery");
  sectionGallery.innerHTML = "";

  for (let i = 0; i < projetHotels.length; i++) {
    const mesProjet = projetHotels[i];

    const projetElement = document.createElement("figure");

    const imageElement = document.createElement("img");
    imageElement.src = mesProjet.imageUrl;

    const nomElement = document.createElement("p");
    nomElement.innerText = mesProjet.title;

    sectionGallery.appendChild(projetElement);
    projetElement.appendChild(imageElement);
    projetElement.appendChild(nomElement);
  }
}

const boutonObjet = document.querySelector(".btn-objets");
boutonObjet.addEventListener("click", afficherProjetsObjets);

const boutonTous = document.querySelector(".btn-tous");
boutonTous.addEventListener("click", afficherProjets);

const boutonappartements = document.querySelector(".btn-appartements");
boutonappartements.addEventListener("click", afficherAppartements);

const boutonhotels = document.querySelector(".btn-hotels");
boutonhotels.addEventListener("click", afficherHotels);

//----------Bouton Modifier----------------//

function afficherLienModale() {
  const token = localStorage.getItem("token");
  const afficherBtnModifier = document.getElementById("myBtn");

  if (token && afficherBtnModifier) {
    myBtn.classList.remove("hidden");
  } else {
    myBtn.classList.add("hidden");
  }
}
window.addEventListener("load", afficherLienModale);
