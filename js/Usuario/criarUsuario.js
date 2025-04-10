const formulario = document.querySelector('[data-formCadastro]');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = e.target.querySelector("[data-type='nome']").value;
    const email = e.target.querySelector("[data-type='email']").value;
    const senha = e.target.querySelector("[data-type='senha']").value;

    console.log('Dados do formulário:', { nome, email, senha });

    try {
        console.log('Enviando requisição para o backend...');
        const response = await fetch('http://localhost:3000/cadastro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha })
        });
        console.log('Resposta do servidor:', response.status, response.statusText);

        if (response.ok) {
            console.log('Cadastro bem-sucedido, redirecionando...');
            window.location.href = "../../login.html";
        } else {
            const errorData = await response.json();
            throw new Error(`Erro ao cadastrar: ${response.status} - ${errorData.erro}`);
        }
    } catch (erro) {
        console.error('Erro no frontend:', erro.message); // Mostra apenas a mensagem do erro
    }
});