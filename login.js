    document.getElementById("connection").addEventListener("submit", function (e) {
        e.preventDefault();
      
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

      
    
        fetch ("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password }),
        })
        .then((response) => {
            if (response.status === 200) {
                // L'utilisateur est connecté
                return response.json();
            } else if (response.status === 401) {
                // Informations d'identification incorrectes
                throw new Error("Adresse e-mail ou mot de passe incorrect");
            } else if (response.status === 404) {
                // Utilisateur non trouvé
                throw new Error("Utilisateur non trouvé");
            } else {
                // Autres erreurs
                throw new Error("Erreur lors de la connexion");
            }
        })
        .then((data) => {
            // Traitement des données de l'utilisateur en cas de succès
            console.log(data);
            var token = data.token;
            localStorage.setItem("token", token);
            console.log("token:", token)
            alert("Vous êtes connecté !");
            window.location.href = "index.html";
            afficherLienModale();
           
        })
        .catch((error) => {
            // Gestion des erreurs
            console.error("Erreur lors de la requête vers l'API : ", error.message);
            document.getElementById("erreur").innerText = error.message;
        });
    });




    

    


    
    
    
    

    
  





 
  
  
  
  
  
  