const jokeController = (() => {
  let selectedJoke = '';

  function getSelectedJoke() {
    return selectedJoke;
  }

  function setSelectedJoke(joke) {
    selectedJoke = joke;
    observerModule.notify();
  }

  return { getSelectedJoke, setSelectedJoke };
})();

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
    subscribers.forEach(callback => callback());
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

    switch (`${productKey}-${colorKey}`) {
      case 'case-white':
        return 5;
      case 'case-black':
        return 7;
      case 'poster-white':
        return 3;
      case 'poster-black':
        return 5;
      case 'shirt-white':
        return 10;
      case 'shirt-black':
        return 13;
      case 'pillow-white':
        return 12;
      case 'pillow-black':
        return 15;
      default:
        return 0;
    }
  }

  return { initProduct, updateOtherProducts };
})();

const UIController = (() => {
  const productSelectEl = document.getElementById('productSelect');
  const colorSelectEl = document.getElementById('colorSelect');


  function initUI() {
    const products = ['Case de teléfono', 'Poster', 'Camisa', 'Almohada'];
    const colors = ['Blanco', 'Negro'];

    products.forEach(product => {
      const optionEl = document.createElement('option');
      optionEl.textContent = product;
      productSelectEl.appendChild(optionEl);
    });

    colors.forEach(color => {
      const optionEl = document.createElement('option');
      optionEl.textContent = color;
      colorSelectEl.appendChild(optionEl);
    });

    productSelectEl.addEventListener('change', handleProductChange);
    colorSelectEl.addEventListener('change', handleColorChange);

    observerModule.subscribe(productModule.initProduct);
    observerModule.subscribe(productModule.updateOtherProducts);
    observerModule.subscribe(productModule.updateJoke);
  }

  function handleProductChange() {
    const selectedProduct = productSelectEl.value;
    productController.setSelectedProduct(selectedProduct);
  }

  function handleColorChange() {
    const selectedColor = colorSelectEl.value;
    productController.setSelectedColor(selectedColor);
  }



  return { initUI };
})();

const app = (() => {
  function initApp() {
    UIController.initUI();
    productModule.initProduct();
  }

  return { initApp };
})();

app.initApp();
