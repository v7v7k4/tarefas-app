//IIFE - expressões de funções imediatamente invocáveis
(function(controlador){
	"use strict";
	var usuario = "viviantsd@yahoo.com.br";
	$(document).on("precisaSincronizar", function(){
		$("#sync").removeClass("botaoSync--sincronizado");
		$("#sync").addClass("botaoSync--esperando");
	});

	$(document).on("precisaSincronizar", function(){
		var cartoes = [];
		$(".cartao").each(function(){
			var cartao = {};
			cartao.conteudo = $(this).find(".cartao-conteudo").html();
			cartao.cor = $(this).css("background-color");

			cartoes.push(cartao);
		});

		//escolha seu nome de usuario aqui
		var mural = {
			usuario: usuario,
			cartoes: cartoes
		}
		$.ajax({
			url: "https://ceep.herokuapp.com/cartoes/salvar",
			method: "POST",
			data: mural,
			success: function(res){
				$("#sync").addClass("botaoSync--sincronizado");
				console.log(res.quantidade + " cartoes salvos em " + res.usuario);
				//Para visualizar quantos cartões foram removidos após a sincronização com o servidor, o código
				//destacado deve ser colocado no callback de sucesso do AJAX de salvar os cartões no arquivo sincronizacao.js
				var quantidadeRemovidos = controladorDeCartoes.idUltimoCartao() - res.quantidade;
				console.log(quantidadeRemovidos + " cartoes removidos");
			},
			error: function(){
				$("#sync").addClass("botaoSync--deuRuim");
				console.log("Não foi possível salvar o mural");
			},
			complete: function(){
				$("#sync").removeClass("botaoSync--esperando");
			}
		});
	});

	$("#sync").click(function(){
		$(document).trigger("precisaSincronizar");
	})

	/*var usuario = "viviantsd@yahoo.com.br";
	$("#sync").click(function(){
		//var usuario = "viviantsd@yahoo.com.br";
		$("#sync").removeClass("botaoSync--sincronizado");
		$("#sync").addClass("botaoSync--esperando");
		var cartoes = [];
		$(".cartao").each(function(){
			var cartao = {};
			cartao.conteudo = $(this).find(".cartao-conteudo").html();
			cartao.cor = $(this).css("background-color");

			cartoes.push(cartao);
		});

		//escolha seu nome de usuario aqui
		var mural = {
			usuario: usuario,
			cartoes: cartoes
		}
		$.ajax({
			url: "https://ceep.herokuapp.com/cartoes/salvar",
			method: "POST",
			data: mural,
			success: function(res){
				$("#sync").addClass("botaoSync--sincronizado");
				console.log(res.quantidade + " cartoes salvos em " + res.usuario);
				//Para visualizar quantos cartões foram removidos após a sincronização com o servidor, o código
				//destacado deve ser colocado no callback de sucesso do AJAX de salvar os cartões no arquivo sincronizacao.js
				var quantidadeRemovidos = controladorDeCartoes.idUltimoCartao() - res.quantidade;
				console.log(quantidadeRemovidos + " cartoes removidos");
			},
			error: function(){
				$("#sync").addClass("botaoSync--deuRuim");
				console.log("Não foi possível salvar o mural");
			},
			complete: function(){
				$("#sync").removeClass("botaoSync--esperando");
			}
		});
	});*/

	//IIFE - expressões de funções imediatamente invocáveis
	//(function(){
		//var usuario = "viviantsd@yahoo.com.br"; //nao é mais uma variável global
		$.getJSON("https://ceep.herokuapp.com/cartoes/carregar?callback=?",
			{usuario: usuario},
			function(res){
				var cartoes = res.cartoes.reverse();
				console.log(cartoes.length + " carregados em " + res.usuario);
				cartoes.forEach(function(cartao){
					controlador.adicionaCartao(cartao.conteudo, cartao.cor);
				});
			});
	})(controladorDeCartoes);	

