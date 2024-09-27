document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault(); 

    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    const usuarioRegistro = {
        nome: nome,
        email: email,
        senha: senha
    };

    try {
        const response = await fetch('http://localhost:8080/usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarioRegistro)
        });

        const messageDiv = document.getElementById('message');
        if (response.ok) {
            const message = await response.text();
            messageDiv.textContent = message; 
            messageDiv.style.color = 'green'; 
            window.location.href = '../login/login.html'; 
        } else {
            const errorMessage = await response.text();
            messageDiv.textContent = errorMessage; 
            messageDiv.style.color = 'red';
        }
    } catch (error) {
        console.error('Erro ao realizar o registro:', error);
    }
});
