const formulario = document.querySelector('[data-formMensagem]');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = e.target.querySelector('[data-nome]').value;
    const telefone = e.target.querySelector('[data-telefone]').value;
    const animal = e.target.querySelector('[data-animal]').value;
    const mensagem = e.target.querySelector('[data-mensagem]').value;

    try {
        const response = await fetch('http://localhost:3000/mensagem', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, telefone, animal, mensagem })
        });
        if (response.ok) {
            alert('Mensagem enviada!!!');
            window.location.reload();
        } else {
            throw new Error('Erro ao enviar mensagem');
        }
    } catch (erro) {
        console.log(erro);
    }
});
