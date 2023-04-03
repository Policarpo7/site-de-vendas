function getCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (!cartItems) {
        return [];
    }
    return cartItems;
}

function displayCartItems() {
    const cartItems = getCartItems();

    let produtos = "";
    let valorTotal = 0;

    cartItems.forEach(item => {
        produtos += `${item.title}, `;
        valorTotal += item.price * item.quantity;
    });

    produtos = produtos.slice(0, -2);

    const frete = 10;
    const valor = (valorTotal + frete).toFixed(2);

    document.getElementById('produtos').innerHTML = produtos;
    document.getElementById('valor').innerText = `R$ ${valor}`;
}

displayCartItems();
