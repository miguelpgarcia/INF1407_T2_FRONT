"use strict";
window.addEventListener('load', () => {
    // Verifica o username e coloca no cabeçalho da página
    const token = localStorage.getItem('token'); // Recupera o token de autenticação
    // Check if token is not null before using it in the headers
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token !== null) {
        headers['Authorization'] = token;
    }
    fetch(backendAddress + 'accounts/token-auth/', {
        method: 'GET',
        headers: headers,
    })
        .then(response => {
        response.json().then(data => {
            const usuario = data;
            if (response.ok) {
                // token enviado no cabeçalho foi aceito pelo servidor
                let objDiv = document.getElementById('logged');
                objDiv.classList.remove('invisivel');
                objDiv.classList.add('visivel');
                objDiv = document.getElementById('unlogged');
                objDiv.classList.remove('visivel');
                objDiv.classList.add('invisivel');
            }
            else {
                // token enviado no cabeçalho foi rejeitado pelo servidor
                usuario.username = 'visitante';
                let objDiv = document.getElementById('unlogged');
                objDiv.classList.remove('invisivel');
                objDiv.classList.add('visivel');
                objDiv = document.getElementById('logged');
                objDiv.classList.remove('visivel');
                objDiv.classList.add('invisivel');
            }
            const spanElement = document.getElementById('identificacao');
            spanElement.innerHTML = usuario.username;
        });
    })
        .catch(erro => {
        console.log('[setLoggedUser] deu erro: ' + erro);
    });
});
