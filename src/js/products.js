import { jokeCtrl } from './jokes.js';

const productController = (() => {
  let selectedProduct = 'Case de teléfono';
  let selectedColor = 'Blanco';

  function getSelectedProduct() {
    return selectedProduct;
  }

  function getSelectedColor() {
    return selectedColor;
  }

  function setSelectedProduct(product) {
    selectedProduct = product;
    observerModule.notify();
  }

  function setSelectedColor(color) {
    selectedColor = color;
    observerModule.notify();
  }

  return { getSelectedProduct, getSelectedColor, setSelectedProduct, setSelectedColor };
})();

const observerModule = (() => {
  const subscribers = [];

  function subscribe(callback) {
    subscribers.push(callback);
  }

  function unsubscribe(callback) {
    const index = subscribers.indexOf(callback);
    if (index !== -1) {
      subscribers.splice(index, 1);
    }
  }

  function notify() {
    for (const subscriber of subscribers) {
      subscriber();
    }
  }

  return { subscribe, unsubscribe, notify };
})();

const productModule = (() => {
  const productContainerEl = document.getElementById('productContainer');
  const productTitleEl = document.getElementById('productTitle');
  const productImageEl = document.getElementById('productImage');
  const productColorEl = document.getElementById('productColor');
  const productPriceEl = document.getElementById('productPrice');
  const productJokeEl = document.getElementById('productJoke');
  const otherProductsSelectEl = document.getElementById('otherProductsSelect');
  const jokeEl = document.getElementById('productJoke');

  function updateJoke(joke) {
    const productJokeEl = document.getElementById('productJoke');//Solucionar el porqué no se ve reflejado en pantalla el chiste
    productJokeEl.textContent = joke;
  }

  function updateTitle(title) {
    productTitleEl.textContent = title;
  }

  function updateImage(imageUrl) {
    productImageEl.src = imageUrl;
  }

  function updateColor(color) {
    productColorEl.textContent = color;
  }

  function updatePrice(price) {
    productPriceEl.textContent = `$${price}`;
  }

  function updateJoke(joke) {
    productJokeEl.textContent = joke;
  }

  function updateOtherProducts(products) {
    otherProductsSelectEl.innerHTML = '';
    products.forEach(product => {
      const optionEl = document.createElement('option');
      optionEl.textContent = product;
      otherProductsSelectEl.appendChild(optionEl);
    });
  }

  function initProduct() {
    const selectedProduct = productController.getSelectedProduct();
    const selectedColor = productController.getSelectedColor();
  
    const imageUrl = getImageUrl(selectedProduct, selectedColor);
    const price = getPrice(selectedProduct, selectedColor);
  
    updateTitle(selectedProduct);
    updateImage(imageUrl);
    updateColor(selectedColor);
    updatePrice(price);
    updateJoke(jokeController.getSelectedJoke());

    const selectedJoke = jokeController.getSelectedJoke();
    updateJoke(selectedJoke);
  }

  function getImageUrl(product, color) {
    const productKey = getProductKey(product);
    const colorKey = getColorKey(color);
    return `src/img/product-${productKey}-${colorKey}.jpg`;
  }
  
  function getProductKey(product) {
    const productLower = product.toLowerCase();
    switch (productLower) {
      case 'case de teléfono':
        return 'case';
      case 'poster':
        return 'poster';
      case 'camisa':
        return 'shirt';
      case 'almohada':
        return 'pillow';
      default:
        return '';
    }
  }
  
  function getColorKey(color) {
    const colorLower = color.toLowerCase();
    switch (colorLower) {
      case 'blanco':
        return 'white';
      case 'negro':
        return 'black';
      default:
        return '';
    }
  }

  function getPrice(product, color) {
    const productKey = getProductKey(product);
    const colorKey = getColorKey(color);
    const prices = {
      case: {
        white: 10,
        black: 12,
      },
      poster: {
        white: 5,
        black: 7,
      },
      shirt: {
        white: 15,
        black: 18,
      },
      pillow: {
        white: 8,
        black: 9,
      },
    };

    return prices[productKey][colorKey] || 0;
  }

  return { initProduct, updateOtherProducts };
})();

const UIController = (() => {
  const productSelect = document.getElementById('productSelect');
  const colorSelect = document.getElementById('colorSelect');

  function init() {
    productSelect.addEventListener('change', () => {
      const product = productSelect.value;
      productController.setSelectedProduct(product);
      productModule.initProduct();
    });

    colorSelect.addEventListener('change', () => {
      const color = colorSelect.value;
      productController.setSelectedColor(color);
      productModule.initProduct();
    });

    observerModule.subscribe(productModule.initProduct);
  }

  return { init };
})();

const app = (() => {
  function init() {
    UIController.init();
    productModule.initProduct();
  }

  return { init };
})();


export { productController, observerModule, UIController, app };
