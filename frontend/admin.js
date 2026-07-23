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
async function carregarTabela(){

    const response = await fetch("http://localhost:3000/produtos");

    const dados = await response.json();

    tabelaCorpo.innerHTML="";

    dados.forEach(item=>{

        tabelaCorpo.innerHTML+=`

        <tr>

            <td>${item.id_produto}</td>

            <td>${item.nome}</td>

            <td>${item.categoria}</td>

            <td>R$ ${Number(item.preco).toFixed(2)}</td>

            <td>

                <button onclick="deletarItem(${item.id_produto})">

                    Excluir

                </button>

            </td>

        </tr>

        `;

    });

}

// Ação de SALVAR (Cadastrar Novo ou Alterar Existente)
formulario.addEventListener("submit", async(e)=>{

    e.preventDefault();

    const produto={

        nome:document.getElementById("nome").value,

        descricao:document.getElementById("descricao").value,

        preco:Number(document.getElementById("preco").value),

        estoque:100,

        categoria:document.getElementById("categoria").value

    };

    await fetch("http://localhost:3000/produtos",{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify(produto)

    });

    formulario.reset();

    carregarTabela();

    mostrarToast("Produto cadastrado!");

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
async function deletarItem(id) {

    if (!confirm("Deseja realmente excluir este produto do catálogo?")) {
        return;
    }

    try {

        await fetch(`http://localhost:3000/produtos/${id}`, {
            method: "DELETE"
        });

        mostrarToast("Produto excluído com sucesso!", "sucesso");

        carregarTabela();

    } catch (error) {

        console.error(error);

        mostrarToast("Erro ao excluir produto.", "erro");

    }

}