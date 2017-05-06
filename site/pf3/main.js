var funcionalidade = "";
var empregado = false;
function loadMain() {
	$("#loaded").load("main.html");
	var nome_restaurante = document.getElementById("nome_restaurante");
	nome_restaurante.style.visibility = 'hidden';
	var nome_restaurante_menu_principal = document.getElementById("nome_restaurante_menu_principal");
	nome_restaurante_menu_principal.style.visibility = 'visible';
    funcionalidade="main";

 if(empregado === false){
	 var imagem_empregado_main = document.getElementById("imagem_empregado_main");
 	 imagem_empregado_main.style.visibility = 'hidden';
 }
 else{
	 var imagem_empregado_main = document.getElementById("imagem_empregado_main");
 	 imagem_empregado_main.style.visibility = 'visible';
 }

}

function loadModals() {

	$("#modals").load("modals.html");
}

function chamar_empregado(){
	$("#modalEmpregado").modal();

	setTimeout(function(){
		$("#modalEmpregado").modal('hide');
		empregado = true;
		var imagem_empregado_main = document.getElementById("imagem_empregado_main");
		imagem_empregado_main.style.visibility = 'visible';
	}, 1600);
	//myMove();

	setTimeout(function(){
		var imagem_empregado_main = document.getElementById("imagem_empregado_main");
		imagem_empregado_main.style.visibility = 'hidden'
		empregado = false;
	}, 10000);

}

function f1() {
	var nome_restaurante = document.getElementById("nome_restaurante");
	nome_restaurante.style.visibility='visible';
	var nome_restaurante_menu_principal = document.getElementById("nome_restaurante_menu_principal");
	nome_restaurante_menu_principal.style.visibility = 'hidden';
	$("#loaded").load("f1_1.html");
	$("#prato_decor").load("f1_tipos_pratos.html");
	$("#area_direita").load("f1_pedido.html", function()
	{
		if(funcionalidade === "acompanhar_pedido"){
			$("#cancelar").attr("onclick", "f1_abrir_cancelar_fazer_pedido()");
		}
	});
	funcionalidade = "fazer_pedido";
}

function f1_retroceder() {
	$("#modalNaoSim").modal('hide');
	loadMain();
	$("#prato_decor").html("");
	$("#area_direita").html("");
}

function loadAjuda(){
	if(funcionalidade === "main"){
		$("#modalAjuda-header").text("Menu Principal")
		$("#modalAjuda-body").load("ajuda_menu_principal.html");
	}
	if(funcionalidade === "fazer_pedido"){
		$("#modalAjuda-header").text("Fazer Pedido")
		$("#modalAjuda-body").load("ajuda_f1.html");
	}
	if(funcionalidade =="acompanhar_pedido"){
		$("#modalAjuda-header").text("Acompanhar Pedidos")
		$("#modalAjuda-body").load("ajuda_f2.html");
	}
	$("#modalAjuda-ChamarEmpregado").attr("onclick", "chamar_empregado()");
	$("#modalAjuda").modal();
}

function f2() {
	funcionalidade = "acompanhar_pedido";
	var nome_restaurante = document.getElementById("nome_restaurante");
	nome_restaurante.style.visibility='visible';
	var nome_restaurante_menu_principal = document.getElementById("nome_restaurante_menu_principal");
	nome_restaurante_menu_principal.style.visibility = 'hidden';
    document.getElementById("imagem_f2").style.visibility = "hidden";
    document.getElementById("imagem_f2_fundo").style.visibility = "hidden";
	$("#area_direita").load("f2_1.html");
	set_f2_vendo_1(true);
}

function f3() {
}

// http://stackoverflow.com/a/9541579
function isOverflowed(element)
{
		return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

/*function myMove() {
  var elem = document.getElementById("imagem_empregado");
  var pos = 0;
  var id = setInterval(frame, 10);
  function frame() {
    if (pos == 350) {
      clearInterval(id);
    } else {
      pos++;
      elem.style.top = pos + 'px';
      elem.style.left = pos + 'px';
    }
  }
}*/

function restart(){

	"use strict";
	// retrieve the element
element = document.getElementById("modalAjuda-ChamarEmpregado");
element1 = document.getElementById("imagem_empregado_main");
// reset the transition by...
element.addEventListener("click", function(e){
  e.preventDefault;

  // -> removing the class
  element1.classList.remove("run-animation");

  // -> triggering reflow /* The actual magic */
  // without this it wouldn't work. Try uncommenting the line and the transition won't be retriggered.
  // Oops! This won't work in strict mode. Thanks Felis Phasma!
  // element.offsetWidth = element.offsetWidth;
  // Do this instead:
  void element1.offsetWidth;

  // -> and re-adding the class
  element1.classList.add("run-animation");
	}, false);
}

function play() {
    document.getElementById("imagem_empregado_main").style.animationPlayState = "running";
}