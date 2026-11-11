const formCadastro = document.getElementById("formCadastro")
const listaProdutos = document.getElementById("itens")
let indiceEditando = null
let produtosLocalStorage = JSON.parse(localStorage.getItem("Produtos")) || []
const escapar = valor => String(valor).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[c])
const moeda = valor => Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

function renderizarProdutos() {
    listaProdutos.innerHTML = produtosLocalStorage.length ? produtosLocalStorage.map((produto, index) => `
        <tr>
            <td class="fw-semibold">${escapar(produto.nome)}</td>
            <td><span class="badge rounded-pill category-badge">${escapar(produto.categoria)}</span></td>
            <td>${moeda(produto.preco)}</td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-success me-1" onclick="editarProduto(${index})">Editar</button>
                <button class="btn btn-sm btn-outline-danger" onclick="excluirProduto(${index})">Excluir</button>
            </td>
        </tr>
    `).join("") : '<tr><td colspan="4" class="text-center text-secondary py-4">Nenhum produto cadastrado.</td></tr>'
}

formCadastro.onsubmit = event => {
    event.preventDefault()
    const produto = {
        nome: document.getElementById("nome").value.trim(),
        preco: Number(document.getElementById("preco").value),
        categoria: document.getElementById("categoria").value.trim()
    }
    if (indiceEditando !== null) produtosLocalStorage[indiceEditando] = produto
    else produtosLocalStorage.push(produto)
    localStorage.setItem("Produtos", JSON.stringify(produtosLocalStorage))
    indiceEditando = null
    formCadastro.reset()
    renderizarProdutos()
}
formCadastro.onreset = () => { indiceEditando = null }

function excluirProduto(index) {
    if (!confirm("Deseja excluir este produto?")) return
    produtosLocalStorage.splice(index, 1)
    localStorage.setItem("Produtos", JSON.stringify(produtosLocalStorage))
    renderizarProdutos()
}
function editarProduto(index) {
    const produto = produtosLocalStorage[index]
    document.getElementById("nome").value = produto.nome
    document.getElementById("preco").value = produto.preco
    document.getElementById("categoria").value = produto.categoria
    indiceEditando = index
    formCadastro.scrollIntoView({ behavior: "smooth", block: "center" })
}
renderizarProdutos()
