document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('add-stock').classList.add('active');
});

async function addStock() {
    const name = document.getElementById('product-name').value;
    const quantity = parseFloat(document.getElementById('quantity').value) || 0;
    const length = parseFloat(document.getElementById('length').value) || 0;
    const weight = parseFloat(document.getElementById('weight').value) || 0;

    if (!name || quantity < 0 || length < 0 || weight < 0) {
        alert('Lütfen geçerli bilgiler girin.');
        return;
    }

    let stockData = await fetchStockData();
    const product = stockData.find(p => p.name === name);
    if (product) {
        product.quantity += quantity;
        product.length += length;
        product.weight += weight;
    } else {
        stockData.push({ name, quantity, length, weight });
    }

    await saveStockData(stockData);
    updateStockList();
    clearStockForm();
}
