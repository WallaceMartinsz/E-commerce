document.getElementById('paymentMethod').addEventListener('change', function() {
    const selectedMethod = this.value;

    document.querySelectorAll('.payment-option').forEach(option => {
        option.style.display = 'none';
    });

    if (selectedMethod) {
        document.getElementById(selectedMethod).style.display = 'block';
    }
});

document.getElementById('paymentForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const paymentMethod = document.getElementById('paymentMethod').value;
    let orderData = { paymentMethod };

    if (paymentMethod === 'cartaoCredito') {
        orderData.cardNumber = document.getElementById('cardNumber').value;
        orderData.cardExpiration = document.getElementById('cardExpiration').value;
        orderData.cardCVC = document.getElementById('cardCVC').value;
    } else if (paymentMethod === 'cartaoDebito') {
        orderData.cardNumber = document.getElementById('debitCardNumber').value;
        orderData.cardExpiration = document.getElementById('debitCardExpiration').value;
        orderData.cardCVC = document.getElementById('debitCardCVC').value;
    } else if (paymentMethod === 'pix') {
        orderData.pixKey = document.getElementById('pixKey').innerText; 
    }

    try {
        const response = await fetch('http://localhost:8080/pedido', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        if (response.ok) {
            const result = await response.json();
            alert(`Pedido criado com sucesso! ID do pedido: ${result.id}`);
            window.location.href = '/index.html';
        } else {
            throw new Error('Erro ao criar o pedido. Tente novamente.');
        }
    } catch (error) {
        alert(error.message);
    }
});


window.onload = function() {
    const cartCount = localStorage.getItem('cartCount');
    const total = localStorage.getItem('total');
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));

    document.getElementById('cartCount').innerText = `Itens no Carrinho: ${cartCount}`;
    document.getElementById('totalPrice').innerText = `Total: R$ ${total}`;

    const cartItemsList = document.getElementById('cartItems');
    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item;
        cartItemsList.appendChild(li);
    });
};


document.getElementById('backButton').addEventListener('click', function() {
    window.history.back();
});