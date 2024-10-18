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
        if (validateForm()) {
            const lastName = document.getElementById("lastName").value.trim();
            const firstName = document.getElementById("firstName").value.trim();
            const birthday = document.getElementById("birthday").value;
            const address = document.getElementById("address").value.trim();

            const modalTitle = document.querySelector("#myModal .modal-title");
            modalTitle.textContent = `Bienvenue ${firstName} ${lastName}!`;

            const modalBody = document.querySelector("#myModal .modal-body");
            modalBody.innerHTML = `<p>Vous êtes nés le ${birthday} et vous habitez à l'adresse : ${address}.</p>`;

            const googleApiKey = "AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg";
            const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?markers=${encodeURIComponent(address)}&zoom=7&size=400x300&scale=2&key=${googleApiKey}`;
            const mapLinkUrl = `http://maps.google.com/maps?q=${encodeURIComponent(address)}`;

            const mapContainer = document.getElementById("mapContainer");
            mapContainer.innerHTML = `
                <a href="${mapLinkUrl}" target="_blank">
                    <img src="${mapUrl}" alt="Carte de ${address}" class="img-fluid">
                </a>
            `;

            var myModal = new bootstrap.Modal(document.getElementById("myModal"));
            myModal.show();
        }
        console.log("form submitted");
    });

    // Fonction pour afficher le nombre de caractères en temps réel
    function updateCharCount(inputId, countId) {
        const input = document.getElementById(inputId);
        const countDisplay = document.getElementById(countId);

        input.addEventListener("input", function () {
            const charCount = input.value.length;
            countDisplay.textContent = `${charCount} caractères`;
        });
    }

    // Appel des fonctions pour chaque champ de saisie
    updateCharCount("lastName", "lastNameCount");
    updateCharCount("firstName", "firstNameCount");
    updateCharCount("address", "addressCount");
    updateCharCount("email", "emailCount");

    // Fonction pour obtenir la géolocalisation et centrer la carte
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            alert("La géolocalisation n'est pas supportée par ce navigateur.");
        }
    }

    function showPosition(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        document.getElementById("address").value = `${lat},${lng}`

        const googleApiKey = "AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg";
        const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?markers=color:red%7C${lat},${lng}&zoom=14&size=400x300&scale=2&key=${googleApiKey}`;
        const mapLinkUrl = `http://maps.google.com/maps?q=${lat},${lng}`;

        const mapContainer = document.getElementById("mapContainer");
        mapContainer.innerHTML = `
            <a href="${mapLinkUrl}" target="_blank">
                <img src="${mapUrl}" alt="Carte centrée sur votre position" class="img-fluid">
            </a>
        `;
    }

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("L'utilisateur a refusé la demande de géolocalisation.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Les informations de localisation ne sont pas disponibles.");
                break;
            case error.TIMEOUT:
                alert("La demande de géolocalisation a expiré.");
                break;
            case error.UNKNOWN_ERROR:
                alert("Une erreur inconnue s'est produite.");
                break;
        }
    }

    // Intercepter le clic sur le bouton de géolocalisation
    const geoBtn = document.getElementById("geoBtn");
    if (geoBtn) {
        geoBtn.addEventListener("click", getLocation);
    }




    //tableau




document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateForm()) {
        const lastName = document.getElementById("lastName").value.trim();
        const firstName = document.getElementById("firstName").value.trim();
        const birthday = document.getElementById("birthday").value;
        const address = document.getElementById("address").value.trim();

        // Créer un nouvel objet contact
        const contact = { lastName, firstName, birthday, address };

        // Récupérer la liste des contacts depuis le localStorage ou créer une liste vide
        let contactList = JSON.parse(localStorage.getItem('contactList')) || [];

        // Ajouter le nouveau contact à la liste
        contactList.push(contact);

        // Mettre à jour le localStorage avec la nouvelle liste
        localStorage.setItem('contactList', JSON.stringify(contactList));

        // Rafraîchir l'affichage de la liste des contacts
        displayContactList();
    }
});




// Fonction pour afficher la liste des contacts dans le tableau
function displayContactList() {
    const contactListString = localStorage.getItem('contactList');
    const contactList = contactListString ? JSON.parse(contactListString) : [];

    // Sélectionner la <tbody> du tableau
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = "";  // Vider le tableau avant d'ajouter les contacts


    // Parcourir la liste des contacts et ajouter une ligne pour chaque contact
    contactList.forEach((contact, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${contact.lastName}</td>
                <td>${contact.firstName}</td>
                <td>${contact.birthday}</td>
                <td>${contact.address}</td>
                <td>${contact.email}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteContact(${index})">Supprimer</button>
                </td>
            </tr>
        `;
    });
}

// Fonction pour supprimer un contact
window.deleteContact = function (index) {
    // Récupérer la liste des contacts
    let contactList = JSON.parse(localStorage.getItem('contactList')) || [];

    // Retirer le contact à l'index donné
    contactList.splice(index, 1);

    // Mettre à jour le localStorage avec la nouvelle liste
    localStorage.setItem('contactList', JSON.stringify(contactList));

    // Rafraîchir l'affichage de la liste des contacts
    displayContactList();
};

// Afficher la liste des contacts au chargement de la page
displayContactList();
};
