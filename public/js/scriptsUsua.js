const formUsua = document.getElementById("formUsua");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const senhaCon = document.getElementById("senhaCon");
const username = document.getElementById("name");
const cpf = document.getElementById("cpf");
const cargo = document.getElementById("cargo");

formUsua.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

function validarCPF(cpf){
  cpf = cpf.replace(/[^\d]+/g, ""); // remove pontos e traços
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false; // invalida cpf com tamanho errado ou todos os digitos iguais
  }
  let soma = 0;
  let resto;

  // Valida o 1º dígito verificador
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;

  // Valida o 2º dígito verificador
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;

};

const cpfInput = document.getElementById("cpf");

cpfInput.addEventListener("input", () => {
  // Limita o tamanho máximo para 11 caracteres
  if (cpfInput.value.length > 11) {
    cpfInput.value = cpfInput.value.slice(0, 11);
  }
});


const nomeCampo = {
  email: "Email",
  senha: "Senha",
  senhaCon: "Confirmar senha",
  name: "Nome",
  cpf: "CPF",
  cargo: "Cargo",
};

// Validar em tempo real
[email, senha, senhaCon, username, cpf, cargo].forEach((input) => {
  input.addEventListener("input", () => validaCampo(input));
});

// Validação individual de cada campo
function validaCampo(input) {
  const id = input.id;
  const valor = input.value.trim();

  if (valor === "") {
    setErrorFor(input, `O campo ${nomeCampo[id]} é obrigadorio`);
    return;
  }
  // Validação especial para o email
  if (id === "email" && !validarEmail(valor)) {
    setErrorFor(input, "Email inválido");
    return;
  }
  // Validação especial para senha e confirmar senha
  if ((id === "senha" || id === "senhaCon") && senha.value.trim() !== senhaCon.value.trim()) {
    setErrorFor(input, "As senhas estão diferentes");
    return;
  }

  // Validação especial para o Cpf
  if (id === "cpf" && !validarCPF(valor)) {
    setErrorFor(input, "CPF inválido");
    return;
  }

  setSuccessFor(input);
}

// Validação de email no frontend
function validarEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

// Função principal de validação ao enviar
function checkInputs() {
  [email, senha, senhaCon, username, cpf, cargo].forEach((input) =>
    validaCampo(input)
  );

  // Validar se todos os campos estão preenchidos
  const formUser = formUsua.querySelectorAll(".form-control");

  const formValid = [...formUser].every((formControl) => {
    return formControl.className === "form-control success";
  });

  if (formValid) {
    console.log("o formulario está 100% válido");
    enviarDadosUser();
  }
}

// Função para enviar os dados para o servidor
function enviarDadosUser() {
  const dadosU = {
    email: email.value,
    senha: senha.value,
    nome: username.value,
    cpf: cpf.value,
    cargo: cargo.value,
  };
  fetch("http://localhost:3000/usuario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dadosU),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Usuário cadastrado com sucesso!");
        // Limpa o formulário
        formUsua.reset();
        // Remove as classes de sucesso dos campos
        formUsua.querySelectorAll(".form-control").forEach((control) => {
          control.className = "form-control";
        });
      } else {
        alert("Erro ao cadastrar usuário. Tente novamente.");
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert(
        "Erro ao conectar com o servidor. Verifique se o servidor está rodando."
      );
    });
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  // Adicionar mensagem de erro
  small.innerText = message;

  // Adiciona a Classe do erro
  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;

  //Adiciona a class de sucesso
  formControl.className = "form-control success";
}
