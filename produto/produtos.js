let produtos = [];
let cartCount = 0;
let total = 0;

async function fetchProdutos() {
    const response = await fetch('http://localhost:8080/produtos');
    produtos = await response.json();
    displayProdutos(produtos);
}

function displayProdutos(produtos) {
    const produtosContainer = document.getElementById('produtos');
    produtosContainer.innerHTML = '';

    produtos.forEach(produto => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${produto.imagemUrl}" alt="${produto.nome}">
            <h2>${produto.nome}</h2>
            <p class="price">R$ ${produto.preco.toFixed(2)}</p>
            <button onclick="adicionarAoCarrinho(${produto.id}, '${produto.nome}', ${produto.preco})">Adicionar ao Carrinho</button>
        `;
        produtosContainer.appendChild(productDiv);
    });
}

function adicionarAoCarrinho(produtoId, nome, preco) {
    cartCount++;
    total += preco;
    
    document.getElementById('cartCount').innerText = `Itens no Carrinho: ${cartCount}`;
    
    const cartItems = document.getElementById('cartItems');
    const li = document.createElement('li');
    li.innerText = `${nome} - R$ ${preco.toFixed(2)}`;
    
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remover';
    removeButton.onclick = function() {
        removerDoCarrinho(li, preco);
    };
    
    li.appendChild(removeButton);
    cartItems.appendChild(li);
    
    document.getElementById('totalPrice').innerText = `Total: R$ ${total.toFixed(2)}`;
}

function removerDoCarrinho(item, preco) {
    cartCount--;
    total -= preco;

    item.remove();

    document.getElementById('cartCount').innerText = `Itens no Carrinho: ${cartCount}`;
    
    document.getElementById('totalPrice').innerText = `Total: R$ ${total.toFixed(2)}`;
}

document.getElementById('filterInput').addEventListener('input', function() {
    const filterValue = this.value.toLowerCase();
    const produtosFiltrados = produtos.filter(produto => produto.nome.toLowerCase().includes(filterValue));
    displayProdutos(produtosFiltrados);
});

fetchProdutos();

document.getElementById('finalizePurchase').addEventListener('click', function() {
    if (cartCount === 0) {
        return; 
    }
    
    localStorage.setItem('cartCount', cartCount);
    localStorage.setItem('total', total);
    
    const cartItemsArray = Array.from(document.getElementById('cartItems').children)
                                .map(item => item.innerText);
    localStorage.setItem('cartItems', JSON.stringify(cartItemsArray));
    
    window.location.href = '../finalizarPedido/finalizarPedido.html'; 
});
