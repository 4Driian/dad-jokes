function Cart() {
  this.products = [];
}

Cart.prototype.addProduct = function (product) {
  this.products.push(product);
};

Cart.prototype.removeProduct = function (productId) {
  this.products = this.products.filter(product => product.id !== productId);
};

Cart.prototype.removeAllProducts = function () {
  this.products = [];
};

Cart.prototype.getTotalPrice = function () {
  let totalPrice = 0;
  this.products.forEach(product => {
    totalPrice += product.price;
  });
  return totalPrice;
};

Cart.prototype.render = function () {
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';

  if (this.products.length === 0) {
    const emptyCartMessage = document.createElement('p');
    emptyCartMessage.classList.add('empty-cart-message');
    emptyCartMessage.textContent = 'Your cart is empty.';
    cartItems.appendChild(emptyCartMessage);
  } else {
    this.products.forEach(product => {
      const cartItem = product.render();
      cartItems.appendChild(cartItem);
    });
  }

  const cartTotalPrice = document.createElement('p');
  cartTotalPrice.textContent = `Total: $${this.getTotalPrice()}`;
  cartItems.appendChild(cartTotalPrice);
};

Cart.prototype.saveToLocalStorage = function () {
  localStorage.setItem('cart', JSON.stringify(this.products));
};

Cart.prototype.loadFromLocalStorage = function () {
  const cartData = localStorage.getItem('cart');
  if (cartData) {
    this.products = JSON.parse(cartData);
  }
};