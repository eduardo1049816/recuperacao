// Dados Iniciais
const API_URL = "http://localhost:3000";

const dadosIniciais = [
    { id: 1, nome: "Apple iPhone 14 Pro Max", descricao: "256GB Deep Purple", preco: 7499.00, categoria: "produto", imagem_url: "https://m.media-amazon.com/images/I/71yzJoE7WlL._AC_SX679_.jpg" },
    { id: 2, nome: "Fone Bluetooth JBL", descricao: "Bateria até 57h", preco: 250.00, categoria: "produto", imagem_url: "https://m.media-amazon.com/images/I/51+nXDpI8GL._AC_SX679_.jpg" },
    { id: 3, nome: "Whisky Johnnie Walker", descricao: "12 Anos 1 Litro", preco: 149.90, categoria: "bebida", imagem_url: "https://m.media-amazon.com/images/I/61N+tB9W1+L._AC_SX679_.jpg" }
];

if (!localStorage.getItem('aura_produtos')) localStorage.setItem('aura_produtos', JSON.stringify(dadosIniciais));

// ===== LÓGICA DO BANCO DE DADOS =====
async function getProdutos(busca = "") {
    const response = await fetch(`${API_URL}/produtos`);
    let produtos = await response.json();

    if (busca) {
        produtos = produtos.filter(produto =>
            produto.nome.toLowerCase().includes(busca.toLowerCase())
        );
    }

    return produtos;
}

// ===== MENSAGENS (TOAST) =====
function mostrarToast(mensagem, tipo = 'sucesso') {
    const toast = document.getElementById('toast');
    if(!toast) return;
    toast.textContent = mensagem;
    toast.className = `toast show ${tipo}`;
    setTimeout(() => { toast.className = 'toast'; }, 3000);
}

// ===== LÓGICA DO CARRINHO =====
let carrinho = JSON.parse(localStorage.getItem('aura_carrinho')) || [];

function toggleCarrinho() {
    document.getElementById('cart-sidebar').classList.toggle('open');
}

async function adicionarAoCarrinho(idProduto){

    const produtos = await getProdutos();

    const produto = produtos.find(p=>p.id_produto == idProduto);

    if(!produto) return;

    carrinho.push(produto);

    localStorage.setItem("aura_carrinho",JSON.stringify(carrinho));

    atualizarCarrinhoUI();

    mostrarToast("Produto adicionado ao carrinho!");

}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    localStorage.setItem('aura_carrinho', JSON.stringify(carrinho));
    atualizarCarrinhoUI();
}

function finalizarCompra() {
    if(carrinho.length === 0) {
        mostrarToast('Seu carrinho está vazio!', 'erro');
        return;
    }
    mostrarToast('Compra finalizada com sucesso! Obrigado.', 'sucesso');
    carrinho = []; // Limpa o carrinho
    localStorage.setItem('aura_carrinho', JSON.stringify(carrinho));
    atualizarCarrinhoUI();
    toggleCarrinho(); // Fecha a aba
}

function atualizarCarrinhoUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total-price');

    if(!cartCount) return; // Evita erro no painel de admin onde não tem carrinho

    // Atualiza a bolinha vermelha no topo
    cartCount.textContent = carrinho.length;

    // Atualiza a lista
    cartItems.innerHTML = '';
    let total = 0;

    if(carrinho.length === 0) {
        cartItems.innerHTML = '<p style="color: gray; text-align:center; margin-top: 20px;">Seu carrinho está vazio.</p>';
    }

    carrinho.forEach((item, index) => {
        total += item.preco;
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.imagem_url || 'https://via.placeholder.com/60'}" alt="">
                <div class="cart-item-info">
                    <h4>${item.nome}</h4>
                    <p>R$ ${item.preco.toFixed(2)}</p>
                    <button class="btn-remove-cart" onclick="removerDoCarrinho(${index})"><i class="fa fa-trash"></i> Remover</button>
                </div>
            </div>
        `;
    });

    cartTotal.textContent = `R$ ${total.toFixed(2)}`;
}

// ===== RENDERIZAÇÃO DOS CARDS (Agora com botão Comprar) =====
function criarHTMLCard(item) {
    const preco = Number(item.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const imgUrl = item.imagem_url || 'https://via.placeholder.com/250';
    return `
        <div class="card">
            <div class="card-img-container">
                <img src="${imgUrl}" alt="${item.nome}">
            </div>
            <div class="card-info">
                <span class="badge">Envio Expresso</span>
                <p class="titulo">${item.nome} - ${item.descricao}</p>
                <p class="preco">${preco}</p>
                <button class="btn-add-cart"onclick="adicionarAoCarrinho(${item.id_produto})"><i class="fa fa-shopping-cart"></i> Comprar</button>
            </div>
        </div>
    `;
}

// Inicializa a Tela Home
async function carregarHome() {

    const dados = await getProdutos();

    const gridProd = document.getElementById("gridProdutos");
    const gridBeb = document.getElementById("gridBebidas");

    if (!gridProd) return;

    gridProd.innerHTML = "";
    gridBeb.innerHTML = "";

    dados.forEach(item => {

        if(item.categoria === "produto")
            gridProd.innerHTML += criarHTMLCard(item);

        if(item.categoria === "bebida")
            gridBeb.innerHTML += criarHTMLCard(item);

    });

}

function buscar() {
    const termo = document.getElementById('inputPesquisa').value;
    window.location.href = `pesquisa.html?q=${encodeURIComponent(termo)}`;
}

// Executa ao iniciar o site
window.onload = () => {
    if(document.getElementById('gridProdutos')) carregarHome();
    atualizarCarrinhoUI(); // Atualiza o carrinho ao abrir qualquer página
};