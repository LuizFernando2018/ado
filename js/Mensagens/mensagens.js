import { clientService } from "../../controllerLogin.js";
import { mensagemService } from "../../controllerMensagem.js";

//pega o id do usuario atual
const pegaUrl = new URL(window.location)
const id = pegaUrl.searchParams.get('id')

//insere o formulario com dados preenchidos
const preencheDados = (nome, telefone) => {
    const mensagem = document.createElement(`div`)
    const conteudo = `<label for="nome" class="formulario__campo" >Nome</label>
<input data-nome type="text" class="formulario__input input" id="nome" placeholder="Insira seu nome completo" value="${nome}">
<label for="fone" class="formulario__campo">Telefone</label>
<input data-telefone type="tel" class="formulario__input input" id="phone" placeholder="Insira seu telefone e/ou whatsapp" value="${telefone ? telefone : '' }">
<label for="nomeAnimal" class="formulario__campo">Nome do animal</label>
<input data-animal type="text" class="formulario__input input" id="nomeAnimal" placeholder="Por qual animal você se interessou?">
<label for="mensagem" class="formulario__campo">Mensagem</label>
<textarea data-mensagem class="formulario__textarea" id="mensagem" rows="8" cols="50" placeholder="Escreva sua mensagem."></textarea>`
mensagem.innerHTML = conteudo
return mensagem
}
//exibe os dados atuais e cria o formulario
const formulario = document.querySelector('[data-formMensagem]')
const exibeDados = async () => {
    try {
        const exibePerfil = await clientService.perfilUsuario(id)
        const dados = Array.isArray(exibePerfil) ? exibePerfil : [exibePerfil];
        const botaoExistente = formulario.firstChild
        dados.find(e => {
            formulario.insertBefore((preencheDados(e.nome, e.telefone,)), botaoExistente)
        })
    }
    catch (erro) {
        console.log(erro)
    }

}
exibeDados()

//envia a mensagem para o db
formulario.addEventListener('submit', async(e)=>{
    const nome = e.target.querySelector('[data-nome]').value
    const telefone = e.target.querySelector('[data-telefone]').value
    const animal = e.target.querySelector('[data-animal]').value
    const mensagem = e.target.querySelector('[data-mensagem]').value
    try{
        await mensagemService.enviarMensagem(nome, telefone, animal, mensagem)
        alert('Mensagem enviada!!!')
        window.location.reload()
    }
    catch(erro){
        console.log(erro)
    }
})
