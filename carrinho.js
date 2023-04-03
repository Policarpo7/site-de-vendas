function updateSummary() {
    const cartItems = Storage.getCart();
    const subTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const frete = 10;
    const total = subTotal + frete;

    document.getElementById('subtotal').innerText = `R$ ${subTotal.toFixed(2)}`;
    document.getElementById('frete').innerText = `R$ ${frete.toFixed(2)}`;
    document.getElementById('total').innerText = `R$ ${total.toFixed(2)}`;
}

function updateCartDisplay() {
    const cartItems = Storage.getCart();
    const cartTableBody = document.querySelector('tbody');

    const cartHtml = cartItems.map(item => `
        <tr>
          <td>
            <div class="product">
              <img src="${item.img}" alt="" />
              <div class="info">
                <div class="name">${item.title}</div>
                <div class="category">${item.description}</div>
              </div>
            </div>
          </td>
          <td>R$ ${item.price}</td>
          <td>
            <div class="qty">
              <button class="decrease" data-id="${item.id}">-</button>
              <span>${item.quantity}</span>
              <button class="increase" data-id="${item.id}">+</button>
            </div>
          </td>
          <td>R$ ${item.price * item.quantity}</td>
          <td><button class="remove" data-id="${item.id}">Remover</button></td>
        </tr>
      `).join('');
    cartTableBody.innerHTML = cartHtml;

    const decreaseButtons = document.querySelectorAll('.decrease');
    const increaseButtons = document.querySelectorAll('.increase');
    const removeButtons = document.querySelectorAll('.remove');

    decreaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemId = parseInt(button.getAttribute('data-id'));
            const item = cartItems.find(item => item.id === itemId);

            if (item.quantity > 1) {
                Storage.updateItemQuantity(itemId, item.quantity - 1);
            } else {
                Storage.removeFromCart(itemId);
            }
            updateCartDisplay();
            updateSummary();
        });
    });

    increaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemId = parseInt(button.getAttribute('data-id'));
            const item = cartItems.find(item => item.id === itemId);

            Storage.updateItemQuantity(itemId, item.quantity + 1);
            updateCartDisplay();
            updateSummary();
        });
    });

    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemId = parseInt(button.getAttribute('data-id'));

            Storage.removeFromCart(itemId);
            updateCartDisplay();
            updateSummary();
        });
    });
}

// Função para redirecionar para a página de confirmação
function redirectToConfirmationPage(cartItems, total) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('total', total);
    window.location.href = 'pagamento.html';
}

// Alterar evento do clique do botão "Finalizar Compra" para usar a nova função `redirectToConfirmationPage`
document.querySelector('button.FinalizarCompra').addEventListener('click', () => {
    const total = parseFloat(document.getElementById('total').innerText.replace('R$', '').trim());
    redirectToConfirmationPage(Storage.getCart(), total);
});

updateCartDisplay();
updateSummary();
