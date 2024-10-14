window.onload = function () {
    console.log("DOM ready!");
  
    // Fonction pour valider email + nb char min
    function validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  
    // Fonction pour valider tous les input du form
    function validateForm() {
      const lastName = document.getElementById("lastName").value.trim();
      const firstName = document.getElementById("firstName").value.trim();
      const birthday = document.getElementById("birthday").value;
      const email = document.getElementById("email").value.trim();
      const address = document.getElementById("address").value.trim();
  
      if (lastName.length < 5) {
        alert("Le nom doit contenir au moins 5 caractères.");
        return false;
      }
      if (firstName.length < 5) {
        alert("Le prénom doit contenir au moins 5 caractères.");
        return false;
      }
      if (birthday === "") {
        alert("La date de naissance ne doit pas être vide");
        return false;
      }
  
      // Vérifier que la date de naissance n'est pas dans le futur
      const birthdayDate = new Date(birthday);
      const today = new Date();
  
      if (birthdayDate > today) {
        alert("La date de naissance ne doit pas être dans le futur");
        return false;
      }
  
      if (!validateEmail(email)) {
        alert("L'email n'est pas valide");
        return false;
      }
      if (address.length < 5) {
        alert("L'adresse doit contenir au moins 5 caractères.");
        return false;
      }
  
      return true;
    }
  
    document.getElementById("myForm").addEventListener("submit", function (event) {
      event.preventDefault(); 
      // Empêche la soumission classique du formulaire
      if (validateForm()) {
        // Récupérer les informations saisies par l'utilisateur
        const lastName = document.getElementById("lastName").value.trim(); // Récupérer le nom
        const firstName = document.getElementById("firstName").value.trim(); // Récupérer le prénom
        const birthday = document.getElementById("birthday").value;
        const address = document.getElementById("address").value.trim();
  
        // titre personalisé / bienvenue (nom, prénom)
        const modalTitle = document.querySelector("#myModal .modal-title");
        // Mettre à jour le titre du modal avec "Bienvenue + Prénom Nom"
        modalTitle.textContent = `Bienvenue ${firstName} ${lastName}!`;
  
        // description de l'adresse
        const modalBody = document.querySelector("#myModal .modal-body");
        // Ajouter un message personnalisé
        modalBody.innerHTML = `<p>Vous êtes nés le ${birthday} et vous habitez à l'adresse : ${address}.</p>`;
  
        // google API KEY
        const googleApiKey = "AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg"; // API key Google maps
        // l'adresse saisie par l'utilisateur pour centrer la carte
        const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?markers=${encodeURIComponent(address)}&zoom=14&size=400x300&scale=2&key=${googleApiKey}`;
        const mapLinkUrl = `http://maps.google.com/maps?q=${encodeURIComponent(address)}`;
        
        // Sélectionne l'élément HTML où insérer l'image
        const mapContainer = document.getElementById("mapContainer");
        // Ajoute l'image de la carte avec le lien direct vers Google Maps
        mapContainer.innerHTML = `
          <a href="${mapLinkUrl}" target="_blank">
            <img src="${mapUrl}" alt="Carte de ${address}" class="img-fluid">
          </a>
        `;
  
        // ça affiche le modal si le formulaire est valide
        var myModal = new bootstrap.Modal(document.getElementById("myModal"));
        myModal.show();
      }

      // pas nécessaire mais bonne habitude
      console.log("form submitted");
    });
  };
  