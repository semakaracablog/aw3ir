document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const resultDiv = document.createElement('div');
    
    resultDiv.innerHTML = `
      <p><strong>Nom :</strong> ${params.get('nom')}</p>
      <p><strong>Prénom :</strong> ${params.get('prenom')}</p>
      <p><strong>Date de naissance :</strong> ${params.get('date_naissance')}</p>
      <p><strong>Adresse :</strong> ${params.get('adresse')}</p>
      <p><strong>Email :</strong> ${params.get('email')}</p>
    `;
    
    document.body.appendChild(resultDiv);
  });

  window.onload = () => {
    // https://developer.mozilla.org/fr/docs/Web/API/Window/load_event
    const paramsString = document.location.search; // récupérer des données envoyées par le formulaire
    const searchParams = new URLSearchParams(paramsString); // https://developer.mozilla.org/fr/docs/Web/API/URLSearchParams
  
    // Iterating the search parameters
    for (const param of searchParams) {
      console.log(param);
  
      const elementId = param[0];
      const elementValue = param[1];
      const element = document.getElementById(elementId);
  
      if (element !== null) {
        element.textContent = elementValue;
      }
      if (param[0] === "address") {
        element.href = `https://www.google.com/maps/search/?api=1&query=${elementValue}`;
      } else if (param[0] === "email") {
        element.href = `mailto:${elementValue}?subject=Hello!&body=What's up?`;
      }
    }
  };
  
  const element = document.getElementById(param[0]);
  if (element !== null) {
    element.textContent = param[1];
  }
  if (param[0] === "address") {
    const addressValue = param[1];
    element.href = `https://www.google.com/maps/search/?api=1&query=${addressValue}`;
  }

  if (param[0] === "email") {
    const emailValue = param[1];
    element.href = `mailto:${emailValue}?subject=Hello!&body=What's up?`;
  }
  