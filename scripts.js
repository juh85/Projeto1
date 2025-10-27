const form = document.getElementById("form");
const username = document.getElementById("username");
const carro = document.getElementById("carro");
const placa = document.getElementById("placa");
const vaga = document.getElementById("vaga");
const torre = document.getElementById("torre");
const apartamento = document.getElementById("apt");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

function validarPlaca(placa) {
  // Remove espaços e transforma em maiúscula
  placa = placa.trim().toUpperCase();

  // Padrão Antigo: ABC1234
  // Padrão Mercosul: ABC1D23
  const padraoAntigo = /^[A-Z]{3}[0-9]{4}$/;
  const padraoMercosul = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;

  return padraoAntigo.test(placa) || padraoMercosul.test(placa);
}

placa.addEventListener("input", function () {
  this.value = this.value.toUpperCase().trim();

  // Limita o tamanho máximo para 7 caracteres
  if (this.value.length > 7) {
    this.value = this.value.slice(0, 7);
  }
});

const nomesCampos = {
  username: "Proprietário",
  carro: "Modelo do carro",
  placa: "Placa",
  vaga: "Número da vaga",
  torre: "Torre",
  apt: "Apartamento",
}; 

// Eventos para validar em tempo real
[username, carro, placa, vaga, torre, apartamento].forEach((input) => {
  input.addEventListener("input", () => validarCampo(input));
});

// Validação individual de cada campo
function validarCampo(input) {
  const id = input.id;
  const valor = input.value.trim();

  if (valor === "") {
    setErrorFor(input, `O campo ${nomesCampos[id]} é obrigatório`);
    return;
  }

  // Validação especial para a placa
  if (id === "placa" && !validarPlaca(valor)) {
    setErrorFor(input, "Placa inválida");
    return;
  }

  setSuccessFor(input);
}

// Função principal de validação ao enviar
function checkInputs() {
  [username, carro, placa, vaga, torre, apartamento].forEach((input) =>
    validarCampo(input)
  );

  // Validar se todos os campos estão preenchidos
  const formControls = form.querySelectorAll(".form-control");

  const formIsValid = [...formControls].every((formControl) => {
    return formControl.className === "form-control success";
  });

  if (formIsValid) {
    console.log("o formulario está 100% válido");
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  // Adicionar mensagem de erro
  small.innerText = message;

  // Adiciona a classe do erro
  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;

  // Adicionar a class de sucesso
  formControl.className = "form-control success";
}
