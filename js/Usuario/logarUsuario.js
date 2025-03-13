import { clientService } from "../../controllerLogin.js";
const formulario =  document.querySelector('[data-formLogin]')

//Loga o usuário ao enviar foulario
formulario.addEventListener('submit', async (e)=>{
e.preventDefault()
const email = e.target.querySelector("[data-type='email']").value
const senha = e.target.querySelector("[data-type='senha']").value
try{
    const resultadoUsuarios = clientService.logarUsuario() //aciona clientService para puxar os dados
    await resultadoUsuarios.then((dados)=>{
        for (let index = 0; index < dados.length; index++) { //percorre todo o array de dados
            if (dados[index].email == email && dados[index].senha == senha) { //login se informações baterem
                let id = dados[index].id
                window.location.href = "../../perfil.html?id=" + id 
                break
            }
            else if (dados[index].email == email && dados[index].senha != senha) { //exibe info de senha errada
                alert("Senha digitada está errada")
                break
            }
            else if (index == (dados.length)-1) { //usuario não encontrado
                alert("Usuario não encontrado")
            }
        }
    })
}
catch (erro){
    console.log(erro)
}
})