//valida o campo e exibe a mensagem de erro quando o campo for inválido
export function validaCampo(input){
    const tipoInput = input.dataset.type

    if (input.validity.valid){
        input.parentElement.classList.remove('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
    } else {
        input.parentElement.classList.add('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoInput, input)

    }
}

//array  com os tipos possíveis de erro
const tiposDeErro = [
    'valueMissing',
    'tipeMismatch',
    'patternMismatch',
    'customError'
]

//personaliza as mensagens de erro
const mensagensDeErro = {
    nome: {
        valueMissing: 'O campo nome não pode estar vazio'
    },
    email: {
        valueMissing: 'O campo email não pode estar vazio',
        patternMismatch: 'O email digitado não é válido'
    },
    senha: {
        valueMissing: 'O campo senha não pode estar vazio',
        patternMismatch: 'A senha deve conter 8 a 12 caracteres, um dígito e uma letra maiúscula.',
        customError: "As senhas não são iguais. Tente novamente."
    },
    telefone: {
        valueMissing: 'O campo telefone não pode estar vazio',
        patternMismatch: 'Digite um telefone válido'
    }
}

//exibe as mensagens de erro
function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = ''
    tiposDeErro.forEach(erro => {
        if (input.validity[erro]) {
            mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    })

    return mensagem
}

//comparar campos Senha e Confirma senha
var senha = document.getElementById("senha")
var confirmaSenha = document.getElementById("confirmaSenha")

function validasenha() {
    if (senha.value != confirmaSenha.value) {
        confirmaSenha.setCustomValidity("Senhas diferentes!")
    } else {
        confirmaSenha.setCustomValidity('')
    }
}
if (window.location.pathname.split('/')[1] === 'cadastro.html') { //if necesário para que a validação ocorra somente na página de cadastro
    senha.onchange = validasenha
    confirmaSenha.onkeyup = validasenha
}
