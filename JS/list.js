export const listProduct = async (tBody, listagemNavLink) => {
  const resposta = await fetch(
    "https://api-ten-alpha-15.vercel.app/api/produtos"
  );

  const produtos = await resposta.json();
  const modalTitle = document.querySelector(".modal-title");
  const modalBody = document.querySelector(".modal-body");
  const divModalBody = document.createElement("div");
  const modalButtonUpdated = document.querySelector(
    ".modal-footer #actionUpdated"
  );
  const modalButtonDelete = document.querySelector(
    ".modal-footer #actionDelete"
  );

  produtos.map((produto) => {
    const tr = document.createElement("tr");
    const tdNome = document.createElement("td");
    const tdQuantidade = document.createElement("td");
    const tdPreco = document.createElement("td");
    const tdCodigo = document.createElement("td");
    const tdAction = document.createElement("td");
    const buttonDelete = document.createElement("button");
    const buttonUpdated = document.createElement("button");

    tdCodigo.textContent = produto.codigo;
    tdNome.textContent = produto.nome;
    tdPreco.textContent = produto.preco;
    tdQuantidade.textContent = produto.quantidade;
    divModalBody.innerHTML = `Tem certeza que deseja deletar o produto ${produto.nome} de código ${produto.codigo}?`;

    buttonUpdated.classList.add(
      "btn",
      "btn-outline-primary",
      "btn-sm",
      "me-2",
      "border-0"
    );

    buttonUpdated.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        fill="currentColor" 
        class="bi bi-pencil-square" 
        viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
      </svg>
    `;

    buttonUpdated.setAttribute("data-bs-toggle", "modal");
    buttonUpdated.setAttribute("data-bs-target", "#exampleModal");

    buttonUpdated.addEventListener("click", () => {
      modalButtonDelete.style.display = "none";
      modalButtonUpdated.style.display = "block";

      modalTitle.textContent = "Editar produto";
      modalButtonUpdated.classList.remove("btn-danger");
      modalButtonUpdated.classList.add("btn-primary");

      modalBody.innerHTML = `
      <div class="container text-center">
        <div class="row">
          <div class="col">
            <div class="mb-2 d-flex align-items-center justify-content-center gap-2">
              <label for="nome" class="form-label">Nome:</label>
              <input type="text" name="nome" class="form-control" id="nome" value="${produto.nome}">
            </div>
          </div>
          <div class="col">
            <div class="mb-2 d-flex align-items-center justify-content-center gap-2">
              <label for="quantidade" class="form-label">Quantidade:</label>
              <input type="text" name="quantidade" class="form-control" id="quantidade" value="${produto.quantidade}">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
             <div class="mb-2 d-flex align-items-center justify-content-center gap-2">
              <label for="preco" class="form-label">Preço Un.:</label>
              <input type="text" name="preco" class="form-control" id="preco" value="${produto.preco}">
            </div>
          </div>
          <div class="col">
            <div class="mb-2 d-flex align-items-center justify-content-center gap-2">
              <label for="codigo" class="form-label">Código:</label>
              <input type="text" name="codigo" class="form-control" id="codigo" value="${produto.codigo}" disabled>
            </div>
          </div>
        </div>
      </div>
      `;

      modalButtonUpdated.addEventListener("click", async () => {
        try {
          await fetch(
            `https://api-ten-alpha-15.vercel.app/api/produto/atualizar`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                nome: document.getElementById("nome").value,
                quantidade: parseInt(
                  document.getElementById("quantidade").value
                ),
                preco: parseFloat(document.getElementById("preco").value),
                codigo: document.getElementById("codigo").value,
              }),
            }
          );
          listagemNavLink.click();
        } catch (error) {
          console.log(error);
        }
      });
    });

    buttonDelete.classList.add(
      "btn",
      "btn-outline-danger",
      "btn-sm",
      "border-0"
    );

    buttonDelete.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        fill="currentColor" 
        class="bi bi-trash3-fill" 
        viewBox="0 0 16 16">
        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
      </svg>
    `;

    buttonDelete.setAttribute("data-bs-toggle", "modal");
    buttonDelete.setAttribute("data-bs-target", "#exampleModal");

    buttonDelete.addEventListener("click", () => {
      const modalButtonDelete = document.getElementById("actionDelete");
      const modalButtonUpdated = document.getElementById("actionUpdated");

      modalButtonUpdated.style.display = "none";
      modalButtonDelete.style.display = "block";

      modalButtonDelete.classList.remove("btn-primary");
      modalButtonDelete.classList.add("btn-danger");

      modalTitle.textContent = "Deletar Produto";
      modalBody.innerHTML = `
      Tem certeza que deseja excluir este produto? <br />
      <strong>Produto:</strong> ${produto.nome} <br />
      <strong>Código:</strong> ${produto.codigo}
      `;

      modalButtonDelete.addEventListener("click", async () => {
        await fetch(
          `https://api-ten-alpha-15.vercel.app/api/produto/deletar/${produto.codigo}`,
          {
            method: "DELETE",
          }
        );
        listagemNavLink.click();
      });
    });

    tr.accessKey = produto.codigo;

    tr.appendChild(tdCodigo);
    tr.appendChild(tdNome);
    tr.appendChild(tdPreco);
    tr.appendChild(tdQuantidade);
    tr.appendChild(tdAction);
    tdAction.appendChild(buttonUpdated);
    tdAction.appendChild(buttonDelete);
    tBody.appendChild(tr);
    modalBody.appendChild(divModalBody);
  });
};
