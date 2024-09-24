const basePrice = 2.49;

const glazingOptions = {
  'Keep Original': 0.00,
  'Sugar milk': 0.00,
  'Vanilla milk': 0.50,
  'Double chocolate': 1.50
};

const packSizeOptions = {
  1: 1,
  3: 3,
  6: 5,
  12: 10
};

function populateDropdowns() {
  const glazingSelect = document.getElementById('glazing');
  const packSizeSelect = document.getElementById('pack-size');

  for (const glazing in glazingOptions) {
    const option = document.createElement('option');
    option.value = glazingOptions[glazing];
    option.textContent = glazing;
    glazingSelect.appendChild(option);
  }

  for (const size in packSizeOptions) {
    const option = document.createElement('option');
    option.value = packSizeOptions[size];
    option.textContent = size;
    packSizeSelect.appendChild(option);
  }
}

function updatePrice() {
  const glazingSelect = document.getElementById('glazing');
  const packSizeSelect = document.getElementById('pack-size');
  const priceElement = document.querySelector('.price');

  const selectedGlazingPrice = parseFloat(glazingSelect.value);
  const selectedPackSizeMultiplier = parseInt(packSizeSelect.value);

  const totalPrice = (basePrice + selectedGlazingPrice) * selectedPackSizeMultiplier;
  priceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

document.getElementById('glazing').addEventListener('change', updatePrice);
document.getElementById('pack-size').addEventListener('change', updatePrice);

document.addEventListener('DOMContentLoaded', () => {
  populateDropdowns();
  updatePrice(); 
});