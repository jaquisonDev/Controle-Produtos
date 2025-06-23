export const criarProduto = async (form, message, loading) => {
  const data = new FormData(form);

  const nome = data.get("nome");
  const quantidade = parseInt(data.get("quantidade"));
  const preco = parseFloat(data.get("preco"));
  const codigo = data.get("codigo");

  console.log({
    nome,
    quantidade,
    preco,
    codigo,
  });

  if (!nome || !quantidade || !preco || !codigo) {
    console.log("Preencha todos os campos");
    return;
  }

  try {
    await fetch("https://api-ten-alpha-15.vercel.app/api/produto/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        quantidade,
        preco,
        codigo,
      }),
    });

    loading.style.display = "flex";

    setTimeout(() => {
      loading.style.display = "none";
      message.style.display = "flex";
    }, 5000);

    form.reset();

    setTimeout(() => {
      message.style.display = "none";
    }, 11000);
  } catch (error) {
    throw new Error(`Erro na requisição: ${resposta}`);
  }
};
