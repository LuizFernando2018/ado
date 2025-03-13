import { clientService } from "../../controllerLogin.js";

const formulario = document.querySelector('[data-formCadastro]')
//cria novo usuário com o que for preenchido nos inputs
formulario.addEventListener('submit', async (e)=> {
  e.preventDefault()
  const nome = e.target.querySelector("[data-type='nome']").value
  const email = e.target.querySelector("[data-type='email']").value
  const senha = e.target.querySelector("[data-type='senha']").value
  try{
    await clientService.criarUsuario(nome, email, senha) //insere os dados
    window.location.href = "../../login.html"

  }
  catch(erro){
    console.log(erro)
  }
})
