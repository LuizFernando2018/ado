import { clientService } from "../../controllerLogin.js";

//define o ID da sessão
const defineIdGeral = () => {
    const verificarID = new URL(window.location)
    const idGeral = verificarID.searchParams.get('id')
    //criar um cookie armazenando o id. A sessão aqui tem  hora.
    document.cookie = `id=${idGeral}; max-age=${60 * 60}`
}
defineIdGeral()

//cria o formulario preenchido com dados do usuário
const mostraDados = (nome, telefone, cidade, sobre) => {
    const perfil = document.createElement(`div`)
    const conteudo = `<label for="foto" class="formulario__campo" >Foto</label>
<figure class="formulario__fotoperfil">
    <img src="./assets/img/user.png" alt="" class="formulario__fotoperfil--foto">
    <figcaption class="formulario__fotoperfil--legenda">Clique na foto para editar</figcaption>
</figure>

<div class="input-container">
<label for="nome" class="formulario__campo" >Nome</label>
<input type="text" data-type="nome" class="formulario__input input" id="nome" placeholder="Insira seu nome completo" value="${nome}" required>
<span class="input-mensagem-erro">Campo invalido</span>
</div>
<div class="input-container">
<label for="fone" class="formulario__campo">Telefone</label>
<input type="tel" data-type="telefone" class="formulario__input input" id="phone" placeholder="55 11 XXXXXXXXX" value="${telefone ? telefone : ''}">
<span class="input-mensagem-erro">Campo invalido</span>
</div>
<label for="cidade" class="formulario__campo">Cidade</label>
<input data-type="cidade" type="text" class="formulario__input input" id="cidade" placeholder="Sao Paulo" value="${cidade ? cidade : ''}">
<label for="mensagem" class="formulario__campo">Sobre</label>
<textarea data-type="sobre" class="formulario__textarea" id="mensagem" rows="6" cols="50" placeholder="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati.">${sobre ? sobre: ''}</textarea>`
    perfil.innerHTML = conteudo
    return perfil
}

//pega o id da página
const pegaUrl = new URL(window.location)
const id = pegaUrl.searchParams.get('id')

//consulta o clientService e exibe os dados
const formulario = document.querySelector('[data-formPerfil]')
const exibeDados = async () => {
    try {
        const exibePerfil = await clientService.perfilUsuario(id) //consulta o clientService
        const dados = Array.isArray(exibePerfil) ? exibePerfil : [exibePerfil]; //transforma o objeto consultado em Array
        const botaoExistente = formulario.firstChild //encontra o botão de submit na página
        dados.find(e => {
            formulario.insertBefore((mostraDados(e.nome, e.telefone, e.cidade, e.sobre)), botaoExistente)//insere a função mostraDados antes do botão submit
        })
    }
    catch (erro) {
        console.log(erro)
    }

}
exibeDados()
