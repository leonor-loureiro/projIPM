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
		$(document).ready(function() {
		    blink();
		});
	}, 1600);

	setTimeout(function(){
		var imagem_empregado_main = document.getElementById("imagem_empregado_main");
		imagem_empregado_main.style.visibility = 'hidden'
		empregado = false;
	}, 20000);
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

var f1_retroceder_para_f2 = false;
function f1_retroceder() {
	$("#modalNaoSim").modal('hide');
	$("#prato_decor").html("");
	$("#area_direita").html("");
	if (f1_retroceder_para_f2)
	{
		$("#loaded").load("main.html", function()
		{
			f2();
		});
	}
	else
	{
		loadMain();
	}
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

function f2(editar_pedidos) {
	f1_retroceder_para_f2 = true;
	funcionalidade = "acompanhar_pedido";
	nome_restaurante_grande();
	document.getElementById("imagem_f2").style.visibility = "hidden";
	document.getElementById("imagem_f2_fundo").style.visibility = "hidden";
	$("#imagem_f1").attr("onclick", "f2_fechar(true); f1();");
	$("#imagem_f1_fundo").attr("onclick", "f2_fechar(true); f1();");
	$("#area_direita").load("f2_1.html", function()
	{
		if(editar_pedidos)
		{
			f2_editar_pedidos();
		}
		else
		{
			set_f2_vendo_2(false);
			set_f2_vendo_1(true);
		}
	});
}

function nome_restaurante_grande()
{
	var nome_restaurante = document.getElementById("nome_restaurante");
	nome_restaurante.style.visibility='hidden';
	var nome_restaurante_menu_principal = document.getElementById("nome_restaurante_menu_principal");
	nome_restaurante_menu_principal.style.visibility = 'visible';
}

function nome_restaurante_pequeno()
{
	var nome_restaurante = document.getElementById("nome_restaurante");
	nome_restaurante.style.visibility='visible';
	var nome_restaurante_menu_principal = document.getElementById("nome_restaurante_menu_principal");
	nome_restaurante_menu_principal.style.visibility = 'hidden';
}

function f2_fechar(retroceder_para_f2 = false) {
	f1_retroceder_para_f2 = retroceder_para_f2;
	$("#area_direita").html("");
	set_f2_vendo_1(false)
	loadMain();
}

function f3() {
}

// http://stackoverflow.com/a/9541579
function isOverflowed(element)
{
		return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}


function blink(){
    $('#imagem_empregado_main').delay(2000).fadeTo(100,0.1).delay(1000).fadeTo(100,1, blink);
}
