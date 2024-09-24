let basePrice = 2.49;

let glazingOptions = [
    { name: 'Keep original', priceAdaptation: 0.00},
    { name: 'Sugar milk', priceAdaptation: 0.00},
    { name: 'Vanilla milk', priceAdaptation: 0.50},
    { name: 'Double Chocolate', priceAdaptation: 1.50},
];

let packOptions = [
    { name: '1', priceAdaptation: 1 },
    { name: '3', priceAdaptation: 3 },
    { name: '6', priceAdaptation: 5 },
    { name: '12', priceAdaptation: 10 }
]

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
  
function updatePrice() {
    const glazingSelect = document.getElementById('glazingSelect');
    const packSizeSelect = document.getElementById('packSelect');
    const priceElement = document.querySelector('.price');
  
    const selectedGlazingPrice = parseFloat(glazingSelect.value);
    const selectedPackSizeMultiplier = parseInt(packSizeSelect.value);
  
    const totalPrice = (basePrice + selectedGlazingPrice) * selectedPackSizeMultiplier;
    priceElement.textContent = `$${totalPrice.toFixed(2)}`;
  }


  document.getElementById('glazingSelect').addEventListener('change', updatePrice);
  document.getElementById('packSelect').addEventListener('change', updatePrice);

  document.addEventListener('DOMContentLoaded', () => {
    populateDropdowns();
    updatePrice();
  })