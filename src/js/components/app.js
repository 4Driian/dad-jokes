import { renderJoke, getSearchTerm } from '../modules/UIModule.js';

const productContainer = document.getElementById('productContainer');
const productImage = document.getElementById('productImage');
const productTitle = document.getElementById('productTitle');
const productPrice = document.getElementById('productPrice');
const selectedJoke = document.getElementById('selectedJoke');
const randomJokeBtn = document.getElementById('randomJokeBtn');
const otherProductsList = document.getElementById('otherProductsList');

const products = [
  {
    id: 1,
    title: 'Phone Case',
    color: 'White',
    price: 5,
    image: 'src/img/product-case-white.jpg'
  },
  {
    id: 2,
    title: 'Phone Case',
    color: 'Black',
    price: 7,
    image: 'src/img/product-case-black.jpg'
  },
  {
    id: 3,
    title: 'Poster',
    color: 'White',
    price: 3,
    image: 'src/img/product-poster-white.jpg'
  },
  {
    id: 4,
    title: 'Poster',
    color: 'Black',
    price: 5,
    image: 'src/img/product-poster-black.jpg'
  },
  {
    id: 5,
    title: 'Shirt',
    color: 'White',
    price: 10,
    image: 'src/img/product-shirt-white.jpg'
  },
  {
    id: 6,
    title: 'Shirt',
    color: 'Black',
    price: 13,
    image: 'src/img/product-shirt-black.jpg'
  },
  {
    id: 7,
    title: 'Pillow',
    color: 'White',
    price: 12,
    image: 'src/img/product-pillow-white.jpg'
  },
  {
    id: 8,
    title: 'Pillow',
    color: 'Black',
    price: 15,
    image: 'src/img/product-pillow-black.jpg'
  }
];

let cartItems = [];

const cartItemsList = document.getElementById('cartItems');
const addToCartBtn = document.getElementById('addToCartBtn');
const clearCartBtn = document.getElementById('clearCartBtn');

function addToCart() {
  const selectedJoke = document.getElementById('selectedJoke').textContent;
  const productTitle = document.getElementById('productTitle').textContent;
  const productImageSrc = document.getElementById('productImage').src;

  const cartItem = {
    joke: selectedJoke,
    product: productTitle,
    image: productImageSrc,
  };

  cartItems.push(cartItem);
  renderCartItems();
}

function renderCartItems() {
  cartItemsList.innerHTML = '';

  cartItems.forEach(item => {
    const li = document.createElement('li');

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.product;
    li.appendChild(img);

    const jokeParagraph = document.createElement('p');
    jokeParagraph.textContent = item.joke;
    li.appendChild(jokeParagraph);

    cartItemsList.appendChild(li);
  });
}

function clearCart() {
  cartItems = [];
  renderCartItems();
}

addToCartBtn.addEventListener('click', addToCart);
clearCartBtn.addEventListener('click', clearCart);

let selectedProduct = products[0];
let joke;

function renderProduct() {
  productImage.src = selectedProduct.image;
  productTitle.textContent = `${selectedProduct.title} ${selectedProduct.color}`;
  productPrice.textContent = `$${selectedProduct.price}`;
}

function renderSelectedJoke() {
  selectedJoke.textContent = joke;
}

async function getRandomJoke() {
  try {
    const response = await fetch('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch joke');
    }

    const data = await response.json();
    joke = data.joke;
    renderSelectedJoke();
  } catch (error) {
    console.error(error);
  }
}

function handleProductChange(productId) {
  const productIndex = products.findIndex(product => product.id === productId);
  const selectedProductIndex = products.findIndex(product => product.id === selectedProduct.id);

  if (productIndex === selectedProductIndex) {
    return;
  }

  const removedProduct = products.splice(productIndex, 1)[0];
  products.splice(selectedProductIndex, 0, removedProduct);

  selectedProduct = removedProduct;
  renderProduct();
  renderSelectedJoke();
  renderOtherProducts();
}

const colorContainer = document.getElementById('colorContainer');
const colorRadioButtons = document.querySelectorAll('input[name="color"]');

function handleColorChange(e) {
  const selectedColor = e.target.value;
  selectedProduct = products.find(product => product.color.toLowerCase() === selectedColor.toLowerCase());
  renderProduct();
  renderSelectedJoke();
  renderOtherProducts();
}

function renderColorOptions() {
  colorContainer.innerHTML = '';

  const colors = Array.from(new Set(products.map(product => product.color.toLowerCase()))); // Obtener todos los colores únicos

  colors.forEach(color => {
    const radioBtn = document.createElement('input');
    radioBtn.type = 'radio';
    radioBtn.name = 'color';
    radioBtn.value = color;
    radioBtn.addEventListener('change', handleColorChange);

    if (color.toLowerCase() === 'black') {
      radioBtn.classList.add('radio-color-black');
    } else if (color.toLowerCase() === 'white') {
      radioBtn.classList.add('radio-color-white');
    }
    
    const label = document.createElement('label');
    label.appendChild(radioBtn);

    colorContainer.appendChild(label);
  });

  const selectedColor = selectedProduct.color.toLowerCase();
  const selectedColorRadioButton = document.querySelector(`input[name="color"][value="${selectedColor}"]`);
  if (selectedColorRadioButton) {
    selectedColorRadioButton.checked = true;
  }
}

function renderOtherProducts() {
  otherProductsList.innerHTML = '';
  products.forEach(product => {
    if (product.id !== selectedProduct.id && product.color.toLowerCase() === selectedProduct.color.toLowerCase()) {
      const li = document.createElement('li');
      const img = document.createElement('img');
      img.src = product.image;
      img.alt = product.title;
      img.classList.add('product-image');
      img.addEventListener('click', () => handleProductChange(product.id));
      li.appendChild(img);


      otherProductsList.appendChild(li);
    }
  });
}

randomJokeBtn.addEventListener('click', getRandomJoke);

renderProduct();
renderColorOptions();
renderOtherProducts();
getRandomJoke();