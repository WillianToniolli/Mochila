const form =document.getElementById('novoItem')
const lista = document.getElementById('lista')
const itens = JSON.parse(localStorage.getItem("itens")) || [] 

itens.forEach((element) => {
    criarElemento(element)

});

form.addEventListener("submit",(evento)=>{
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find(elemento => elemento.nome === nome.value)   

    console.log(existe)


    const itemAtual={
        "nome":nome.value,
        "quantidade":quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id
        
        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id) ]= itemAtual  
        alert('O item Citado já esta em sua mochila e sera substituido pelo valor informado!')
    }
    else{
        itemAtual.id = itens[itens.length-1] ? (itens[itens.length -1]).id + 1  :0



        criarElemento(itemAtual)
        itens.push(itemAtual)
    }

    // itens.push(itemAtual)

    localStorage.setItem("itens",JSON.stringify(itens))

    nome.value=""
    quantidade.value=""
})

function criarElemento(item){

    const novoItem = document.createElement('li')
    novoItem.classList.add('item')

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    numeroItem.classList.add(`td${item.id}`) 
    novoItem.appendChild(numeroItem)

    novoItem.innerHTML +=item.nome

    novoItem.appendChild(botaoDeleta(item.id))
    
    lista.appendChild(novoItem)


}

function atualizaElemento(item){
  document.querySelector(`[data-id="${item.id}"]`).innerHTML= item.quantidade
//    console.log(localStorage.getItem())
}

function botaoDeleta(id){
    const elementBotao = document.createElement("button")
    elementBotao.innerHTML="X"

    elementBotao.addEventListener('click',function(){
        let confirmirmacaoParaDeletar = confirm('Deseja realmente excluir o item selecionado?')
        console.log(confirmirmacaoParaDeletar)

        if(confirmirmacaoParaDeletar == true){
            deletaElemento(this.parentNode,id)
        }

        
    })
    return elementBotao
}

function deletaElemento(tag, id){
    tag.remove()
    console.log(id)
    itens.splice(itens.findIndex(elemento => elemento.id === id) ,1)
    console.log(itens)
    localStorage.setItem("itens",JSON.stringify(itens))

}
