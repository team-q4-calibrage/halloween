import { products } from './data.js';
import { addToCart, updateCartBadge, getCartDetails, removeFromCart } from './cart.js';

// 1. Compte à rebours Marketing
function initCountdown() {
  const timerElement = document.getElementById('timer');
  if (!timerElement) return;

  let timeInSeconds = 15792; // Temps d'urgence fictif

  setInterval(() => {
    let h = Math.floor(timeInSeconds / 3600);
    let m = Math.floor((timeInSeconds % 3600) / 60);
    let s = timeInSeconds % 60;

    timerElement.textContent = `${h}h ${m < 10 ? '0' : ''}${m}m ${s < 10 ? '0' : ''}${s}s`;
    if (timeInSeconds > 0) timeInSeconds--;
  }, 1000);
}

// 2. Affichage dynamique du catalogue
function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  grid.innerHTML = products.map(product => `
    <article class="product-card">
      <span class="badge-stock">🔥 Plus que ${product.stock} en stock !</span>
      <img src="${product.image}" alt="${product.title}" loading="lazy" width="300" height="300">
      <h3>${product.title}</h3>
      <p class="description">${product.description}</p>
      <div class="price">
        <span class="new-price">${product.price.toFixed(2)} €</span>
        <del class="old-price">${product.oldPrice.toFixed(2)} €</del>
      </div>
      <button class="btn-cta add-btn" data-id="${product.id}">Ajouter au panier 🛒</button>
    </article>
  `).join('');

  // Ajout des évènements sur les boutons
  document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      addToCart(id);
    });
  });
}

// 3. Affichage du panier sur checkout.html
function renderCheckout() {
  const cartContainer = document.getElementById('checkout-cart-items');
  const totalContainer = document.getElementById('cart-total');
  if (!cartContainer) return;

  const items = getCartDetails();

  if (items.length === 0) {
    cartContainer.innerHTML = "<p>Votre panier est vide pour le moment 👻</p>";
    if (totalContainer) totalContainer.textContent = "0.00 €";
    return;
  }

  let total = 0;
  cartContainer.innerHTML = items.map(item => {
    total += item.subtotal;
    return `
      <div class="cart-item">
        <div>
          <h4>${item.title} (x${item.quantity})</h4>
          <p>${item.price.toFixed(2)} € / unité</p>
        </div>
        <div>
          <strong>${item.subtotal.toFixed(2)} €</strong>
          <button class="remove-btn" data-id="${item.id}">❌</button>
        </div>
      </div>
    `;
  }).join('');

  if (totalContainer) totalContainer.textContent = `${total.toFixed(2)} €`;

  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      removeFromCart(id);
      renderCheckout();
    });
  });
}

// 4. Commande WhatsApp
function initWhatsApp() {
  const waBtn = document.getElementById('whatsapp-btn');
  if (!waBtn) return;

  waBtn.addEventListener('click', () => {
    const nom = document.getElementById('nom')?.value;
    const tel = document.getElementById('telephone')?.value;
    const items = getCartDetails();

    if (!nom || !tel) {
      alert("Veuillez remplir votre nom et numéro de téléphone.");
      return;
    }

    let summary = items.map(i => `- ${i.title} (x${i.quantity}) : ${i.subtotal.toFixed(2)}€`).join('\n');
    let message = `Bonjour, je souhaite valider ma commande d'Halloween :\n\n${summary}\n\nClient : ${nom}\nTéléphone : ${tel}`;

    window.open(`https://wa.me/22900000000?text=${encodeURIComponent(message)}`, '_blank');
  });
}



// 5. Envol et grimpée (Chauves-souris SVG & Araignées émojis)
function initSpookyAnimations() {
  let showBats = true; // Alterne entre chauves-souris et araignées

  function launchCreatureSwarm() {
    // Nettoie les anciennes créatures
    document.querySelectorAll('.spooky-creature-wrapper').forEach(el => el.remove());

    const totalCreatures = 6; // Nombre de créatures par vague

    for (let i = 0; i < totalCreatures; i++) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('spooky-creature-wrapper');

      // Décalages aléatoires
      const randomLeft = Math.floor(Math.random() * 80) + 10;
      const randomDelay = (Math.random() * 1.5).toFixed(2);
      const randomSize = Math.floor(Math.random() * 30) + 40; // Taille entre 40px et 70px

      wrapper.style.left = `${randomLeft}%`;
      wrapper.style.animationDelay = `${randomDelay}s`;

      if (showBats) {
        // 🦇 Chauve-souris en SVG réaliste avec battement d'ailes
        wrapper.innerHTML = `
          <svg class="real-bat-svg" style="width: ${randomSize}px; height: ${randomSize}px;" viewBox="0 0 512 512">
            <path d="M256,160 C210,80 130,60 40,110 C10,125 0,160 20,180 C70,210 110,210 140,260 C90,270 40,290 10,340 C40,350 90,340 130,310 C160,370 200,380 240,320 C250,305 256,290 256,290 C256,290 262,305 272,320 C312,380 352,370 382,310 C422,340 472,350 502,340 C472,290 422,270 372,260 C402,210 442,210 492,180 C512,160 502,125 472,110 C382,60 302,80 256,160 Z"/>
          </svg>
        `;
      } else {
        // 🕷️ Araignée en simple émoji texte (forme intacte)
        wrapper.textContent = '🕷️';
        wrapper.style.fontSize = `${randomSize}px`;
      }

      document.body.appendChild(wrapper);
    }

    // Alterne chauves-souris / araignées pour le prochain passage
    showBats = !showBats;
  }

  // Lancement 2 secondes après l'ouverture de la page
  setTimeout(launchCreatureSwarm, 2000);

  // Répétition toutes les 15 secondes
  setInterval(launchCreatureSwarm, 15000);
}


// Fonction pour faire apparaître une toile d'araignée pendant 5 secondes
function triggerSpiderWeb() {
  // Supprime une ancienne toile si elle existe
  const oldWeb = document.querySelector('.spider-web');
  if (oldWeb) oldWeb.remove();

  // Crée la nouvelle toile
  const web = document.createElement('div');
  web.classList.add('spider-web');

  // Alterne aléatoirement entre le coin haut-gauche et haut-droit
  const position = Math.random() > 0.5 ? 'top-left' : 'top-right';
  web.classList.add(position);

  // SVG d'une toile d'araignée réaliste
  web.innerHTML = `
    <svg viewBox="0 0 200 200" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2">
      <path d="M0,0 L200,200 M0,0 L100,200 M0,0 L200,100 M0,0 L0,200 M0,0 L200,0" />
      <path d="M30,0 Q30,30 0,30" />
      <path d="M60,0 Q60,60 0,60" />
      <path d="M100,0 Q100,100 0,100" />
      <path d="M150,0 Q150,150 0,150" />
    </svg>
  `;

  document.body.appendChild(web);

  // 1. Rend la toile visible
  setTimeout(() => {
    web.classList.add('show');
  }, 100);

  // 2. La fait disparaître après 5 secondes
  setTimeout(() => {
    web.classList.remove('show');
    // Supprime l'élément du HTML après la transition d'effacement
    setTimeout(() => web.remove(), 800);
  }, 5000); // 5000ms = 5 secondes
}


document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  renderProducts();
  renderCheckout();
  updateCartBadge();
  initWhatsApp();
  initSpookyAnimations();
  
  // Apparition d'une toile 1 seconde après le chargement
  setTimeout(triggerSpiderWeb, 1000);
  
  // Puis réapparition d'une toile toutes les 12 secondes (visibles 5s)
  setInterval(triggerSpiderWeb, 12000);
});