function abrirCart() {
    const modal = document.getElementById('carrinho');
    modal.classList.add("abrir");

    modal.addEventListener('click', (e) => {
        if (e.target.id === 'carrinho' || e.target.id === 'fc') {
            modal.classList.remove('abrir')
        }
    })
}

var obs = document.querySelector('#obs')
//FECHADURA ENDEREÇO
let divEndereco = document.querySelector('.container-dados-adicionais')

let addDados = document.querySelector('#add-dados')
addDados.addEventListener('click', abrirDados)
function abrirDados() {
    divEndereco.style.display = 'flex'
    observacao = obs.value
    return observacao
}

let retorno = document.querySelector('.retornar')
retorno.addEventListener('click', fechar)

function fechar() {
    divEndereco.style.display = 'none'
}


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
    var taxaE = 0
    var taxa = document.querySelector('.taxa')
    var dados = document.querySelector('#add-dados')
    if (carrinho.length > 0) {
        taxa.style.display = 'block'
        dados.style.display = 'block'
        obs.style.display = 'flex'
        taxaE = 3
    }
    else {
        taxa.style.display = 'none'
        dados.style.display = 'none'
        obs.style.display = 'none'
        taxaE = 0
    }
    total = total + taxaE
    valorFinal.innerHTML = `Total: R$ ${total.toFixed(2)}`
    return total
}

produtoCarrinho.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove")) {
        var nome = event.target.getAttribute("nome")
        removerProduto(nome)
    }
})

//REMOÇÃO DO PRODUTO
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


//RECEBENDO OS DADOS DO USUÁRIO E ENVIADO PARA A LOJA
var sn = document.querySelector('#SN')
let troco = document.querySelector('.troco')

function formasPagamentos() {
    let opcao = document.querySelector('#pagamentos')
    let formas = opcao.options[opcao.selectedIndex]
    let pagamento = formas.text
    
    if (pagamento === 'DINHEIRO') {
        sn.style.display = 'flex'
    }
    else{
        sn.style.display = 'none'
    }
    return pagamento
}

// SE CASO A PESSOAL QUISESSE O TROCO E O PAGAMENTO TERIA QUE SER DINHEIRO
function simNao() {
    let troco = document.querySelector('.troco')
    let decisao = sn.value
    if (decisao === '1') {
        troco.style.display = 'flex'
        return decisao 
    }
    else if( decisao === '2'){
        troco.style.display = 'none'
        return decisao
    }
}


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
    let valorTotal = atualizarCarrinho().toFixed(2)
    let obs = abrirDados()
    let numero = '5521998382523'

    let a = 0
    var produto = []
    while (a < carrinho.length) {
        produto.push([carrinho[a].quantidade + '-' + carrinho[a].nome, '%0a'])
        a++
    }

    let valorDotroco = (troco - valorTotal).toFixed(2)

    if (nome === '') {
        alert('Por favor, digite seu nome!')
        preventDefault()
    }
    else if (tipoPagamento === 'FORMAS DE PAGAMENTO') {
        alert('Por favor, escolha uma forma de pagamento válida')
        preventDefault()
    }
    else if (tipoPagamento === 'DINHEIRO') {
        if (troco < valorTotal && PagamentoDinheiro === '1') {
            alert(`O valor adicionado no troco tem que ser maior do que o valor total da compra de R$${valorTotal}`)
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
