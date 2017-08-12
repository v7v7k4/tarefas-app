var controladorDeCartoes = (function(){
	"use strict";
	/*function removeCartao(){
		var cartao = document.querySelector("#cartao_"+this.dataset.ref);

		//dá uma classe que faz ele sumir devagar
		cartao.classList.add("cartao--some");

		//tira da página depois da animação
		setTimeout(function(){
			cartao.remove();
			$(document).trigger("precisaSincronizar");
		},400);
	}

	//pega os botões
	var botoes = document.querySelectorAll(".opcoesDoCartao-remove");
	for(var i=0; i<botoes.length;i++){
		//adiciona o evento em cada botão
		botoes[i].addEventListener("click", removeCartao);
	}*/

	function decideTipoCartao(conteudo){
		var quebras = conteudo.split("<br>").length;

		var totalDeLetras = conteudo.replace(/<br>/g, " ").length;

		var ultimoMaior = "";
		conteudo.replace(/<br>/g, " ")
			.split(" ")
			.forEach(function(palavra){
				if(palavra.length > ultimoMaior.length){
					ultimoMaior = palavra;
				}
			});

		var tamMaior = ultimoMaior.length;

		//no mínimo, todo cartao tem o texto pequeno
		var tipoCartao = "cartao--textoPequeno";
		if(tamMaior < 9 && quebras < 5 && totalDeLetras < 55){
			tipoCartao = "cartao--textoGrande";
		}else if(tamMaior < 12 && quebras < 6 && totalDeLetras < 75){
			tipoCartao = "cartao--textoMedio"
		}

		return tipoCartao;
	}

	//var contador = $(".cartao").length;
	var contador = 0;
	function adicionaCartao(conteudo,cor){
		
		//soma um no contador
		contador++;

		//cria atributo data-ref no botaoRemove e adiciona o valor de contador a ele "attr("data-ref", contador)""
		//cria o botão de remover
		//var botaoRemove = $("<button>").addClass("opcoesDoCartao-remove").attr("data-ref", contador).text("Remover").click(removeCartao);
	
		//cria a div de opcoes
		//var opcoes = $("<div>").addClass("opcoesDoCartao").append(botaoRemove);

		var opcoes = criaOpcoesDoCartao(contador);

		var tipoCartao = decideTipoCartao(conteudo);

		//cria o p, adiciona a classe cartao-conteudo nela e adiciona o conteudo no p
		var conteudoTag = $("<p>").addClass("cartao-conteudo")
								  .attr("contenteditable",true)
								  .on("input", editaCartaoHandler)
								  .append(conteudo);

		//cria uma div cartao-conteudo, adiciona o p e a div opcoes nele e adiciona a div cartao-conteudo no elemento que tem a classe mural (section) como seu primeiro filho.
		//cria atributo id no cartao
		$("<div>").attr("id", "cartao_"+contador)
			  .attr("tabindex", 0)
			  .addClass("cartao")
			  .addClass(tipoCartao)
			  .append(opcoes)
			  .append(conteudoTag)
			  .css("background-color", cor)
			  .prependTo(".mural");
	}
	return {
		adicionaCartao:adicionaCartao, idUltimoCartao: function(){
			return contador;
		}	
	}

	var intervaloSyncEdicao;
	function editaCartaoHandler(event){
		clearTimeout(intervaloSyncEdicao);

		intervaloSyncEdicao = setTimeout(function(){
			$(document).trigger("precisaSincronizar");
		},1000);
	}
	
})();




