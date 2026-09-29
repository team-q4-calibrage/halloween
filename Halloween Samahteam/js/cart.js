import { products } from './data.js';

// Récupère le panier depuis localStorage
export function getCart() {
  return JSON.parse(localStorage.getItem('cart_halloween')) || [];
}

// Sauvegarde le panier dans localStorage
export function saveCart(cart) {
  localStorage.setItem('cart_halloween', JSON.stringify(cart));
  updateCartBadge();
}

// Ajoute un produit au panier
export function addToCart(productId) {
  const cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === productId);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  saveCart(cart);
  alert("👻 Produit ajouté au panier !");
}

// Retire un produit
export function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
}

// Calcule le total
export function getCartDetails() {
  const cart = getCart();
  return cart.map(item => {
    const product = products.find(p => p.id === item.id);
    return {
      ...product,
      quantity: item.quantity,
      subtotal: product ? product.price * item.quantity : 0
    };
  });
}

// Met à jour l'icône du panier dans la barre de navigation
export function updateCartBadge() {
  const badge = document.getElementById('cart-count');
  if (badge) {
    const cart = getCart();
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    badge.textContent = totalItems;
  }
}