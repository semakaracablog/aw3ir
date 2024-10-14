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
      const nowTimestamp = Date.now();

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
          // Afficher le modal si le formulaire est valide
          var myModal = new bootstrap.Modal(document.getElementById("myModal"));
          myModal.show();
      }
      console.log("form submitted");
  });
};
