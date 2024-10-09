const queryString = window.location.search;

console.log(queryString);

const params = new URLSearchParams(queryString);

console.log(params);

const chosenRoll = params.get("roll");

console.log("chosen roll: " + chosenRoll);

console.log(rolls);

const cart = [];

// code from lab4
const rollInfo = rolls[chosenRoll];  

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

// ========================= CART (HMWK 5)

const cartRolls = [
    new Roll('Original', 'Sugar Milk', 1, 2.49),
    new Roll('Walnut', 'Vanilla Milk', 12, 3.49),
    new Roll('Raisin', 'Sugar Milk', 3, 2.99),
    new Roll('Apple', 'Keep Original', 3, 3.49)
];

// add the specified cart list to cart array;
for (let roll of cartRolls) {
    cart.push(roll);
}

// function logic taken from hmwk4's price calculation, but can't reuse 
// function as original takes the info directly from html element
function itemTotalPrice (glazing, size, basePrice) {
    const glazingPriceMap = {
        'Sugar Milk': 0.00,
        'Vanilla Milk': 0.50,
        'Keep Original': 0.00,
        'None': 0.00
    };
    const sizePriceMap = {
        1: 1,
        3: 3,
        6: 5,
        12: 10
    }
    const glazingPrice = glazingPriceMap[glazing];
    const itemTotalPrice = ((basePrice + glazingPrice) * sizePriceMap[size]);
    return itemTotalPrice.toFixed(2);
}

const cartContainer = document.querySelector(".cart-items-container");

for (let i = 0; i < cartRolls.length; i++) {
    const roll = cartRolls[i];
    // Main cart-item-container
    const cartItemContainer = document.createElement("div");
    cartItemContainer.classList.add("cart-item-container");

    const descriptionContainer = document.createElement("div");
    descriptionContainer.classList.add("cart-item-des-container");

    // create sub containers
    const imageAndRemoveContainer = createImageAndRemoveContainer(roll, i, cartItemContainer);
    const labelContainer = createLabelContainer(roll);
    const priceContainer = createPriceContainer(roll);
    
    descriptionContainer.appendChild(imageAndRemoveContainer);
    descriptionContainer.appendChild(labelContainer);

    cartItemContainer.appendChild(descriptionContainer);
    cartItemContainer.appendChild(priceContainer);

    cartContainer.appendChild(cartItemContainer);
}

// create container for image and remove text;
function createImageAndRemoveContainer(roll, index, cartItemContainer) {
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
    }

    cartItemContainer.remove(); 
    console.log("Updated cart: ", cart);

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
        //itemTotalPrice returns a string
        const itemPrice = parseFloat(itemTotalPrice(roll.glazing, roll.size, roll.basePrice));
        totalPrice += itemPrice;
    }
    return totalPrice.toFixed(2);
}

// Initial total price calculation
const cartTotal = cartTotalPrice(cart);
const cartTotalPriceElement = document.getElementById('cart-total-price');
cartTotalPriceElement.innerText = `$${cartTotal}`;
