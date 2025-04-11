const formulario = document.querySelector('[data-formLogin]');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.querySelector("[data-type='email']").value;
    const senha = e.target.querySelector("[data-type='senha']").value;

    try {
        const response = await fetch('http://localhost:3000/usuarios');
        const usuarios = await response.json();

        for (let usuario of usuarios) {
            if (usuario.email === email && usuario.senha === senha) {
                window.location.href = `../../perfil.html?id=${usuario.id}`;
                return;
            } else if (usuario.email === email && usuario.senha !== senha) {
                alert("Senha digitada está errada");
                return;
            }
        }
        alert("Usuário não encontrado");
    } catch (erro) {
        console.log(erro);
    }
});
