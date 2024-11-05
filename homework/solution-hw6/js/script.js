class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

let glazingOptions = [
    { name: 'Keep original', priceAdaptation: 0.00},
    { name: 'Sugar milk', priceAdaptation: 0.00},
    { name: 'Vanilla milk', priceAdaptation: 0.50},
    { name: 'Double chocolate', priceAdaptation: 1.50},
];
let packOptions = [
    { name: '1', priceAdaptation: 1 },
    { name: '3', priceAdaptation: 3 },
    { name: '6', priceAdaptation: 5 },
    { name: '12', priceAdaptation: 10 }
];


let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ============== PRODUCT DETAIL LOGIC
function productDetailPage() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);

    const chosenRoll = params.get("roll");
    const rollInfo = rolls[chosenRoll];
    
    // update detail page info 
    const headerElement = document.querySelector('#detail-header-text');
    headerElement.innerText = chosenRoll + ' Cinnamon Roll';
    const detailImg = document.querySelector('#detail-img');
    detailImg.src = `https://claricedu.github.io/pui-homework-claricedu/assets/products/${rollInfo.imageFile}`;
    const priceElement = document.querySelector('#detail-price');
    priceElement.innerText = `$${rollInfo.basePrice}`;

    // ADD TO CART
    const addToCartButton = document.querySelector('#detail-add-cart-button');
    addToCartButton.addEventListener('click', () => {
        const selectedGlazing = glazingSelect.options[glazingSelect.selectedIndex].text;
        const selectedPackSize = parseInt(packSelect.options[packSelect.selectedIndex].text);
        const newRoll = new Roll(chosenRoll, selectedGlazing, selectedPackSize, rollInfo.basePrice);

        cart.push(newRoll);
        //convert to JSON and store
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log("Updated cart in local storage: ", JSON.parse(localStorage.getItem('cart')));
    });

    // POPULATING DROPDOWNS
    document.getElementById('glazingSelect').addEventListener('change', () => {
        updatePrice(rollInfo.basePrice);
    });
    document.getElementById('packSelect').addEventListener('change', () => {
        // Call updatePrice with the correct base price
        updatePrice(rollInfo.basePrice);
    });

    document.addEventListener('DOMContentLoaded', () => {
        populateDropdowns();
        updatePrice(rollInfo.basePrice);
    });
}

function populateDropdowns() {
    let glazingSelect = document.getElementById('glazingSelect');
    let packSelect = document.getElementById('packSelect');
    glazingOptions.forEach(glazing => {
        const option = document.createElement('option');
        option.textContent = glazing.name;  
        option.value = glazing.priceAdaptation;
        glazingSelect.appendChild(option);  
    });
    packOptions.forEach(size => {
        const option = document.createElement('option');
        option.textContent = size.name;
        option.value = size.priceAdaptation;
        packSelect.appendChild(option);
    });
}

