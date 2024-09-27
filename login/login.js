document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const usuarioLogin = {
        email: email,
        senha: senha
    };

    try {
        const response = await fetch('http://localhost:8080/usuario/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarioLogin)
        });

        const messageDiv = document.getElementById('message');
        if (response.ok) {
            const message = await response.text();
            messageDiv.textContent = message; 
            messageDiv.style.color = 'green'; 

            window.location.href = '../index.html'; 
        } else {
            const errorMessage = await response.text();
            messageDiv.textContent = errorMessage; 
            messageDiv.style.color = 'red'; 
        }
    } catch (error) {
        console.error('Erro ao realizar o login:', error);
    }
});
