import { listProduct } from "./list.js";
import { criarProduto } from "./register.js";

const form = document.getElementById("formCriar");

const cadastroNavLink = document.getElementById("cadastro");
const listagemNavLink = document.getElementById("listagem");
const editarNavLink = document.getElementById("editar");
const buttonCriarProduto = document.getElementById("criarProduto");
const messageSuccess = document.querySelector(".message-success");
const loadingPost = document.querySelector(".loading-post");
const table = document.querySelector("area-table");

const areaForm = document.querySelector(".form");
const areaList = document.querySelector(".list");
// const areaEdit = document.querySelector(".edit");

const tBody = document.getElementById("tbody");
let loading = document.getElementById("loading");

areaList.style.display = "none";
// areaEdit.style.display = "none";

form.addEventListener("submit", (e) => e.preventDefault());

// Link de navegação do cadastro
cadastroNavLink.addEventListener("click", () => {
  // window.location.href = "cadastro.html";
  areaForm.style.display = "flex";
  areaList.style.display = "none";

  cadastroNavLink.classList.add("active");
  listagemNavLink.classList.remove("active");

  // areaEdit.style.display = "none";
});

cadastroNavLink.classList.add("active");

// Link de navegação da listagem
listagemNavLink.addEventListener("click", () => {
  // window.location.href = "listagem.html";
  areaList.style.display = "flex";
  areaForm.style.display = "none";
  // areaEdit.style.display = "none";

  cadastroNavLink.classList.remove("active");
  listagemNavLink.classList.add("active");

  tBody.innerHTML = "";

  loading.style.display = "flex";

  setTimeout(() => {
    listProduct(tBody, listagemNavLink);
  }, 2000);

  setTimeout(() => {
    loading.style.display = "none";
  }, 2000);
});

// Link de navegação da edição
// editarNavLink.addEventListener("click", () => {
//   // window.location.href = "editar.html";
//   areaEdit.style.display = "flex";
//   areaForm.style.display = "none";
//   areaList.style.display = "none";
// });

buttonCriarProduto.addEventListener("click", async () => {
  await criarProduto(form, messageSuccess, loadingPost);
});
