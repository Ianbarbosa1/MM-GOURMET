//ABERTURA DO CARRINHO
function abrirCart() {
    const modal = document.getElementById('carrinho');
    modal.classList.add("abrir");

    modal.addEventListener('click', (e) => {
        if (e.target.id === 'carrinho' || e.target.id === 'fc') {
            modal.classList.remove('abrir')
        }
    })
}


//ENTRADA E SAIDA DO DADOS ADICIONAIS
let divEndereco = document.querySelector('.container-dados-adicionais')
let addDados = document.querySelector('#add-dados')
var adicional = document.querySelector('#adicional')
addDados.addEventListener('click', abrirDados)
function abrirDados() {
    divEndereco.style.display = 'flex'
    observacao = adicional.value
    return observacao
}

let retorno = document.querySelector('.retornar')
retorno.addEventListener('click', fechar)
function fechar() {
    divEndereco.style.display = 'none'
}


//CONFIRMANDO QUE O PRODUTO FOI ADICIONADO AO CARRINHO
let carrinho = []
var produtoCarrinho = document.querySelector('.produtos-adicionados')
var container = document.querySelector('.container-prime')
var valorFinal = document.querySelector('.valor-total')
var confirmacao = document.querySelector('.aviso')

container.addEventListener('click', function (event) {
    let parentButton = event.target.closest('.adicionar')
    if (parentButton) {
        var nome = parentButton.getAttribute('nome')
        var valor = parseFloat(parentButton.getAttribute('valor'))
        addToCart(nome, valor)

        confirmacao.innerHTML = 'ADICIONADO!'
        confirmacao.style.backgroundColor = 'rgba(78, 223, 78, 0.753)'
        confirmacao.style.color = 'white'
        confirmacao.style.padding = '10px'
        setTimeout(() => {
            confirmacao.innerHTML = ''
            confirmacao.style.backgroundColor = 'transparent'
            confirmacao.style.padding = '0px'
        }, 2000);
    }
})


//ADICIONA O PRODUTO NO CARRINHO
function addToCart(nome, valor) {
    var verificacao = carrinho.find(item => item.nome === nome)
    if (verificacao) {
        verificacao.quantidade += 1
    }
    else {
        carrinho.push({
            nome,
            valor,
            quantidade: 1,
        })
    }
    atualizarCarrinho()
}


//ATUALIZAÇÃO DO CARRINHO
function atualizarCarrinho() {
    produtoCarrinho.innerHTML = ""
    var total = 0
    carrinho.forEach(item => {
        var elementoCarrinho = document.createElement('div')
        elementoCarrinho.innerHTML = `
            <nav> 
                <div>
                    <p>${item.nome}</p>
                    <p>Qtd: ${item.quantidade}</p>
                    <p>R$ ${item.valor.toFixed(2)}</p>
                </div>

                
                <button class="remove" nome="${item.nome}">
                 excluir
                </button>
            </nav>
        `
        total += item.valor * item.quantidade
        produtoCarrinho.appendChild(elementoCarrinho)
    })
    var dados = document.querySelector('#add-dados')
    if (carrinho.length > 0) {
        dados.style.display = 'block'
        adicional.style.display = 'flex'
    }
    else {
        dados.style.display = 'none'
        adicional.style.display = 'none'
    }
    valorFinal.innerHTML = `Total: R$ ${total.toFixed(2)}`
    return total
}


//REMOÇÃO DO PRODUTO NO CARRINHO
produtoCarrinho.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove")) {
        var nome = event.target.getAttribute("nome")
        removerProduto(nome)
    }
})
function removerProduto(nome) {
    var posicao = carrinho.findIndex(item => item.nome === nome)

    if (posicao !== -1) {
        var produto = carrinho[posicao]
        if (produto.quantidade > 1) {
            produto.quantidade -= 1
            atualizarCarrinho()
            return
        }
        carrinho.splice(posicao, 1)
        atualizarCarrinho()
    }
}


//ENTRADA E SAIDA DO MODAL DE ESCOLHE DO BAIRRO 
let containerBairro = document.querySelector('.container-bairro')
let addBairro = document.querySelector('#editar-bairro').addEventListener('click', abrirBairro)
function abrirBairro(){
    containerBairro.style.display = 'flex'
}
let closeBairro = document.querySelector('#botao-bairro').addEventListener('click', fecharBairro)
function fecharBairro() {
    containerBairro.style.display = 'none'
}

//FILTRO DO VALOR DA ENTREGA
function escolhaBairro() {
    let selecao = document.querySelector('#bairros-itaborai')
    let bairros = selecao.options[selecao.selectedIndex]
    let bairro = bairros.text
    let TaxaEntrega = 0
    if (bairro === 'Areal' || bairro === 'Nancilândia' || bairro === 'Venda das Pedras' || bairro === 'Jardim Imperial' || bairro === 'Ferma' || bairro === 'Sossego' ) {
        TaxaEntrega = 3
    }
    else if (bairro === 'Vila Rica' || bairro === 'Centro' || bairro === 'Nova Cidade' || bairro === 'Quissamã' || bairro === 'Retiro') {
        TaxaEntrega = 4
    }
    else if (bairro === 'Rio Várzea' || bairro === 'Colônia') {
        TaxaEntrega = 5
    }
    else if (bairro === 'Ampliação' || bairro === 'Caluge' || bairro === 'Engenho Velho' || bairro === 'Santo Expedito') {
        TaxaEntrega = 6
    }
    
    let taxa = document.querySelector('.taxa')
    let valor = document.querySelector('.valorTot')
    let valorTotal = atualizarCarrinho()
    let valorFinal = valorTotal + TaxaEntrega
    if(TaxaEntrega === 0){
        taxa.innerHTML = `Escolha o bairro ->>> `
    }
    else{
        taxa.innerHTML = `Taxa de entrega: ${TaxaEntrega.toFixed(2)}`
        valor.innerHTML = `Total: ${valorFinal.toFixed(2)}`
    }
    return valorFinal
}


