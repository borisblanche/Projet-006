async function getProjets() {
  const response = await fetch("http://localhost:5678/api/works");
  const projets = await response.json();
  console.log("projets recuperes:", projets);
  return projets;
}

async function afficherProjets() {
  const projets = await getProjets();

  const sectionGallery = document.querySelector(".gallery-modal");

  const modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");

  const closeModale = document.createElement("button");
  closeModale.textContent = "";
  closeModale.classList.add("btn-close", "fa-solid", "fa-xmark");
  closeModale.addEventListener("click", function () {
    window.location.href = "index.html";
  });

  const titreModale = document.createElement("h3");
  titreModale.textContent = "galerie photo";
  titreModale.id = "titremodal";

  const galleryContent = document.createElement("div");
  galleryContent.classList.add("gallery-content");

  modalHeader.appendChild(closeModale);
  sectionGallery.appendChild(modalHeader);
  sectionGallery.appendChild(titreModale);

  const separation = document.createElement("hr");
  separation.textContent = "";

  const AjoutPhotoModale = document.createElement("button");
  AjoutPhotoModale.classList.add("btn-ajout", "btn-modal");
  AjoutPhotoModale.textContent = "Ajouter une Photo ";
  AjoutPhotoModale.addEventListener("click", openModalAjoutPhoto);


  for (let i = 0; i < projets.length; i++) {
    const mesProjet = projets[i];

    const projetElement = document.createElement("figure");

    const deleteButton = document.createElement("button");

    deleteButton.textContent = "";
    deleteButton.classList.add("fa-solid", "fa-trash-can", "btn-delete");
    deleteButton.setAttribute("data-id", mesProjet.id);
    deleteButton.addEventListener("click", () =>
      supprimerProjetDansAPI(mesProjet.id)
    );

    const imageElement = document.createElement("img");
    imageElement.src = mesProjet.imageUrl;

    const nomElement = document.createElement("p");
    nomElement.innerText = mesProjet.title;
    nomElement.setAttribute("data-id", mesProjet.title);
    nomElement.classList.add("nom-element");

    galleryContent.appendChild(projetElement);
    projetElement.appendChild(imageElement);
    projetElement.appendChild(deleteButton);
    projetElement.appendChild(nomElement);

    sectionGallery.appendChild(galleryContent);
    sectionGallery.appendChild(separation);
    sectionGallery.appendChild(AjoutPhotoModale);
 
  }
}

//------------->  Supprimer Projet dans API      <--------------------------------

async function supprimerProjetDansAPI(workId) {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200 || response.status === 204) {
      console.log(
        `Projet avec l'ID ${workId} supprimé dans l'API avec succès.`
      );
      window.location.href = "index.html";
      // afficherProjets();
    } else if (response.status === 401) {
      console.error(
        `Échec de la suppression du projet avec l'ID ${workId} : Non autorisé.`
      );
    } else if (response.status === 500) {
      console.error(
        `Échec de la suppression du projet avec l'ID ${workId} : Comportement inattendu.`
      );
    } else {
      console.log(response.status);
      console.error(
        `Échec de la suppression du projet avec l'ID ${workId} : Erreur inconnue.`
      );
    }
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la suppression du projet dans l'API :",
      error
    );
  }
}


////////--------MODAL----------////////////////////

const modal = document.getElementById("myModal");

const btn = document.getElementById("myBtn");
btn.addEventListener("click", afficherProjets);

const span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
//--------------------> Modal Ajout Photo <---------------------------------------------------------



