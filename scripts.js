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

function checkInputs() {
  const usernameValue = username.value.trim(); // .trim() limpa os espaços antes e depois do texto;
  const carroValue = carro.value.trim();
  const placaValue = placa.value.trim();
  const vagaValue = vaga.value.trim();
  const torreValue = torre.value.trim();
  const apartamentoValue = apartamento.value.trim();

  if (usernameValue === "") {
    setErrorFor(username, "O nome do proprietário é obrigatório");
  } else {
    setSuccessFor(username);
  }

  if (carroValue === "") {
    setErrorFor(carro, "O modelo do carro é obrigatório");
  } else {
    setSuccessFor(carro);
  }

  if (placaValue === "") {
    setErrorFor(placa, "A placa é obrigatória");
  } else if (!validarPlaca(placaValue)) {
    setErrorFor(placa, "Placa inválida");
  } else {
    setSuccessFor(placa);
  }

  if (vagaValue === "") {
    setErrorFor(vaga, "O número da vaga é obrigatório");
  } else {
    setSuccessFor(vaga);
  }

  if (torreValue === "") {
    setErrorFor(torre, "O número da torre é obrigatório");
  } else {
    setSuccessFor(torre);
  }

  if (apartamentoValue === "") {
    setErrorFor(apartamento, "O número do apartamento é obrigatório");
  } else {
    setSuccessFor(apartamento);
  }

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