//FORMA DE PAGAMENTO
var sn = document.querySelector('#SN')
let troco = document.querySelector('.troco')
function formasPagamentos() {
    let opcao = document.querySelector('#pagamentos')
    let formas = opcao.options[opcao.selectedIndex]
    let pagamento = formas.text

    if (pagamento === 'DINHEIRO') {
        sn.style.display = 'flex'
    }
    else {
        sn.style.display = 'none'
    }
    return pagamento
}


//VERIFICA SE O USUÁRIO QUER TROCO 
function simNao() {
    let troco = document.querySelector('.troco')
    let decisao = sn.value
    if (decisao === '1') {
        troco.style.display = 'flex'
        return decisao
    }
    else if (decisao === '2') {
        troco.style.display = 'none'
        return decisao
    }
    else if (decisao === '0'){
        troco.style.display = 'none'
    }
}


//ENVIO DOS DADOS PARA O VENDEDOR
let botao = document.querySelector('.enviar')
botao.addEventListener('click', envio)
function envio() {
    let PagamentoDinheiro = simNao()
    let troco = document.querySelector('.troco').value
    let frase = ''
    if (PagamentoDinheiro === '1') {
        troco = Number(troco)
    }
    else if (PagamentoDinheiro === '2') {
        frase = 'Não precisa de troco'

    }

    let nome = document.querySelector('#nome-usuario').value
    let tipoPagamento = formasPagamentos()
    let valorTotal = Number(escolhaBairro().toFixed(2))
    let obs = abrirDados()
    let numero = '5521998382523'

    let a = 0
    var produto = []
    while (a < carrinho.length) {
        produto.push([carrinho[a].quantidade + '-' + carrinho[a].nome, '%0a'])
        a++
    }

    let valorDotroco = (troco - valorTotal).toFixed(2)
    let vlProdutos = atualizarCarrinho()

    if (nome === '') {
        alert('Por favor, digite seu nome!')
        preventDefault()
    }
    else if (tipoPagamento === 'FORMAS DE PAGAMENTO') {
        alert('Por favor, escolha uma forma de pagamento válida')
        preventDefault()
    }
    else if(valorTotal === vlProdutos){
        alert('Por favor, escolha um bairro válido')
        let editarBairro = document.querySelector('#editar-bairro')
        let ContBairro = document.querySelector('.container-taxa')
        setTimeout(() => {
            editarBairro.style.border = '1px solid red'
            ContBairro.style.border = '1px solid red'
        }, 100);
        setTimeout(() => {
            editarBairro.style.border = 'none'
            ContBairro.style.border = 'none'
        }, 5000);
    }
    else if (tipoPagamento === 'DINHEIRO') {
        if (troco < valorTotal && PagamentoDinheiro === '1') {
            alert(`O valor adicionado no pagamento tem que ser maior do que o valor total da compra de R$${valorTotal}`)
        }
        else if (troco > valorTotal) {
            if (PagamentoDinheiro === '1') {
                let url = 'http://wa.me/' + numero + '?text='
                    + '*PEDIDO MM-GOURMET*' + '%0a'
                    + ' ' + '%0a'
                    + '*Nome:* ' + nome + '%0a%0a'
                    + '*-----PRODUTOS-----*' + '%0a'
                    + produto + '%0a'
                    + '*Obs:* ' + obs + '%0a'
                    + '*Forma de pagamento:* ' + tipoPagamento + '%0a'
                    + '*Valor Total:* R$' + valorTotal + '%0a'
                    + '*Troco:* R$' + valorDotroco + '%0a'
                window.open(url, '_blank').focus()
            }
        }
        else if (PagamentoDinheiro === '2') {
            let url = 'http://wa.me/' + numero + '?text='
                + '*PEDIDO MM-GOURMET*' + '%0a'
                + ' ' + '%0a'
                + '*Nome:* ' + nome + '%0a%0a'
                + '*-----PRODUTOS-----*' + '%0a'
                + produto + '%0a'
                + '*Obs:* ' + obs + '%0a'
                + '*Forma de pagamento:* ' + tipoPagamento + '%0a'
                + '*Valor Total:* R$' + valorTotal + '%0a'
                + frase + '%0a'
            window.open(url, '_blank').focus()
        }
    }
    else {
        let url = 'http://wa.me/' + numero + '?text='
            + '*PEDIDO MM-GOURMET*' + '%0a'
            + ' ' + '%0a'
            + '*Nome:* ' + nome + '%0a%0a'
            + '*-----PRODUTOS-----*' + '%0a'
            + produto + '%0a'
            + '*Obs:* ' + obs + '%0a'
            + '*Forma de pagamento:* ' + tipoPagamento + '%0a'
            + '*Valor Total:* R$' + valorTotal + '%0a'
        window.open(url, '_blank').focus()
    }
}
