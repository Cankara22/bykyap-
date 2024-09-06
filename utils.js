const apiUrl = 'https://cankara22.github.io/bykyap-/api/stocks';

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

async function fetchStockData() {
    const response = await fetch(apiUrl);
    return await response.json();
}

async function saveStockData(stockData) {
    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stockData)
    });
}

function clearStockForm() {
    document.getElementById('product-name').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('length').value = '';
    document.getElementById('weight').value = '';
}
