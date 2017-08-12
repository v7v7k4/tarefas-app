(function(controlador){
	"use strict";
	$(".novoCartao").submit(function(event){
		//impede que a página recarregue
		event.preventDefault();

		//pega o que o usuário digitou
		var campoConteudo = $(".novoCartao-conteudo");
		//var conteudo = campoConteudo.val().trim().replace(/\n/g, "<br>");
		var conteudo = campoConteudo.val().trim().replace(/\n/g,"<br>")
									     .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
									     .replace(/\*(.*?)\*/g, "<em>$1</em>");

		//cria os elementos do cartão e adiciona no DOM

		//<section class="mural">
		//	<div class="cartao">
		//		<div class="opcoesDoCartao">
		//			<button class="opcoesDoCartao-remove">
		//				Remover</button>
		//		</div>
		//		<p class="cartao-conteudo">...</p>
		//	</div>
		//</section>
		if(conteudo){
			controlador.adicionaCartao(conteudo, "#ff006b");
			$(document).trigger("precisaSincronizar");
		}
		//apaga o conteúdo do textarea
		campoConteudo.val("");
	});
})(controladorDeCartoes);