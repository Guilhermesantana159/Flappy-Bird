var canvas = document.getElementById("jogo")
var ctx = canvas.getContext("2d")
var imagemfundo = new Image()
imagemfundo.src = 'sprites.png'


window.addEventListener("click",function(){
    elementos.pontuacao++
    flappybird.multiplicadordaqueda = -8
})

const fundo = {
    tamanhochao1: 370,
    tamanhochao2: 0,
    desenhafundo: function(velchao,velcanos) {
        ctx.fillStyle = "rgb(49, 192, 218)"
        ctx.fillRect(0,0,370,520)
        ctx.drawImage(imagemfundo,390,0,665,203,0,270,890,280)
        canos.desenhacanos(velcanos)
        ctx.drawImage(imagemfundo,0,610,224,721,fundo.tamanhochao2 -= velchao,395,400,800)
        ctx.drawImage(imagemfundo,0,610,224,721,fundo.tamanhochao1 -= velchao,395,400,800)
        if(fundo.tamanhochao2 == -370 & telas.estado != "gameover"){
            fundo.tamanhochao2 = 0
            fundo.tamanhochao1 = 370
        }
    },
}

const canos = {
    posicao : [800,550,],
    abertura: [320,150],
    desenhacanos: function(velcanos){
        for(let i=0;i<2;i++){
             //baixo
            ctx.drawImage(imagemfundo,0,169,53,400,this.posicao[i],(350 - this.abertura[i]) + 120,53,400)
            //cima
            ctx.drawImage(imagemfundo,53,169,50,400,this.posicao[i],- this.abertura[i],53,400)
            this.posicao[i]-=velcanos
            if(this.posicao[i] == -50){
                this.posicao[i] = 400
                aleatorio(i)
            }
        }
    }
}
const elementos = {
    pontuacao : 0,
    desenhapontuacao: function (){
        ctx.fillStyle = "white"
        ctx.font = "28px Arial";
        ctx.fillText(elementos.pontuacao,325,35);
    }
}
const flappybird = {
    posvertical: 50,
    multiplicadordaqueda: 5,
    troca: 0,
    desenhaflappybird: function(){
        ctx.drawImage(imagemfundo,0,flappybird.troca,34,24,15,flappybird.posvertical,34,24)
    },
    gravidadeflappybird: function (){
        flappybird.posvertical = flappybird.posvertical + flappybird.multiplicadordaqueda
        flappybird.multiplicadordaqueda ++
    },
    asasflappybird: function(){
        setInterval(function(){
            if(flappybird.troca == 0){
                flappybird.troca = 26
            }
            if(flappybird.troca == 26){
                flappybird.troca = 51
            }
            else{
                flappybird.troca = 0
            } 
        },1)
    }
}
const telas = {
    estado: "inicio",
    teladojogo: function(){
        if(telas.estado == "inicio"){
            aleatorio()
            canos.posicao = [800,600]
            elementos.pontuacao = 0
            flappybird.posvertical = 50
            fundo.desenhafundo(5,0)
            flappybird.desenhaflappybird()
            flappybird.asasflappybird()
            ctx.drawImage(imagemfundo,134,0,205,152,100,80,205,152)
            window.addEventListener("click",function(){
                telas.estado = "jogo"
            })
        }
        if(telas.estado == "jogo"){
            fundo.desenhafundo(5,5)
            flappybird.desenhaflappybird()
            flappybird.gravidadeflappybird()
            flappybird.asasflappybird()
            elementos.desenhapontuacao()
            verificacao()
        }
        if(telas.estado == "gameover"){
            fundo.desenhafundo(0,0)
            ctx.drawImage(imagemfundo,133,152,227,221,70,50,227,221)
            ctx.drawImage(imagemfundo,0,0,34,24,10,flappybird.posvertical,34,24)
            resultados.desenharesultado(elementos.pontuacao)
            elementos.desenhapontuacao()
            window.addEventListener("click",function(){
                telas.estado = "inicio"
            })
        }
    }
}

const resultados = {
    melhor: 0,
    desenharesultado: function(atual){
        if(atual < 50){
            ctx.drawImage(imagemfundo,0,78,44,44,98,138,44,44)
            ctx.fillStyle = "white"
            ctx.font = "28px Arial"
            ctx.fillText(elementos.pontuacao,250,148)
            ctx.fillText(resultados.melhor,250,198)
            if(atual > resultados.melhor){
                resultados.melhor = atual
            }
        }
        if(atual > 50 & atual < 100){
            ctx.drawImage(imagemfundo,47,77,44,44,98,138,44,44)
            ctx.fillStyle = "white"
            ctx.font = "28px Arial"
            ctx.fillText(elementos.pontuacao,250,148)
            ctx.fillText(resultados.melhor,250,198);
            if(atual > resultados.melhor){
                resultados.melhor = atual
            }
        }
        if(atual > 100 & atual < 200){
            ctx.drawImage(imagemfundo,0,123,44,44,98,138,44,44)
            ctx.fillStyle = "white"
            ctx.font = "28px Arial";
            ctx.fillText(elementos.pontuacao,250,148);
            ctx.fillText(resultados.melhor,250,198);
            if(atual > resultados.melhor){
                resultados.melhor = atual
            }
        }
        if(atual > 200){
            ctx.drawImage(imagemfundo,47,125,44,44,98,138,44,44)
            ctx.fillStyle = "white"
            ctx.font = "28px Arial";
            ctx.fillText(elementos.pontuacao,250,148)
            ctx.fillText(resultados.melhor,250,198)
            if(atual > resultados.melhor){
                resultados.melhor = atual
            }
        }
    }
}

function verificacao(){
    if(flappybird.posvertical >= 371){
        telas.estado = "gameover"
        flappybird.posvertical = 371
    }
    for(let i=0;i<2;i++){
        if((canos.posicao[i] >= -20 &  canos.posicao[i] <= 40) & flappybird.posvertical < 400 - canos.abertura[i]){
            telas.estado = "gameover"
        }
        if((canos.posicao[i] >= -20 &  canos.posicao[i] <= 40) & flappybird.posvertical > 442 - canos.abertura[i]){
            telas.estado = "gameover"
        }
    }
    }

function aleatorio(i){
    let x = Math.floor(Math.random() * 70) * 5
    let y = Math.floor(Math.random() * 70) * 5
    if(x > 125 & x <= 350 & y > 125 & y <= 350){
        if(i == 0){
            canos.abertura[0] = x
        }
        if(i == 1){
            canos.abertura[1] = y
        }
    }
}
setInterval(function(){
    telas.teladojogo()
},60)

