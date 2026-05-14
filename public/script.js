const data = {
    produtos: [
        {
            id: 1,
            nome: "iPhone 14",
            preco: 5999.90,
            categoria: "Celulares",
            imagem: "https://picsum.photos/200?1",
            descricao: "Smartphone Apple com excelente câmera.",
            emEstoque: true
        },
        {
            id: 2,
            nome: "Galaxy S23",
            preco: 4999.90,
            categoria: "Celulares",
            imagem: "https://picsum.photos/200?2",
            descricao: "Celular Samsung topo de linha.",
            emEstoque: true
        },
        {
            id: 3,
            nome: "Notebook Dell",
            preco: 4200.00,
            categoria: "Notebooks",
            imagem: "https://picsum.photos/200?3",
            descricao: "Notebook ideal para estudos e trabalho.",
            emEstoque: false
        },
        {
            id: 4,
            nome: "MacBook Air",
            preco: 8500.00,
            categoria: "Notebooks",
            imagem: "https://picsum.photos/200?4",
            descricao: "Notebook leve e poderoso da Apple.",
            emEstoque: true
        },
        {
            id: 5,
            nome: "Mouse Gamer",
            preco: 199.90,
            categoria: "Acessórios",
            imagem: "https://picsum.photos/200?5",
            descricao: "Mouse RGB com alta precisão.",
            emEstoque: true
        },
        {
            id: 6,
            nome: "Teclado Mecânico",
            preco: 350.00,
            categoria: "Acessórios",
            imagem: "https://picsum.photos/200?6",
            descricao: "Teclado gamer mecânico RGB.",
            emEstoque: true
        },
        {
            id: 7,
            nome: "PlayStation 5",
            preco: 4500.00,
            categoria: "Games",
            imagem: "https://picsum.photos/200?7",
            descricao: "Console da Sony de nova geração.",
            emEstoque: false
        },
        {
            id: 8,
            nome: "Xbox Series X",
            preco: 4300.00,
            categoria: "Games",
            imagem: "https://picsum.photos/200?8",
            descricao: "Console poderoso da Microsoft.",
            emEstoque: true
        }
    ]
};

const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");

const btnRender = document.getElementById("btnRender");

function formatPrice(preco) {
    return `R$ ${preco.toFixed(2)}`;
}

function createProductCard(produto) {

    const card = document.createElement("div");

    card.setAttribute("data-id", produto.id);

    card.classList.add("card");

    card.style.backgroundColor = "#fff";

    const img = document.createElement("img");
    img.src = produto.imagem;

    const title = document.createElement("h3");
    title.classList.add("card-title");
    title.textContent = produto.nome;

    const price = document.createElement("p");
    price.textContent = formatPrice(produto.preco);

    const category = document.createElement("p");
    category.textContent = produto.categoria;

    const btnDetails = document.createElement("button");
    btnDetails.textContent = "Ver detalhes";

    btnDetails.addEventListener("click", () => {
        showProductDetails(produto);
    });

    const btnHighlight = document.createElement("button");
    btnHighlight.textContent = "Exibir";

    btnHighlight.addEventListener("click", () => {
        card.classList.toggle("highlight");
    });

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(category);
    card.appendChild(btnDetails);
    card.appendChild(btnHighlight);

    return card;
}

function renderProducts(produtos) {

    productList.innerHTML = "";

    produtos.forEach(produto => {
        const card = createProductCard(produto);
        productList.appendChild(card);
    });

    const allCards = document.querySelectorAll(".card");

    allCards.forEach(card => {
        console.log("Card ID:", card.getAttribute("data-id"));
        card.style.transition = "0.3s";
    });
}

function renderCategories() {

    const categorias = [
        ...new Set(data.produtos.map(produto => produto.categoria))
    ];

    categorySelect.innerHTML = '<option value="Todas">Todas</option>';

    categorias.forEach(categoria => {

        const option = document.createElement("option");

        option.value = categoria;
        option.textContent = categoria;

        categorySelect.appendChild(option);
    });
}

function showProductDetails(produto) {

    productDetails.innerHTML = `
    <h2>${produto.nome}</h2>
    <img src="${produto.imagem}" width="200">
    <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
    <p><strong>Categoria:</strong> ${produto.categoria}</p>
    <p><strong>Estoque:</strong> ${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
    <p><strong>Descrição:</strong> ${produto.descricao}</p>
  `;
}

function filterProducts() {

    const textoBusca = searchInput.value.toLowerCase();
    const categoriaSelecionada = categorySelect.value;

    return data.produtos.filter(produto => {

        const matchNome =
            produto.nome.toLowerCase().includes(textoBusca);

        const matchCategoria =
            categoriaSelecionada === "Todas" ||
            produto.categoria === categoriaSelecionada;

        return matchNome && matchCategoria;
    });
}

searchInput.addEventListener("input", () => {
    renderProducts(filterProducts());
});

categorySelect.addEventListener("change", () => {
    renderProducts(filterProducts());
});

btnRender.addEventListener("click", () => {
    renderProducts(filterProducts());
});

renderCategories();
renderProducts(data.produtos);