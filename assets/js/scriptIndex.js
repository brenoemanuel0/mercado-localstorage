const produtos = JSON.parse(localStorage.getItem("Produtos")) || []
const lista = document.getElementById("lista-produtos")
const escapar = valor => String(valor).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c])
const moeda = valor => Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

// Escreve na tela => componente
function escreveNaTela(produtos) {
    lista.innerHTML = produtos.length ? produtos.map(produto => `
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
            <article class="card product-card">
                <div class="product-icon" aria-hidden="true">M</div>
                <div class="card-body">
                    <span class="badge rounded-pill category-badge mb-3">${escapar(produto.categoria)}</span>
                    <h2 class="h5 fw-bold mb-3">${escapar(produto.nome)}</h2>
                    <p class="product-price mb-0">${moeda(produto.preco)}</p>
                </div>
            </article>
        </div>
    `).join("") : '<div class="col-12"><div class="empty-state">Nenhum produto cadastrado ainda.</div></div>'
}
escreveNaTela(produtos)

// passo 1 pegar o select do html
const filtroCategoria = document.getElementById("filtroCategoria")
// passo 2 pegar as categorias e transforma-las em unicas
const categorias = produtos.map((produto) => produto.categoria)
const categoriasUnicas = [...new Set(categorias)]

// passo 3 escrever as categorias na tela
filtroCategoria.innerHTML += categoriasUnicas.map(categoria => `
    <option>${categoria}</option>
`).join("")





const ordemProduto = document.getElementById("ordemproduto")

// Função 1: só filtra e devolve a lista
function filtrarPorCategoria(listaProdutos) {
    const categoriaSelecionada = filtroCategoria.value

    if (categoriaSelecionada == "Todas") {
        return listaProdutos
    }
    return listaProdutos.filter(produto => produto.categoria == categoriaSelecionada)
}

// Função 2: só ordena e devolve a lista
function ordenarPorPreco(listaProdutos) {
    const ordem = ordemProduto.value
    const copia = [...listaProdutos]

    if (ordem === "maiorMenor") {
        copia.sort((a, b) => Number(b.preco) - Number(a.preco))
    } else if (ordem === "menorMaior") {
        copia.sort((a, b) => Number(a.preco) - Number(b.preco))
    }
    return copia
}

// Junta as duas e desenha na tela
function atualizarTela() {
    const filtrados = filtrarPorCategoria(produtos)
    const ordenados = ordenarPorPreco(filtrados)
    escreveNaTela(ordenados)
}

filtroCategoria.addEventListener("change", atualizarTela)
ordemProduto.addEventListener("change", atualizarTela)