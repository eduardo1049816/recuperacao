// ====== PROTEÇÃO DA ROTA (LOGIN) ======
// Se não estiver logado, chuta o usuário de volta pro login
if (localStorage.getItem('logado') !== 'true') {
    window.location.href = 'login.html';
}

function sair() {
    localStorage.removeItem('logado');
    window.location.href = 'login.html';
}
// ======================================

const formulario = document.getElementById('formAdmin');
const tabelaCorpo = document.getElementById('tabelaCorpo');

window.addEventListener('DOMContentLoaded', carregarTabela);

// Exibe os dados na Tabela
function carregarTabela() {
    const dados = getProdutos();
    tabelaCorpo.innerHTML = '';

    dados.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#${item.id}</td>
            <td><img src="${item.imagem_url || 'https://via.placeholder.com/50'}" width="40" style="border-radius:5px;"></td>
            <td><strong>${item.nome}</strong></td>
            <td style="text-transform: capitalize;">${item.categoria}</td>
            <td>R$ ${Number(item.preco).toFixed(2)}</td>
            <td>
                <button class="btn-acao btn-editar" onclick="preencherForm('${item.id}', '${item.nome}', '${item.descricao}', '${item.preco}', '${item.categoria}', '${item.imagem_url}')"><i class="fa fa-pen"></i></button>
                <button class="btn-acao btn-excluir" onclick="deletarItem(${item.id})"><i class="fa fa-trash"></i></button>
            </td>
        `;
        tabelaCorpo.appendChild(tr);
    });
}

// Ação de SALVAR (Cadastrar Novo ou Alterar Existente)
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('idProduto').value;
    const payload = {
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        preco: parseFloat(document.getElementById('preco').value),
        categoria: document.getElementById('categoria').value,
        imagem_url: document.getElementById('imagem_url').value
    };

    if (payload.preco <= 0) {
        mostrarToast("O preço deve ser maior que zero!", "erro");
        return;
    }

    // Puxa o banco de dados atual
    let produtos = getProdutos();

    if (id) {
        // Se tem ID, estamos ALTERANDO um produto existente
        const index = produtos.findIndex(p => p.id == id);
        produtos[index] = { ...payload, id: Number(id) };
        mostrarToast("Produto atualizado com sucesso!", "sucesso");
    } else {
        // Se NÃO tem ID, estamos CADASTRANDO um novo
        payload.id = Date.now(); // Cria um ID único baseado na data
        produtos.push(payload);
        mostrarToast("Novo produto cadastrado!", "sucesso");
    }

    // Salva de volta no banco de dados do navegador
    localStorage.setItem('aura_produtos', JSON.stringify(produtos));

    formulario.reset(); 
    document.getElementById('idProduto').value = '';
    carregarTabela(); // Atualiza a tabela na mesma hora
});

// Coloca os dados do produto no formulário para Editar
function preencherForm(id, nome, desc, preco, cat, img) {
    document.getElementById('idProduto').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('descricao').value = desc;
    document.getElementById('preco').value = preco;
    document.getElementById('categoria').value = cat;
    document.getElementById('imagem_url').value = img;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Ação de EXCLUIR
function deletarItem(id) {
    if (confirm("Deseja realmente excluir este produto do catálogo?")) {
        let produtos = getProdutos();
        // Filtra removendo o produto que tem o ID selecionado
        produtos = produtos.filter(p => p.id !== id);
        
        // Salva novamente
        localStorage.setItem('aura_produtos', JSON.stringify(produtos));
        
        mostrarToast("Produto excluído permanentemente!", "sucesso");
        carregarTabela();
    }
}