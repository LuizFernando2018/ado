import { clientService } from "../../controllerLogin.js"
//puxa o id da página para saber quem atualizar
const pegaUrl = new URL(window.location)
const id = pegaUrl.searchParams.get('id')

const formulario = document.querySelector('[data-formPerfil]') 
//atualiza o usuário
formulario.addEventListener('submit', async (e) => {
  e.preventDefault()
  const inputNome = document.querySelector('[data-type="nome"]').value
  const inputTelefone = document.querySelector('[data-type="telefone"]').value
  const inputCidade = document.querySelector('[data-type="cidade"]').value
  const inputSobre = document.querySelector('[data-type="sobre"]').value

  const usuario = await clientService.lerUsuario(id)

  const camposAtualizados = {
    nome: inputNome,
    telefone: inputTelefone,
    cidade: inputCidade,
    sobre: inputSobre,
  }

  const usuarioAtualizado = Object.assign({}, usuario, camposAtualizados) //cria um novo objeto com os campos antigos e novos
  await clientService.atualizarUsuario(usuarioAtualizado) //insere o novo objeto
  window.location.reload() //recarrega a página para que os dados sejam atualizados
})