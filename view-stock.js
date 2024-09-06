document.addEventListener('DOMContentLoaded', loadStockData);

async function loadStockData() {
    updateStockList();
}

function updateStockList() {
    fetchStockData().then(stockData => {
        const stockList = document.getElementById('stock-list');
        stockList.innerHTML = '';

        stockData.forEach(product => {
            const item = document.createElement('div');
            item.className = 'stock-item';
            item.innerHTML = `
                <h3>${product.name}</h3>
                <p>Adet: ${product.quantity}</p>
                <p>Metre: ${product.length}</p>
                <p>Kilo: ${product.weight}</p>
                <button onclick="showReductionForm('${product.name}')">Stok Düşür</button>
                <div id="reduction-form-${product.name}" class="stock-form" style="display: none;">
                    <h4>Stok Düşür</h4>
                    <select id="reduction-type-${product.name}">
                        <option value="quantity">Adet</option>
                        <option value="length">Metre</option>
                        <option value="weight">Kilo</option>
                    </select>
                    <input type="number" id="reduction-amount-${product.name}" placeholder="Miktar" min="0" step="0.01">
                    <button onclick="reduceStock('${product.name}')">Stok Düşür</button>
                </div>
            `;
            stockList.appendChild(item);
        });
    });
}

function showReductionForm(name) {
    const form = document.getElementById('reduction-form-' + name);
    form.style.display = form.style.display === 'none' || form.style.display === '' ? 'block' : 'none';
}

async function reduceStock(name) {
    const type = document.getElementById('reduction-type-' + name).value;
    const amount = parseFloat(document.getElementById('reduction-amount-' + name).value) || 0;

    let stockData = await fetchStock
