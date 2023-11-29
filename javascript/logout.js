"use strict";
onload = (evento) => {
    document.getElementById('logout').addEventListener('click', (evento) => {
        console.log("Clickei!");
        const token = localStorage.getItem('token');
        fetch(backendAddress + 'accounts/token-auth/', {
            method: 'DELETE',
            headers: {
                'Authorization': 'Token ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
            const mensagem = document.getElementById('mensagem');
            if (response.ok) {
                window.location.assign('index.html');
            }
            else {
                mensagem.innerHTML = 'Erro ' + response.status;
            }
        })
            .catch(erro => {
            console.log(erro);
        });
    });
};