function updatePrice(basePrice) {
    const glazingSelect = document.getElementById('glazingSelect');
    const packSizeSelect = document.getElementById('packSelect');
    const priceElement = document.querySelector('#detail-price');

    const selectedGlazingPrice = parseFloat(glazingSelect.value);
    const selectedPackSizeMultiplier = parseInt(packSizeSelect.value);

    const totalPrice = (basePrice + selectedGlazingPrice) * selectedPackSizeMultiplier;
    priceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// ============== SHOPPING CART
function shoppingCartPage() {
    const cartContainer = document.querySelector(".cart-items-container");

    for (let i = 0; i < cart.length; i++) {
        const roll = cart[i];
        // Main cart-item-container
        const cartItemContainer = document.createElement("div");
        cartItemContainer.classList.add("cart-item-container");

        const descriptionContainer = document.createElement("div");
        descriptionContainer.classList.add("cart-item-des-container");

        // create sub containers
        const imageAndRemoveContainer = createImageAndRemoveContainer(roll, cartItemContainer);
        const labelContainer = createLabelContainer(roll);
        const priceContainer = createPriceContainer(roll);
        
        descriptionContainer.appendChild(imageAndRemoveContainer);
        descriptionContainer.appendChild(labelContainer);

        cartItemContainer.appendChild(descriptionContainer);
        cartItemContainer.appendChild(priceContainer);

        cartContainer.appendChild(cartItemContainer);
    }

    // Initial total price calculation
    const cartTotalPriceElement = document.getElementById('cart-total-price');
    cartTotalPriceElement.innerText = `$${cartTotalPrice(cart)}`;
}

function itemTotalPrice (glazing, size, basePrice) {
    const selectedGlazing = glazingOptions.find(option => option.name === glazing);
    const glazingPriceAdaptation = selectedGlazing.priceAdaptation;

    const selectedPack = packOptions.find(option => option.name== size);
    const packPriceAdaptation = selectedPack.priceAdaptation;

    const itemPrice = ((basePrice + glazingPriceAdaptation) * packPriceAdaptation);
    return itemPrice.toFixed(2);
}

// create container for image and remove text;
function createImageAndRemoveContainer(roll, cartItemContainer) {
    const elemContainer = document.createElement("div");

    const imgElement = document.createElement("img");
    imgElement.classList.add("cart-img");
    imgElement.src = `https://claricedu.github.io/pui-homework-claricedu/assets/products/${roll.type.toLowerCase()}-cinnamon-roll.jpg`;
    imgElement.alt = `${roll.type} cinnamon roll`;

    const removeText = document.createElement("p");
    removeText.classList.add("cart-remove-text");
    removeText.innerText = "Remove";

    // Add event listener for remove action
    removeText.addEventListener("click", () => {
        removeItemFromCart(roll, cartItemContainer);
    });

    elemContainer.appendChild(imgElement);
    elemContainer.appendChild(removeText);

    return elemContainer;
}

// Function to remove item from cart and DOM
function removeItemFromCart(roll, cartItemContainer) {
    const index = cart.indexOf(roll);
    if (index !== -1) {
        cart.splice(index, 1); 
        console.log("Updated cart: ", cart);
    }

    // Update local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("Updated cart in local storage: ", JSON.parse(localStorage.getItem('cart')));
    // remove on DOM
    cartItemContainer.remove(); 


    const cartTotal = cartTotalPrice(cart);
    const cartTotalPriceElement = document.getElementById('cart-total-price');
    cartTotalPriceElement.innerText = `$${cartTotal}`;

    if (cart.length === 0) {
        cartTotalPriceElement.innerText = "$0.00";
    }
}

// Create label container and its labels
function createLabelContainer(roll) {
    const labelContainer = document.createElement("div");

    const typeLabel = document.createElement("p");
    typeLabel.innerText = `${roll.type} Cinnamon Roll`;
    const glazingLabel = document.createElement("p");
    glazingLabel.innerText = `Glazing: ${roll.glazing}`;
    const packLabel = document.createElement("p");
    packLabel.innerText = `Pack size: ${roll.size}`;

    labelContainer.appendChild(typeLabel);
    labelContainer.appendChild(glazingLabel);
    labelContainer.appendChild(packLabel);

    return labelContainer;
}

// Create price container
function createPriceContainer(roll) {
    const priceContainer = document.createElement("div");
    const priceElement = document.createElement("h3");
    priceElement.innerText = `$${itemTotalPrice(roll.glazing, roll.size, roll.basePrice)}`;
    priceContainer.appendChild(priceElement);

    return priceContainer;
}

// Calculate the total cart price
function cartTotalPrice(cart) {
    let totalPrice = 0.00;
    for (let roll of cart) {
        // itemTotalPrice returns a string
        const itemPrice = parseFloat(itemTotalPrice(roll.glazing, roll.size, roll.basePrice));
        totalPrice += itemPrice;
    }
    return totalPrice.toFixed(2);
}


// Load each page accordingly
if (window.location.pathname.includes('product-detail.html')) {
    productDetailPage();
} else if (window.location.pathname.includes('shopping-cart.html')) {
    shoppingCartPage();
}