async function openModalAjoutPhoto() {
  const sectionGallery = document.querySelector(".gallery-modal");
  sectionGallery.innerHTML = "";
  
    const backModalbtn = document.createElement("button");
    backModalbtn.textContent = "";
    backModalbtn.classList.add("btn-retour", "fa-solid", "fa-arrow-left");

    backModalbtn.addEventListener("click", () => {
      const sectionGallery = document.querySelector(".gallery-modal");
      sectionGallery.innerHTML = "";
        afficherProjets();
    });

    const close = document.createElement("button");
    close.textContent = "";
    close.classList.add("btn-close", "fa-solid", "fa-xmark");
    close.addEventListener("click", function () {
      window.location.href = "index.html";
    });

    const modalInputHeader = document.createElement("div");
    modalInputHeader.classList.add("modal-input-header");

    modalInputHeader.appendChild(backModalbtn);
    modalInputHeader.appendChild(close);

    const titreAjoutPhoto = document.createElement("h3");
    titreAjoutPhoto.textContent = "Ajout photo";
    titreAjoutPhoto.id = "titremodal";

  const inputImageContent = document.createElement("div");
  inputImageContent.classList.add("input-content-image");

    const addPhotoForm = document.createElement("form");
    addPhotoForm.id = "addPhotoForm";
    addPhotoForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const photoTitle = addPhotoForm.elements.photoTitle.value;
      const photoImage = addPhotoForm.elements.photoImage.files[0];

      const photoCategory = addPhotoForm.elements.photoCategory.value;

      if (photoTitle && photoImage && photoCategory) {
        await envoyerPhotoAPI(photoTitle, photoImage, photoCategory);
      }
    });

    const imageLabel = document.createElement("label");
    imageLabel.textContent = "jpg,png : 4mo max";
    imageLabel.classList.add("image-label");

    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.id = "photoImage";
    imageInput.name = "photoImage";
    imageInput.style.display = "none";
    imageInput.classList.add("image-input");

    const customFileButton = document.createElement("button");
    customFileButton.textContent = "+ Ajouter photo";
    customFileButton.classList.add("custom-file-button");

    customFileButton.addEventListener("click", () => {
      imageInput.click();
    });

    const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#cbd6dc}</style><path d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>`;
    const svgDataUrl = `data:image/svg+xml;base64,${btoa(svgCode)}`;



    const imagePreview = document.createElement("img");
    imagePreview.id = "imagePreview";
    imagePreview.src = "";
    imagePreview.alt = "";
    imagePreview.style.backgroundImage = `url('${svgDataUrl}')`;
    imagePreview.style.backgroundSize = "80%";
    imagePreview.style.backgroundRepeat = "no-repeat";
    imagePreview.style.backgroundPosition = "center";
    imagePreview.classList.add("custom-background");
    imagePreview.style.width = "76px";
    imagePreview.style.minHeight = "76px";


    imageInput.addEventListener("change", (event) => {
      const selectedImage = event.target.files[0];
      if (selectedImage) {
        const imageUrl = URL.createObjectURL(selectedImage);
        imagePreview.src = imageUrl;
        imagePreview.style.minWidth = "30%";
        imagePreview.style.height = "110%";
        imagePreview.style.marginBottom = "0";
        imagePreview.style.marginTop = "0";
        imagePreview.style.display = "absolute";
        imageLabel.style.display = "none";
        customFileButton.style.display = "none";
      } else {
        imagePreview.src = "";
      }
    });

    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Titre";
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.id = "photoTitle";
    titleInput.name = "photoTitle";
  

    const categoryLabel = document.createElement("label");
    categoryLabel.textContent = "Catégorie";
    const categorySelect = document.createElement("select");
    categorySelect.id = "photoCategory";
    categorySelect.name = "photoCategory";

    fetch("http://localhost:5678/api/categories")
      .then((response) => response.json())
      .then((categories) => {
        console.log("categories:", categories);
        categories.forEach((category) => {
          const option = document.createElement("option");
          option.value = category.id;
          option.textContent = category.name;
          categorySelect.appendChild(option);
        });
      });
    const separation = document.createElement("hr");
    separation.classList.add("separation");

    const addButton = document.createElement("button");
    addButton.classList.add("btn-modal", "btn-valider");
    addButton.type = "submit";
    addButton.textContent = "Valider";

    addPhotoForm.appendChild(modalInputHeader);
    addPhotoForm.appendChild(titreAjoutPhoto);
    addPhotoForm.appendChild(inputImageContent);

    inputImageContent.appendChild(imagePreview);
    inputImageContent.appendChild(imageInput);
    inputImageContent.appendChild(customFileButton);
    inputImageContent.appendChild(imageLabel);

    addPhotoForm.appendChild(titleLabel);
    addPhotoForm.appendChild(titleInput);
    addPhotoForm.appendChild(categoryLabel);
    addPhotoForm.appendChild(categorySelect);
    addPhotoForm.appendChild(separation);
    addPhotoForm.appendChild(addButton);
    sectionGallery.appendChild(addPhotoForm);

 
  }

//---------> Envoi Image vers API <----------------

async function envoyerPhotoAPI(photoTitle, photoImage, photoCategory) {
  const token = localStorage.getItem("token");

  try {
    const formData = new FormData();
    formData.append("title", photoTitle);
    formData.append("image", photoImage);
    formData.append("category", photoCategory);

    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.status === 201) {
      console.log("Photo ajoutée avec succès dans l'API.");
      // Rafraîchir la galerie après l'ajout
      // afficherProjets();
      window.location.href = "index.html";
    } else if (response.status === 401) {
      console.error("Échec de l'ajout de la photo : Non autorisé.");
    } else if (response.status === 500) {
      console.error("Échec de l'ajout de la photo : Comportement inattendu.");
    } else {
      console.error("Échec de l'ajout de la photo : Erreur inconnue.");
    }
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de l'ajout de la photo dans l'API :",
      error
    );
  }
}
