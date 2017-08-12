(function(){
	"use strict";
	document.querySelector("#mudaLayout").addEventListener("click", function(){
		//Pega o elemento com a class="mural"
		var mural = document.querySelector(".mural");

		//Tira ou coloca a classe
		mural.classList.toggle("mural--linhas");

		//Muda o texto do botão
		if(mural.classList.contains("mural--linhas")){
			this.textContent = "Blocos";
		}else{
			this.textContent = "Linhas";
		}
	});
})();