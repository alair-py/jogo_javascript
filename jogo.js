//VARIAVEIS GLOBAIS
var largura = 0
var altura = 0
var vidas = 1
var tempo = 30

var criaTempo = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '')

if (nivel === 'facil') {
    //1500
    criaTempo = 1500
} else if (nivel === 'normal') {
    //1000
    criaTempo = 1000
} else if (nivel === 'dificil') {
    //750
    criaTempo = 850
}


//atualiza dimensão da tela tempo real (redimensionamento / onresize body)
function ajustaTamanhoJogo() {
    altura = window.innerHeight
    largura = window.innerWidth
}

ajustaTamanhoJogo()

var cronometro = setInterval(function() {

    tempo -= 1

    if (tempo < 0) {

        clearInterval(cronometro)
        clearInterval(criaMosquito)

        window.location.href = 'vitoria.html'
    } else {
        document.getElementById('cronometro').innerHTML = tempo
    }   
} , 1000)


// GERA POSICIONAMENTO RANDOMICO PARA O MOSQUITO
function posicaoRand() {

    //Remove mosquito anterior (caso exista)
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        if (vidas > 3) {
            window.location.href = 'fim_de_jogo.html'
        } else {
            document.getElementById('v' + vidas).src="imagens/coracao_vazio.png"

            vidas++
        }

    }


    //Gera posicionamento aleatorio
    var posicaoX = Math.floor(Math.random() * largura) - 100
    var posicaoY = Math.floor(Math.random() * altura) - 100

    //Controle caso valor menor que zero
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    //Criar elemento HTML
    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosca.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()

    //Posiciona imagem no valor aleatorio gerado
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'

    //CAPTURA CLICK DO MOUSE NO ELEMENTO HTML E O ELIMINA
    mosquito.onclick = function() {
        this.remove()
    }

    //Cria elemento no Body
    document.body.appendChild(mosquito)

}


// GERA TAMANHO ALEATORIO PARA O MOSQUITO
function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3)

    switch(classe) {
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}


// TROCA LADO DO MOSQUITO ENTRE ESQUERDA E DIREITA
function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2)

    switch(classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}

